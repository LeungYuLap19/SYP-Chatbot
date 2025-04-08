'use server'

import axios from "axios"
import { getWeatherApiError } from "../errors/apiErrorsHandler";

export async function getWeatherForecast(
  // lat: number, lng: number
  location: string
): Promise<Result<WeatherForecast>>  {
  try {
    const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${location}&days=3&aqi=no&alerts=no`);

    // console.log(response.data);
    return { data: response.data }
  } catch (error: any) {
    console.error('Get Weather Error:', error);
    return { error: getWeatherApiError(error.code) }
  }
}