'use server'
import { db } from "@/lib/firebase"
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { getFirestoreError } from "../errors/apiErrorsHandler";

export async function createChatroom(chatroom: Chatroom): Promise<Result<string>> {
  try {
    const docRef = await addDoc(collection(db, 'chatrooms'), chatroom);
    return { data: docRef.id };
  } catch (error: any) {
    console.error('Create Chatroom Error:', error.code, error.message);
    return { error: getFirestoreError(error.code) };
  }
}

export async function deleteChatroom(cid: string): Promise<Result<boolean>> {
  try {
    const chatroomRef = doc(db, 'chatrooms', cid);
    await deleteDoc(chatroomRef);
    return { data: true };
  } catch (error: any) {
    console.error('Delete Chatroom Error:', error.code, error.message);
    return { error: getFirestoreError(error.code) };
  }
}

export async function renameChatroom(cid: string, name: string): Promise<Result<boolean>> {
  try {
    const chatroomRef  = doc(db, 'chatrooms', cid);
    await updateDoc(chatroomRef, {
      chatroom_name: name,
      last_message_datetime: new Date().toISOString()
    });

    return { data: true };
  } catch (error: any) {
    console.error('Rename Chatroom Error:', error.code, error.message);
    return { error: getFirestoreError(error.code) };
  }
}