import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { getFromCookies } from "../actions/cookies/cookies.action";
import { showToast } from "../utils";
import { COOKIES_KEY_USERDATA, ERROR_TOAST_TITLE } from "@/constants";
import { createPlanner } from "../actions/firestore/planner.action";

export function usePlanner(id?: string) {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const processCreate = async (toChatroom: boolean) => {
    console.log(toChatroom)
    const inputText = inputRef.current?.value || '';
    if (!inputText.trim()) {
      setLoading(false);
      return; 
    }

    const cookiesResult = await getFromCookies<UserData>({ key: COOKIES_KEY_USERDATA });
    if (cookiesResult.error) {
      showToast({ title: ERROR_TOAST_TITLE, description: cookiesResult.error.message });
      setLoading(false);
      return;
    }

    const firestoreResult = await createPlanner({
      uid: cookiesResult.data!.uid,
      name: inputText,
      from_datetime: null,
      to_datetime: null,
      created_datetime: new Date().toISOString(),
      items: [],
    });

    if (firestoreResult.error) {
      showToast({ title: ERROR_TOAST_TITLE, description: firestoreResult.error.message });
      setLoading(false);
      return;
    }

    if (firestoreResult.data && !toChatroom) {
      const route = `/planner?id=${firestoreResult.data}`;
      router.push(route);
    }
  }

  const handleEnter = async (toChatroom: boolean = false) => {
    if (loading) return;
    setLoading(true);

    await processCreate(toChatroom);
    setLoading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  return { loading, inputRef, handleEnter };
}