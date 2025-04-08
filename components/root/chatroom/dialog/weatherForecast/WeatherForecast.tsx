import React, { useEffect, useState } from 'react'
import WeatherOverview from './WeatherOverview'
import HourlyForecast from './HourlyForecast'
import DayForecast from './DayForecast'
import { get7DaysForecast } from '@/lib/utils';

export default function WeatherForecast({ weatherForecast }: { weatherForecast: WeatherForecast }) {
  const [formattedDays, setFormattedDays] = useState<FormattedDaysForecast[] | null>(null);

  useEffect(() => {
    setFormattedDays(get7DaysForecast(weatherForecast.forecast.forecastday, weatherForecast.current.is_day));
  }, [weatherForecast]);

  return (
    <div className='w-full flex'>
      <div className='w-[40%] max-2xl:w-[50%] max-xl:w-[60%] max-lg:w-[65%] max-md:w-full flex flex-col rounded-lg bg-white text-sm overflow-hidden'>
        <div className='p-6 pb-4'>
          <p>
            Here is the weather in {' '}
            <span className='text-customBlue-200 font-semibold'>{weatherForecast.location.name}</span>
          </p>
        </div>

        <div className='flex flex-col gap-4 p-6 pt-0'>
          <WeatherOverview weatherForecast={weatherForecast} />
          <HourlyForecast weatherForecast={weatherForecast} />

          <p className='font-semibold text-xs text-customBlue-200 mt-4'>3 Days Forecast</p>
          { 
            formattedDays && 
              formattedDays.map((day, index) => (
                <DayForecast day={day} key={index} />
              ))
          }
        </div>
      </div>
    </div>
  )
}
