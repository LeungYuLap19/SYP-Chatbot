'use server'
import { placeSearchFields } from "@/constants";
import axios from "axios"
import { getFoursquareApiError } from "../errors/apiErrorsHandler";

export async function getPopularPlaces(ne: Northeast, sw: Southwest, ids: number[], limit: number): Promise<Result<ResultItem[]>> {
  try {
    const response = await axios.get(`https://api.foursquare.com/v3/places/search?ne=${ne.lat}%2C${ne.lng}&sw=${sw.lat}%2C${sw.lng}&sort=RELEVANCE&limit=${limit}&categories=${ids.join(',')}&fields=${placeSearchFields.join(',')}`, {
      headers: {
        accept: 'application/json',
        Authorization: 'fsq32n4d1KUF+Q1wTFubzkllNlz98R2t39y5rYq/jRL+ueY='
      }
    });
    // console.log(response.data.results[0]);
    return { data: response.data.results };
  } catch (error: any) {
    console.error('Google Place Search Error: ', error.message);
    return { error: getFoursquareApiError(error.code) };
  }
}

export async function getPlaceDetails(fsq_id: string): Promise<Result<ResultItem>> {
  try {
    const response = await axios.get(`https://api.foursquare.com/v3/places/${fsq_id}?fields=${placeSearchFields.join(',')}`, {
      headers: {
        accept: 'application/json',
        Authorization: 'fsq32n4d1KUF+Q1wTFubzkllNlz98R2t39y5rYq/jRL+ueY='
      }
    });
    // console.log(response.data);
    return { data: response.data };
  } catch (error: any) {
    console.error('Place Details Error:', error);
    return { error: getFoursquareApiError(error.code) };
  }
}