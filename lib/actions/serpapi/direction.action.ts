'use server'
import axios from "axios";
import { getSerpApiError } from "../errors/apiErrorsHandler";

export async function getDirection(end_addr: string, start_addr?: string, start_lat?: number, start_lng?: number): Promise<Result<DirectionResponse>> {
  const isAddress = start_addr && (!start_lat && !start_lng);

  const params: any = {
    engine: "google_maps_directions",
    end_addr,
    api_key: process.env.NEXT_PUBLIC_SERPAPI_API_KEY
  }

  if (isAddress) {
    params.start_addr = start_addr;
  }
  else if (start_lat && start_lng) {
    params.start_coords = `${start_lat},${start_lng}`;
  }

  try {
    const response = await axios.get('https://serpapi.com/search', { 
      params 
    });

    // console.log(response.data);
    return { data: response.data };
  } catch (error: any) {
    console.error('Search Flight Error:', error);
    return { error: getSerpApiError(error.code) };
  }
}