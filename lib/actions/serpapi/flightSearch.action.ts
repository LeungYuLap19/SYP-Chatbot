'use server'
import { sortFlightSearch } from "@/lib/utils";
import axios from "axios";
import fs from "fs";
import path from "path";

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
      // // Define the file path
      // const filePath = path.join("C:\\Users\\ASUS\\Documents\\vscode\\syp-chatbot\\jsonTest\\apiResponses", "flightSearchResponse.json");

      // // Write data to the file
      // fs.writeFileSync(filePath, JSON.stringify(response.data, null, 2), "utf-8");
      // console.log("Response saved to JSON file:", filePath);

      return sortFlightSearch(response.data);
    }
  } catch (error: any) {
    console.error('Search Flight Error:', error);
  }
}
