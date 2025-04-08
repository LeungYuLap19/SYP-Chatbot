import React from 'react'
import FlightDetails from './FlightDetails'
import { getDurationWithMinutes } from '@/lib/utils'

export default function SearchResult({ flightOption }: { flightOption: FlightOption }) {
  return (
    <div className='flex flex-col gap-6 px-7'>
      {
        flightOption.flights.map((flightDetails, index) => (
          <>
            <FlightDetails 
              key={index}
              flightDetails={flightDetails}
            />

            {
              index < flightOption.flights.length - 1 && (
                <div className='flex flex-row gap-2 justify-center items-center'>
                  <span className='w-[5%] h-[2px] bg-slate-200'></span>
                  <p className='text-xs text-gray-400 flex-shrink-0'>
                    { getDurationWithMinutes(flightOption.layovers[index].duration) } {' '}
                    layover {' - '}
                    { flightOption.layovers[index].id }
                    <span className='max-md:hidden'>
                      {' - '}
                      { flightOption.layovers[index].name }
                    </span>
                    {
                      flightOption.layovers[index].overnight && 
                      <span className='text-red-500 font-semibold'> (Overnight)</span>
                    }
                  </p>
                  <span className='w-full h-[2px] bg-slate-200'></span>
                </div>
              )
            }
          </>
        ))
      }
    </div>
  )
}
