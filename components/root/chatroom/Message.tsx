import { useGetAPIs } from '@/lib/hooks/useGetAPIs';
import React, { useEffect } from 'react'
import FlightStatus from './dialog/flightStatus/FlightStatus';

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
    if (!responseType || !custom?.data) return; // Ensure both exist before proceeding

    switch (responseType) {
      case "flightStatus":
        searchFlightStatus(custom.data.flight_number, custom.data.date);
        break;
      // other types 
    }
  }, [responseType, custom]);

  const responseComponents: Record<string, JSX.Element | null> = {
    flightStatus: flightStatus ? <FlightStatus flightStatus={flightStatus} /> : null,
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
