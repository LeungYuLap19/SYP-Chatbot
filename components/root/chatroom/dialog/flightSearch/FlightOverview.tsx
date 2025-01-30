import Image from 'next/image';
import React from 'react';

export default function FlightOverview({ flightOption }: { flightOption: FlightOption }) {
  const displayedAirlines = new Set<string>(); 

  return (
    <div className='px-2 flex gap-4 max-sm:gap-2 items-center'>
      <p>Fly by</p>
      {flightOption.flights.map((flight, index) => {
        if (displayedAirlines.has(flight.airline)) return null;
        displayedAirlines.add(flight.airline);

        return (
          <div className='flex gap-2 items-center' key={index}>
            <Image
              key={flight.airline}
              src={flight.airline_logo || ''}
              alt={flight.airline}
              width={25}
              height={25}
            />
          </div>
        );
      })}
      <span className='h-4 w-[2px] bg-slate-200'></span>
      <p>{flightOption.layovers.length} layovers</p>
      <span className='h-4 w-[2px] bg-slate-200'></span>
      <p>{flightOption.type}</p>
    </div>
  );
}
