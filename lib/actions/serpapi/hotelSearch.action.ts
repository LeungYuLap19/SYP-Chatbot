'use server'
import axios from "axios";
import { getSerpApiError } from "../errors/apiErrorsHandler";
import { getFromCookies } from "../cookies/cookies.action";
import { COOKIES_KEY_CURRENCY } from "@/constants";

export async function getHotelSearch(location: string, checkIn: string, checkOut: string): Promise<Result<HotelSearchResponse>> {
  const cookiesResult = await getFromCookies<string>({ key: COOKIES_KEY_CURRENCY });
  const currency = cookiesResult.data || 'usd';

  const params = {
    engine: "google_hotels",
    q: location,
    check_in_date: checkIn,
    check_out_date: checkOut,
    adults: "1",
    hl: "en",
    api_key: process.env.NEXT_PUBLIC_SERPAPI_API_KEY,
    currency,
  };

  try {
    const response = await axios.get('https://serpapi.com/search', { 
      params 
    });
    // console.log(response.data);
    return { data: response.data };
  } catch (error: any) {
    console.error('Search Hotel Error:', error);
    return { error: getSerpApiError(error.code) };
  }
}

export async function getHotelByToken(propertyToken: string, checkIn: string, checkOut: string): Promise<Result<HotelDetails>> {
  const cookiesResult = await getFromCookies<string>({ key: COOKIES_KEY_CURRENCY });
  const currency = cookiesResult.data || 'usd';
  
  const params = {
    engine: "google_hotels",
    q: 'hotel',
    check_in_date: checkIn,
    check_out_date: checkOut,
    adults: "1",
    hl: "en",
    property_token: propertyToken,
    api_key: process.env.NEXT_PUBLIC_SERPAPI_API_KEY,
    currency,
  };

  try {
    const response = await axios.get('https://serpapi.com/search', { 
      params 
    });
    // console.log(response.data);
    return { data: response.data };
  } catch (error: any) {
    console.error('Search Hotel Error:', error);
    return { error: getSerpApiError(error.code) };
  }
}