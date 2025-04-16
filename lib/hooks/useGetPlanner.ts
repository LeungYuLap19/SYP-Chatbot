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
          });
        });

        // Sort planners by created_datetime (newest first)
        planners.sort((a, b) => new Date(b.created_datetime).getTime() - new Date(a.created_datetime).getTime());

        setPlanners(planners);

        // Find selected planner
        const selectedPlanner = planners.find(planner => planner.pid === id);

        if (selectedPlanner) {
          selectedPlanner.items.sort((a, b) => {
            const dateA = a.from_datetime ? new Date(a.from_datetime) : null;
            const dateB = b.from_datetime ? new Date(b.from_datetime) : null;

            // Extract YYYY-MM-DD (ignore time) for date comparison
            const getDateOnly = (date: Date | null) =>
              date ? new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() : 0;

            const dateOnlyA = getDateOnly(dateA);
            const dateOnlyB = getDateOnly(dateB);

            // 1️⃣ Sort by date (earliest first)
            if (dateOnlyA !== dateOnlyB) return dateOnlyA - dateOnlyB;

            // 2️⃣ If same date, prioritize Flights > Accommodations > Places
            const getTypePriority = (item: FlightItem | AccommodationItem | PlaceItem | WeatherItem) => {
              if ("flights" in item) return 1; // FlightItem
              if ("property_token" in item) return 2; // AccommodationItem
              if ("fsq_id" in item) return 3; // PlaceItem
              return 4;
            };

            const priorityA = getTypePriority(a);
            const priorityB = getTypePriority(b);

            if (priorityA !== priorityB) return priorityA - priorityB;

            // 3️⃣ If both are Places, sort by time
            if (priorityA === 3 && priorityB === 3) {
              const timeA = dateA ? dateA.getTime() : 0;
              const timeB = dateB ? dateB.getTime() : 0;
              return timeA - timeB; // Earliest time first
            }

            return 0;
          });

          setSelected({ ...selectedPlanner });
        }
      });

      return () => unsubscribe();
    }
  };

  useEffect(() => {
    getMyPlanner();
  }, [id]);

  return { planners, selected };
}
