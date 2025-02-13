import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { storeMessage } from "../actions/firestore/message.action";
import { showToast } from "../utils";
import { COOKIES_KEY_USERDATA, ERROR_TOAST_TITLE } from "@/constants";
import { botResponse } from "../actions/rasa/rasa.action";
import { getFromCookies } from "../actions/cookies/cookies.action";
import { createChatroom } from "../actions/firestore/chatroom.action";

export function useChatroom(id?: string) {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const processMessage = async (cid: string, message: Message) => {
    // Step 1: Store the user message in Firestore
    const firestoreResult = await storeMessage({ cid, message: message });
    if (firestoreResult.error) {
      showToast({ title: ERROR_TOAST_TITLE, description: firestoreResult.error.message });
      setLoading(false);
      return;
    }
    // Step 2: Send message to Rasa server to get bot response
    const botResponseResult = await botResponse(message);
    if (botResponseResult.error) {
      showToast({ title: ERROR_TOAST_TITLE, description: botResponseResult.error.message });
      setLoading(false);
      return;
    }
    // Step 3: Store bot response in Firestore if we received a response
    if (botResponseResult.data) {
      const botMessage: Message = {
        sender: "bot",
        custom: botResponseResult.data,
        datetime: new Date().toISOString(),
      };

      const botStoreResult = await storeMessage({ cid, message: botMessage });
      if (botStoreResult.error) {
        showToast({ title: ERROR_TOAST_TITLE, description: botStoreResult.error.message });
      }
    }
  }

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);

    const inputText = inputRef.current?.value || "";
    if (!inputText.trim()) {
      setLoading(false);
      return;
    }

    const userMessage: Message = {
      sender: "user",
      text: inputText.trim(),
      datetime: new Date().toISOString(),
    };

    if (id) {
      await processMessage(id, userMessage);
    } else {
      showToast({ title: ERROR_TOAST_TITLE, description: "No chatroom selected" });
    }

    setLoading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleEnter = async () => {
    if (loading) return;
    setLoading(true);

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

    const firestoreResult = await createChatroom({
      uid: cookiesResult.data!.uid,
      chatroom_name: "New Chatroom",
      last_message_datetime: new Date().toISOString(),
      messages: [],
    });
    if (firestoreResult.error) {
      showToast({ title: ERROR_TOAST_TITLE, description: firestoreResult.error.message });
      setLoading(false);
      return;
    }

    const message: Message = {
      sender: 'user',
      text: inputText.trim(),
      datetime: new Date().toISOString()
    }
    if (firestoreResult.data) {
      const route = `/chatroom?id=${firestoreResult.data}`;
      router.push(route);
      processMessage(firestoreResult.data, message);
    }

    // setLoading(false);
  }

  return { loading, inputRef, handleSubmit, handleEnter }
}