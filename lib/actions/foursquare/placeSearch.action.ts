'use server'
import { placeSearchFields } from "@/constants";
import axios from "axios"

export async function getPopularPlaces(ne: Northeast, sw: Southwest, limit: number) {
  try {
    const response = await axios.get(`https://api.foursquare.com/v3/places/search?ne=${ne.lat}%2C${ne.lng}&sw=${sw.lat}%2C${sw.lng}&sort=RELEVANCE&limit=${limit}&fields=${placeSearchFields.join(',')}`, {
      headers: {
        accept: 'application/json',
        Authorization: 'fsq32n4d1KUF+Q1wTFubzkllNlz98R2t39y5rYq/jRL+ueY='
      }
    });
    // console.log(response.data.results[0]);
    if (response.data) {
      return response.data.results;
    }
  } catch (error: any) {
    console.error('Google Place Search Error: ', error.message);
  }
}