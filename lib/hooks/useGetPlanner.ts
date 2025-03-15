import { useEffect, useState } from "react";
import { getFromCookies } from "../actions/cookies/cookies.action";
import { COOKIES_KEY_USERDATA } from "@/constants";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";

export function useGetPlanner(id?: string) {
  const [planners, setPlanners] = useState<PlannerDetails[]>();
  const [selected, setSelected] = useState<PlannerDetails>();

  const getMyPlanner = async () => {
    const cookiesResult = await getFromCookies<UserData>({ key: COOKIES_KEY_USERDATA });
    if (cookiesResult.data) {
      const q = query(collection(db, 'planners'), where('uid', '==', cookiesResult.data.uid));
      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        const planners: PlannerDetails[] = [];
        QuerySnapshot.forEach((doc) => {
          const data = doc.data();
          planners.push({
            pid: doc.id,
            uid: data.uid,
            name: data.name,
            from_datetime: data.from_datetime,
            to_datetime: data.to_datetime,
            created_datetime: data.created_datetime,
            items: data.items
          })
        });
        planners.sort((a, b) => new Date(b.created_datetime).getTime() - new Date(a.created_datetime).getTime());
        setPlanners(planners);
        const selectedPlanner = planners.find(planner => planner.pid === id);
        setSelected(selectedPlanner);
      });
      return () => unsubscribe();
    }
  }

  useEffect(() => {
    getMyPlanner();
  }, [id]);

  return { planners, selected }
}