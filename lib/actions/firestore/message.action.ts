'use server'
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { getFirestoreError } from "../errors/apiErrorsHandler";
import { db } from "@/lib/firebase";

export async function storeMessage({ cid, message }: { cid: string, message: Message }): Promise<Result<boolean>> {
  try {
    const chatroomRef = doc(db, 'chatrooms', cid);
    
    await updateDoc(chatroomRef, {
      messages: arrayUnion(message),
      last_message_datetime: new Date().toISOString()
    });

    return { data: true };
  } catch (error: any) {
    console.error('Store Message Error:', error.code, error.message);
    return { error: getFirestoreError(error.code) };
  }
}