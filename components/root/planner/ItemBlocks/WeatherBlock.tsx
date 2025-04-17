import { useGetAPIs } from '@/lib/hooks/useGetAPIs'
import React, { useEffect, useState } from 'react'
import WeatherOverview from '../../chatroom/dialog/weatherForecast/WeatherOverview';
import HourlyForecast from '../../chatroom/dialog/weatherForecast/HourlyForecast';
import { get7DaysForecast } from '@/lib/utils';
import DayForecast from '../../chatroom/dialog/weatherForecast/DayForecast';

export default function WeatherBlock({ weatherItem }: { weatherItem: WeatherItem }) {
  const { checkWeather, weatherResponse } = useGetAPIs(false);
  const [formattedDays, setFormattedDays] = useState<FormattedDaysForecast[] | null>(null);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (!weatherResponse || (weatherItem.location !== weatherResponse.location.name)) {
      checkWeather(weatherItem.location);
    }
    
    if (weatherResponse) {
      setFormattedDays(get7DaysForecast(weatherResponse.forecast.forecastday, weatherResponse.current.is_day));
    }
  }, [weatherItem, weatherResponse]);

  if (!weatherResponse) return;

  return (
    <div 
      onClick={() => setDisplay(!display)}
      title='click to see forecasts' 
      className='flex flex-col gap-6 cursor-pointer'
    >
      <WeatherOverview weatherForecast={weatherResponse} />
      <HourlyForecast weatherForecast={weatherResponse} />

      {
        display &&
        <>
          <p className='font-semibold text-xs text-customBlue-200 mt-4'>3 Days Forecast</p>
          { 
            formattedDays && 
            formattedDays.map((day, index) => (
              <DayForecast day={day} key={index} />
            ))
          }
        </>
      }
    </div>
  )
}
