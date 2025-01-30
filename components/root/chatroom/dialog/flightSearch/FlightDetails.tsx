import Image from 'next/image'
import React from 'react'
import FromTo from '../common/FromTo'

export default function FlightDetails({ flightDetails }: { flightDetails: FlightDetails }) {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-row gap-4 items-center'>
        {
          flightDetails.airline_logo ? (
            <Image
              src={flightDetails.airline_logo}
              alt={flightDetails.airline}
              width={24} height={24}
            />
          ) :
            (
              <div className='w-5 h-5 bg-slate-200 rounded-md'></div>
            )
        }
        <p className='text-xs'>{flightDetails.airline}</p>
      </div>

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

      <p className='text-xs text-customBlack-200'>
        {flightDetails.airplane} {' - '} {flightDetails.flight_number.replace(' ', '')}
      </p>
    </div>
  )
}
