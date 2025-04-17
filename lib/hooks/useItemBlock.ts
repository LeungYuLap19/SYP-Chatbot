import { useEffect, useState } from "react";
import { deleteItemFromPlanner } from "../actions/firestore/planner.action";
import { showToast } from "../utils";

export function useItemBlock(item: FlightItem | AccommodationItem | PlaceItem | WeatherItem, planner: PlannerDetails, setSelectedIndex?: React.Dispatch<React.SetStateAction<number>>) {
  const unassigned: boolean = ('fsq_id' in item && !item.from_datetime && !item.to_datetime) ? true : false;
  const isWeather: boolean = 'location' in item ? true : false;
  const [loading, setLoading] = useState<boolean>(false);
  const [showWindow, setShowWindow] = useState<boolean>(false);
  const [showWeatherWindow, setShowWeatherWindow] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState<Date | undefined>(
    item.from_datetime ? new Date(item.from_datetime) : undefined
  );
  const [toDate, setToDate] = useState<Date | undefined>(
    item.to_datetime ? new Date(item.to_datetime) : undefined
  );

  const handleDelete = async () => {
    setLoading(true);
    if (setSelectedIndex) {
      setSelectedIndex(0);
    }
    const result = await deleteItemFromPlanner(planner.pid!, item.piid);
    if (result.error) {
      showToast({ title: 'Error', description: result.error.message });
    } else {
      showToast({ title: 'Success', description: 'Item deleted from planner' });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (planner.from_datetime && planner.to_datetime) {
      setFromDate(new Date(planner.from_datetime));
      setToDate(new Date(planner.to_datetime));
    }
  }, [planner]);

  return {
    unassigned,
    isWeather,
    loading,
    showWindow,
    setShowWindow,
    showWeatherWindow,
    setShowWeatherWindow,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    handleDelete,
  }
}