'use server'
import { sortFlightSearch } from "@/lib/utils";
import axios from "axios";
import { getSerpApiError } from "../errors/apiErrorsHandler";
import { getFromCookies } from "../cookies/cookies.action";
import { COOKIES_KEY_CURRENCY } from "@/constants";

export async function getFlightSearch(depID: string, arrID: string, depDate: string): Promise<Result<FlightResponse>> {
  const cookiesResult = await getFromCookies<string>({ key: COOKIES_KEY_CURRENCY });
  const currency = cookiesResult.data || 'usd';

  const params = {
    engine: 'google_flights',
    type: 2,
    departure_id: depID,
    arrival_id: arrID,
    outbound_date: depDate,
    api_key: process.env.NEXT_PUBLIC_SERPAPI_API_KEY,
    currency
  };

  try {
    const response = await axios.get('https://serpapi.com/search', { 
      params 
    });

    // console.log(response.data);
    return { data: sortFlightSearch(response.data) };
  } catch (error: any) {
    console.error('Search Flight Error:', error);
    return { error: getSerpApiError(error.code) };
  }
}
