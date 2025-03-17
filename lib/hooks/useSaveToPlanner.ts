import { useEffect, useState } from "react";
import { updatePlanner } from "../actions/firestore/planner.action";
import { showToast } from "../utils";
import { ERROR_TOAST_TITLE } from "@/constants";

export function useSaveToPlanner() {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedID, setSelectedID] = useState<string>();

  const saveToPlanner = async (selectedItem: FlightItem | AccommodationItem | PlaceItem) => {
    setLoading(true);
    if (!selectedID) {
      showToast({ title: ERROR_TOAST_TITLE, description: 'Please select a planner' });
      setLoading(false);
      return;
    }

    if (!selectedItem) {
      setLoading(false);
      return;
    }

    const firestoreResult = await updatePlanner(selectedID, selectedItem);
    if (firestoreResult.error) {
      showToast({ title: ERROR_TOAST_TITLE, description: firestoreResult.error.message });
      setLoading(false);
      return;
    }
    
    showToast({ title: 'Success', description: 'Item saved to planner' });
    setLoading(false);
  }

  return { 
    loading, 
    saveToPlanner, 
    selectedID,
    setSelectedID,  
  }; 
}