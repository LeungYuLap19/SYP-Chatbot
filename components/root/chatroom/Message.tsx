import { useGetAPIs } from '@/lib/hooks/useGetAPIs';
import React, { useEffect } from 'react'
import FlightStatus from './dialog/flightStatus/FlightStatus';
import { TEST_SEARCH_LIMIT } from '@/constants';
import PlaceSearch from './dialog/placeSearch/PlaceSearch';
import FlightSearch from './dialog/flightSearch/FlightSearch';

export default function Message(
  // temp props
  { type, message }: { type: string; message: Message }
) {
  const {
    flightStatus,
    flightResponse,
    geoResponse,
    placeResponse,
    loading,
    
    searchFlightStatus,
    searchFlight,
    placeSearch
  } = useGetAPIs(false);

  const { custom, text } = message;
  const userBotMessage = custom?.message || text;
  const responseType = custom?.data?.response_type;

  useEffect(() => {
    if (!responseType || !custom?.data) return;
  
    switch (responseType) {
      case "flightStatus":
        if ("flight_number" in custom.data && "date" in custom.data) {
          searchFlightStatus(custom.data.flight_number, custom.data.date);
        }
        break;
  
      case "flightSearch":
        if ("departure" in custom.data && "arrival" in custom.data && "date" in custom.data) {
          searchFlight(custom.data.departure, custom.data.arrival, custom.data.date);
        }
        break;
  
      case "popularPlaces":
        if ("location" in custom.data) {
          placeSearch(custom.data.location, TEST_SEARCH_LIMIT);
        }
        break;
  
      default:
        console.warn("Unknown response type:", responseType);
    }
  }, [responseType, custom]);  

  const responseComponents: Record<string, JSX.Element | null> = {
    flightStatus: flightStatus ? <FlightStatus flightStatus={flightStatus} /> : null,
    popularPlaces: placeResponse && geoResponse ? <PlaceSearch resultItem={placeResponse} geoResponse={geoResponse[0]} /> : null,
    flightSearch: flightResponse ? <FlightSearch flightSearch={flightResponse} /> : null,
  };

  if (responseType) {
    return responseComponents[responseType];
  }

  if (userBotMessage) {
    return (
      <div className={`w-full flex ${type === "user" && "justify-end"}`}>
        <div className={`w-[70%] max-lg:w-full flex ${type === "user" && "justify-end"}`}>
          <p className="text-sm text-pretty bg-customBlue-100 py-3 px-5 rounded-2xl text-customWhite-100">
            {userBotMessage}
          </p>
        </div>
      </div>
    );
  }
}
