'use server'
import axios from "axios"

export async function getLocationDetails(input: string) {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${input}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`);
    // console.log(response.data);
    if (response.data) {
      return response.data.results;
    }
  } catch (error: any) {
    console.error('Google Geocoding Error:', error.message)
  }
}