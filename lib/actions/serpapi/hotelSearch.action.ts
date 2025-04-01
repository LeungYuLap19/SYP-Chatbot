'use server'
import axios from "axios";
import { getSerpApiError } from "../errors/apiErrorsHandler";

export async function getHotelSearch(location: string, checkIn: string, checkOut: string): Promise<Result<HotelSearchResponse>> {
  const params = {
    engine: "google_hotels",
    q: location,
    check_in_date: checkIn,
    check_out_date: checkOut,
    adults: "1",
    currency: "HKD",
    hl: "en",
    api_key: process.env.NEXT_PUBLIC_SERPAPI_API_KEY
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
  const params = {
    engine: "google_hotels",
    q: 'hotel',
    check_in_date: checkIn,
    check_out_date: checkOut,
    adults: "1",
    currency: "HKD",
    hl: "en",
    property_token: propertyToken,
    api_key: process.env.NEXT_PUBLIC_SERPAPI_API_KEY
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