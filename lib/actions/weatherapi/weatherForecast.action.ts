'use server'

import axios from "axios"

export async function getWeatherForecast(lat: number, lng: number) {
  try {
    const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${lat},${lng}&days=3&aqi=no&alerts=no`);

    // console.log(response.data);
    if (response.data) {
      return response.data
    }
  } catch (error: any) {
    console.error('Get Weather Error:', error);
  }
}