import Image from 'next/image'
import React from 'react'

export default function DayForecast({ day }: { day: FormattedDaysForecast }) {
  return (
    <div key={day.weekday} className='flex justify-between'>
      <div className='flex w-[30%] gap-4 items-center justify-between'>
        <p className=''>{day.weekday}</p>
        <Image 
          src={'https:' + day.condition.icon}
          alt={day.condition.text}
          height={30} width={30}
        />
      </div>
      
      <div className='flex gap-4 w-[50%] max-lg:w-[60%] max-md:w-[50%] max-sm:w-[60%] items-center'>
        <p className='text-customBlack-100'>{Math.floor(day.mintemp_c)}°</p>
        <div className='relative h-[6px] flex-1 bg-slate-200 rounded-full'>
        {day.hottestHours.map((hour, index) => (
          <div
            key={index}
            className={`absolute h-[6px] bg-red-500
            ${index === 0 && 'rounded-l-full'} 
            ${index === day.hottestHours.length - 1 && 'rounded-r-full'}`}
            style={{
              left: `${(hour.hour / 24) * 100}%`,
              width: '4.16%', // Assuming each hour block is 1/24th of the day
            }}
          ></div>
        ))}
        </div>
        <p className=''>{Math.floor(day.maxtemp_c)}°</p>
      </div>
    </div>
  )
}
