import React from 'react'
import Image from 'next/image'

export default function WeatherOverview({ weatherForecast }: { weatherForecast: WeatherForecast }) {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex flex-col gap-1'>
        <p className='font-semibold text-xs text-customBlue-200'>{weatherForecast.location.name}</p>
        <p className='text-2xl font-semibold'>{Math.floor(weatherForecast.current.temp_c)}°</p>
      </div>

      <div className='flex flex-col justify-between items-end text-xs'>
        <Image 
          src={'https:' + weatherForecast.current.condition.icon}
          alt='weather icon'
          height={30} width={30}
          loading='lazy'
        />
        <p className='text-right'>{ weatherForecast.current.condition.text }</p>
        <p>{`H:${Math.floor(weatherForecast.forecast.forecastday[0].day.maxtemp_c)}° L:${Math.floor(weatherForecast.forecast.forecastday[0].day.mintemp_c)}°`}</p>
      </div>
    </div>
  )
}
