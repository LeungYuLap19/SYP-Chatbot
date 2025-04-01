import { useGetAPIs } from '@/lib/hooks/useGetAPIs';
import React, { useEffect } from 'react'
import FlightStatus from './dialog/flightStatus/FlightStatus';
import { TEST_SEARCH_LIMIT } from '@/constants';
import PlaceSearch from './dialog/placeSearch/PlaceSearch';
import FlightSearch from './dialog/flightSearch/FlightSearch';
import WeatherForecast from './dialog/weatherForecast/WeatherForecast';
import { getIdsOrLabelByCategory } from '@/lib/utils';
import Default from './dialog/Default';
import HotelSearch from './dialog/hotelSearch/HotelSearch';

export default function Message(
  { type, message, className }: { type: string; message: Message; className?: string; }
) {
  const {
    flightStatus,
    flightResponse,
    geoResponse,
    placeResponse,
    weatherResponse,
    hotelResponse,
    
    searchFlightStatus,
    searchFlight,
    placeSearch,
    checkWeather,
    hotelSearch,

    loading
  } = useGetAPIs(false);

  const { custom, text, botDefault } = message;
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
        case "restaurantSearch":
        case "dessertSearch":
        case "cafeSearch":
        case "barSearch":
        case "nightMarketSearch":
        case "entertainmentSearch":
        case "shoppingSearch":
          if ("location" in custom.data) {
            placeSearch(
              custom.data.location, 
              TEST_SEARCH_LIMIT, 
              getIdsOrLabelByCategory(responseType, true) as number[] || []
            );
          }
          break;

      case "weather":
        if ("location" in custom.data) {
          checkWeather(custom.data.location);
        }
        break;

      case "hotelSearch":
        if ("location" in custom.data && "check_in" in custom.data && "check_out" in custom.data) {
          hotelSearch(custom.data.location, custom.data.check_in, custom.data.check_out);
        }
        break;
  
      default:
        console.warn("Unknown response type:", responseType);
    }
  }, [responseType, custom]);  

  const validPlaceSearchTypes = [
    "popularPlaces", "restaurantSearch", "dessertSearch", 
    "cafeSearch", "barSearch", "nightMarketSearch", 
    "entertainmentSearch", "shoppingSearch"
  ] as const; 

  const responseComponents: Record<string, JSX.Element | null> = {
    flightStatus: flightStatus ? <FlightStatus flightStatus={flightStatus} /> : null,
    flightSearch: flightResponse ? <FlightSearch flightSearch={flightResponse} /> : null,
    weather: weatherResponse ? <WeatherForecast weatherForecast={weatherResponse} /> : null,
    hotelSearch: hotelResponse ? <HotelSearch hotelSearch={hotelResponse} /> : null,
    
    ...Object.fromEntries(
      validPlaceSearchTypes.map((type) => [
        type,
        placeResponse && geoResponse 
          ? <PlaceSearch resultItem={placeResponse} geoResponse={geoResponse[0]} responseType={type} />
          : null
      ])
    )
  };

  if (responseType) {
    return responseComponents[responseType];
  }

  if (botDefault) {
    return <Default />;
  }

  if (userBotMessage) {
    return (
      <div className={`w-full flex ${type === "user" && "justify-end"}`}>
        <div className={`max-w-[70%] max-lg:w-full flex ${type === "user" && "justify-end"}`}>
          <p className={`text-sm text-pretty bg-customBlue-100 py-3 px-5 rounded-2xl text-customWhite-100 ${className}`}>
            {userBotMessage}
          </p>
        </div>
      </div>
    );
  }
}
