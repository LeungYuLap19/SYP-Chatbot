import { get12HoursForecast } from '@/lib/utils';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function HourlyForecast({ weatherForecast }: { weatherForecast: WeatherForecast }) {
  const [formattedHours, setFormattedHours] = useState<Hour[] | null>(null);

  useEffect(() => {
    const formattedHourForecast = get12HoursForecast(weatherForecast.forecast.forecastday);
    setFormattedHours(formattedHourForecast);
  }, [weatherForecast]);

  return (
    <div className='flex flex-col gap-4'>
      <p className='font-semibold text-xs text-customBlue-200'>Hourly Forecast</p>

      <div className='flex overflow-auto gap-11 text-xs'>
        {
          formattedHours &&
          formattedHours.map((hour: Hour) => (
            <div key={hour.time} className='flex flex-col gap-2 items-center flex-shrink-0'>
              <p className=''>{hour.time}</p>
              <Image
                src={'https:' + hour.condition.icon}
                alt={hour.condition.text}
                height={30} width={30}
                className='flex-shrink-0'
              />
              <p className='text-lg font-semibold mr-[-4px]'>{Math.floor(hour.temp_c)}°</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}
