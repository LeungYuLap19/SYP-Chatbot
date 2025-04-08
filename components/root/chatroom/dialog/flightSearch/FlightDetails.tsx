import Image from 'next/image'
import React from 'react'
import FromTo from '../common/FromTo'

export default function FlightDetails({ flightDetails }: { flightDetails: FlightDetails }) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-row gap-4 items-center'>
        {
          flightDetails.airline_logo ? (
            <Image
              src={flightDetails.airline_logo}
              alt={flightDetails.airline}
              width={24} height={24}
              loading='lazy'
            />
          ) :
          (
            <div className='w-5 h-5 bg-slate-200 rounded-md'></div>
          )
        }
        <p className='text-xs'>{flightDetails.airline}</p>
      </div>
      
      <div className='px-2'>
        <FromTo
          fromIATA={flightDetails.departure_airport.id}
          fromAirport={flightDetails.departure_airport.name}
          fromLocalTime={flightDetails.departure_airport.time || 'NaN:NaN'}
          toIATA={flightDetails.arrival_airport.id}
          toAirport={flightDetails.arrival_airport.name}
          toLocalTime={flightDetails.arrival_airport.time || 'NaN:NaN'}
          fromUTCTime={flightDetails.departure_airport.time || 'NaN:NaN'}
          toUTCTime={flightDetails.arrival_airport.time || 'NaN:NaN'}
        />
      </div>
      
      <div className='flex flex-col gap-2'>
        <p className='text-xs text-gray-400'>
          {flightDetails.airplane} {' - '} {flightDetails.flight_number.replace(' ', '')}
        </p>
        <div className='flex flex-wrap gap-2'>
          {
            flightDetails.extensions?.map((value, index) => (
              <>
                {
                  index !== 0 &&
                  <span className='h-4 w-[2px] bg-slate-200'></span>
                }
                <p className='text-xs text-gray-400'>{value}</p>
              </>
            ))
          }
        </div>
      </div>
    </div>
  )
}
