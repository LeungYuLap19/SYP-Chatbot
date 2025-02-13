'use server'
import axios from "axios";

// add return type later, include error handling
export async function getFlightStatus(flightNumber: string, date: string) {
  console.log(flightNumber, date);
  try {
    const response = await axios.get(`https://api.magicapi.dev/api/v1/aedbx/aerodatabox/flights/Number/${flightNumber}/${date}?withAircraftImage=true&withLocation=false`, {
      headers: {
        'Accept': 'application/json',
        'x-magicapi-key': process.env.NEXT_PUBLIC_AERODATABOX_API_KEY
      },
    });
    // console.log(response.data);
    if (response.data) {
      return response.data[1];
    }
  } catch (error: any) {
    console.error('Get Flight Status Error:', error.message);
  }
}