'use server'
import { db } from "@/lib/firebase";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { getFirestoreError } from "../errors/apiErrorsHandler";

export async function createPlanner(planner: PlannerDetails): Promise<Result<string>> {
  try {
    const docRef = await addDoc(collection(db, 'planners'), planner);
    return { data: docRef.id };
  } catch (error: any) {
    console.error('Create Planner Error:', error.code, error.message);
    return { error: getFirestoreError(error.code) };
  }
}

export async function deletePlanner(pid: string): Promise<Result<boolean>> {  
  try {
    const plannerRef = doc(db, 'planners', pid);
    await deleteDoc(plannerRef);
    return { data: true };
  } catch (error: any) {
    console.error('Delete Planner Error:', error.code, error.message);
    return { error: getFirestoreError(error.code) };
  }
}