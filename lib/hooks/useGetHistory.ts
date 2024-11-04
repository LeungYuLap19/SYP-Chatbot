import { useEffect, useState } from "react";
import { getFromCookies } from "../actions/cookies/cookies.action";
import { COOKIES_KEY_USERDATA } from "@/constants";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { categorizeChatrooms } from "../utils";

export function useGetHistory(id?: string) {
  const [categories, setCategories] = useState<Record<'today' | 'yesterday' | 'previous7days', Chatroom[]>>();
  const [selected, setSelected] = useState<Chatroom>();

  const getMyChatroom = async() => {
    const cookiesResult = await getFromCookies<UserData>({ key: COOKIES_KEY_USERDATA });
    if (cookiesResult.data) {
      const q = query(collection(db, 'chatrooms'), where('uid', '==',  cookiesResult.data.uid));
      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        const chatrooms: Chatroom[] = [];
        QuerySnapshot.forEach((doc) => {
          const data = doc.data();
          chatrooms.push({
            cid: doc.id,
            uid: data.uid,
            chatroom_name: data.chatroom_name,
            last_message_datetime: data.last_message_datetime,
            messages: data.messages
          })
        });
        const categories = categorizeChatrooms(chatrooms);
        setCategories(categories);
        const selectedChatroom = chatrooms.find(chatroom => chatroom.cid === id);
        setSelected(selectedChatroom);
      });
      return () => unsubscribe();
    }
  }

  useEffect(() => {
    getMyChatroom();
  }, [id]);

  return { categories, selected }
}