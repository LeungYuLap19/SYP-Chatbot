import { useEffect, useState } from "react";
import { getFlightStatus } from "../actions/aerobox/flightStatus.action";
import { getFlightSearch } from "../actions/serpapi/flightSearch.action";
import { getLocationDetails } from "../actions/google/geocoding.action";
import { getPopularPlaces } from "../actions/foursquare/placeSearch.action";
import { TEST_AUTOCOMPLETION, TEST_FLIGHT_ARRIVAL, TEST_FLIGHT_DATE, TEST_FLIGHT_DEPARTURE, TEST_FLIGHT_DEPARTURE_DATE, TEST_FLIGHT_NUMBER, TEST_SEARCH_LIMIT } from "@/constants";
import { getWeatherForecast } from "../actions/weatherapi/weatherForecast.action";
import { getHotelSearch } from "../actions/serpapi/hotelSearch.action";

export function useGetAPIs(test: boolean) {
  const [flightStatus, setFlightStatus] = useState<FlightStatus | null>(null);
  const [flightResponse, setFlightResponse] = useState<FlightResponse | null>(null);
  const [geoResponse, setGeoResponse] = useState<Geocoding[] | null>(null);
  const [placeResponse, setPlaceResponse] = useState<ResultItem[] | null>(null);
  const [weatherResponse, setWeatherResponse] = useState<WeatherForecast | null>(null);
  const [hotelResponse, setHotelResponse] = useState<HotelSearchResponse | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const searchFlightStatus = async (flightNumber: string, date: string) => {
    setLoading(true);
    const response = await getFlightStatus(flightNumber, date);
    if (response) {
      setFlightStatus(response);
    }
    setLoading(false);
  }

  const searchFlight = async (depID: string, arrID: string, depDate: string) => {
    setLoading(true);
    const response = await getFlightSearch(depID, arrID, depDate);
    if (response) {
      setFlightResponse(response);
    }
    setLoading(false);
  }

  const placeSearch = async (input: string, limit: number, ids: number[]) => {
    setLoading(true);
    const geoResult: Geocoding[] = await getLocationDetails(input);
    if (geoResult) {
      setGeoResponse(geoResult);
      const ne: Northeast = geoResult[0].geometry.bounds.northeast;
      const sw: Southwest = geoResult[0].geometry.bounds.southwest;
      const response = await getPopularPlaces(ne, sw, ids, limit);
      if (response) {
        setPlaceResponse(response);
      }
    }
    setLoading(false);
  }

  const checkWeather = async (input: string) => {
    setLoading(true);
    const geoResult: Geocoding[] = await getLocationDetails(input);
    if (geoResult) {
      setGeoResponse(geoResult);
      const lat = geoResult[0].geometry.location.lat;
      const lng = geoResult[0].geometry.location.lng;
      if (!lat || !lng) return;
      const response = await getWeatherForecast(lat, lng);
      if (response) {
        setWeatherResponse(response);
      }
    }
    setLoading(false);
  }

  const hotelSearch = async (input: string, checkIn: string, checkOut: string) => {
    setLoading(true);
    const response = await getHotelSearch(input, checkIn, checkOut);
    if (response) {
      setHotelResponse(response);
    }
    setLoading(false);
  }

  // useEffect(() => {
  //   if (test) {
  //     searchFlightStatus(TEST_FLIGHT_NUMBER, TEST_FLIGHT_DATE);
  //     searchFlight(TEST_FLIGHT_DEPARTURE, TEST_FLIGHT_ARRIVAL, TEST_FLIGHT_DEPARTURE_DATE);
  //     placeSearch(TEST_AUTOCOMPLETION, TEST_SEARCH_LIMIT, []);
  //   }
  // }, [test]);

  return {
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

    loading,
  }
}