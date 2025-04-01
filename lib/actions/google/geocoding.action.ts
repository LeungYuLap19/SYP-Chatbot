'use server'
import axios from "axios"
import { getGoogleMapsGeocodeError } from "../errors/apiErrorsHandler";

export async function getLocationDetails(input: string): Promise<Result<Geocoding[]>> {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${input}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`);
    // console.log(response.data);
    return { data: response.data.results };
  } catch (error: any) {
    console.error('Google Geocoding Error:', error.message);
    return { error: getGoogleMapsGeocodeError(error.status) }
  }
}