import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function FlightOverview({ flightOption }: { flightOption: FlightOption }) {
  const [displayedAirlines, setDisplayedAirlines] = useState<Set<string>>(new Set());
  const displayedAirlinesArray = Array.from(displayedAirlines);
  const features: string[] = [
    `${flightOption.layovers ? flightOption.layovers.length + ' layovers' : ''}`,
    flightOption.type
  ];

  useEffect(() => {
    const newDisplayedAirlines = new Set<string>();
    flightOption.flights.forEach(flight => {
      newDisplayedAirlines.add(flight.airline);
    });
    setDisplayedAirlines(newDisplayedAirlines);
  }, [flightOption]);

  return (
    <div className='px-2 flex gap-4 max-sm:gap-2 items-center'>
      {
        displayedAirlinesArray.length > 1 &&
        <>
          <p>Fly by</p>
          {
            displayedAirlinesArray.map((airline, index) => (
              <div className='flex gap-2 items-center' key={index}>
                {
                  displayedAirlinesArray.length !== 1 && (
                    <Image
                      src={flightOption.flights.find(flight => flight.airline === airline)?.airline_logo || ''}
                      alt={airline}
                      width={25}
                      height={25}
                      loading='lazy'
                    />
                  )
                }
              </div>
            ))
          }
          <span className='h-4 w-[2px] bg-slate-200'></span>
        </>
      }
      {
        features.map((value, index) => {
          if (value) {
            return (
              <>
                <p>{value}</p>
                {
                  index !== features.length - 1 &&
                  <span className='h-4 w-[2px] bg-slate-200'></span>
                }
              </>
            )
          }
        })
      }
    </div>
  );
}
