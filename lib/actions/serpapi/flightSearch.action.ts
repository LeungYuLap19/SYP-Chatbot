'use server'
import { sortFlightSearch } from "@/lib/utils";
import axios from "axios";

export async function getFlightSearch(depID: string, arrID: string, depDate: string) {
  const params = {
    engine: 'google_flights',
    type: 2,
    departure_id: depID,
    arrival_id: arrID,
    outbound_date: depDate,
    api_key: process.env.NEXT_PUBLIC_SERPAPI_API_KEY,
  };

  try {
    const response = await axios.get('https://serpapi.com/search', { 
      params 
    });
    // console.log(response.data);
    if (response.data) {
      return sortFlightSearch(response.data);
    }
  } catch (error: any) {
    console.error('Search Flight Error:', error);
  }
}