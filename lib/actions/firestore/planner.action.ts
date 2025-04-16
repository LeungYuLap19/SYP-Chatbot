'use server'
import { db } from "@/lib/firebase";
import { addDoc, arrayUnion, collection, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
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

export async function updatePlanner(
  pid: string,
  item: FlightItem | AccommodationItem | PlaceItem | WeatherItem | WeatherItem
): Promise<Result<boolean>> {
  try {
    const plannerRef = doc(db, "planners", pid);
    const plannerSnap = await getDoc(plannerRef);

    if (!plannerSnap.exists()) {
      return { data: false };
    }

    const plannerData = plannerSnap.data() as PlannerDetails;
    const updatedItems = [...plannerData.items, item];

    const { from_datetime, to_datetime } = calculatePlannerDateRange(updatedItems);

    await updateDoc(plannerRef, {
      from_datetime,
      to_datetime,
      items: arrayUnion(item),
    });

    return { data: true };
  } catch (error: any) {
    console.error("Update Planner Error:", error.code, error.message);
    return { error: getFirestoreError(error.code) };
  }
}

export async function deleteItemFromPlanner(
  pid: string,
  piid: string // Using piid to delete the item
): Promise<Result<boolean>> {
  try {
    const plannerRef = doc(db, "planners", pid);
    const plannerSnap = await getDoc(plannerRef);

    if (!plannerSnap.exists()) {
      return { data: false }; // Planner not found
    }

    const plannerData = plannerSnap.data() as PlannerDetails;

    // Remove the item by matching piid
    const updatedItems = plannerData.items.filter(
      (item) => item.piid !== piid // Compare using the piid field
    );

    // If no item was deleted (piid not found), return false
    if (updatedItems.length === plannerData.items.length) {
      return { data: false }; // No matching item found
    }

    // Get the new date range after deletion
    const { from_datetime, to_datetime } = calculatePlannerDateRange(updatedItems);

    // Update the planner in Firestore with the new list of items and recalculated dates
    await updateDoc(plannerRef, {
      from_datetime,
      to_datetime,
      items: updatedItems,
    });

    return { data: true };
  } catch (error: any) {
    console.error("Delete Item Error:", error.code, error.message);
    return { error: getFirestoreError(error.code) };
  }
}

export async function updateItemDatetimeInPlanner(
  pid: string,
  piid: string,
  from_datetime: string | null,
  to_datetime: string | null
): Promise<Result<boolean>> {
  try {
    const plannerRef = doc(db, "planners", pid);
    const plannerSnap = await getDoc(plannerRef);

    if (!plannerSnap.exists()) {
      return { data: false }; // Planner not found
    }

    const plannerData = plannerSnap.data() as PlannerDetails;

    // Find and update the item
    const updatedItems = plannerData.items.map((item) =>
      item.piid === piid ? { ...item, from_datetime, to_datetime } : item
    );

    // Check if the item exists
    if (!plannerData.items.some((item) => item.piid === piid)) {
      return { data: false }; // Item not found
    }

    // Recalculate planner date range
    const { from_datetime: newFromDatetime, to_datetime: newToDatetime } =
      calculatePlannerDateRange(updatedItems);

    // Update Firestore with modified item and recalculated date range
    await updateDoc(plannerRef, {
      from_datetime: newFromDatetime,
      to_datetime: newToDatetime,
      items: updatedItems,
    });

    return { data: true };
  } catch (error: any) {
    console.error("Update Item Datetime Error:", error.code, error.message);
    return { error: getFirestoreError(error.code) };
  }
}

function calculatePlannerDateRange(items: (FlightItem | AccommodationItem | PlaceItem | WeatherItem | WeatherItem)[]): {
  from_datetime: string | null;
  to_datetime: string | null;
} {
  const getTimestamp = (datetime: string | null) => datetime ? new Date(datetime).getTime() : null;

  let newFromDatetime: string | null = null;
  let newToDatetime: string | null = null;

  items.forEach((item) => {
    const itemFromTime = getTimestamp(item.from_datetime);
    const itemToTime = getTimestamp(item.to_datetime);

    if (itemFromTime !== null) {
      newFromDatetime = !newFromDatetime || itemFromTime < getTimestamp(newFromDatetime)!
        ? item.from_datetime
        : newFromDatetime;
    }

    if (itemToTime !== null) {
      newToDatetime = !newToDatetime || itemToTime > getTimestamp(newToDatetime)!
        ? item.to_datetime
        : newToDatetime;
    }
  });

  return { from_datetime: newFromDatetime, to_datetime: newToDatetime };
}