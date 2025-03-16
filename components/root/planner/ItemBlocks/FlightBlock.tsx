import React, { useEffect, useState } from 'react'
import FlightStatusSection from './FlightStatusSection'
import DepArr from '../../chatroom/dialog/common/DepArr';

export default function FlightBlock({ flightItem }: { flightItem: FlightItem }) {
  const [depArrProps, setDepArrProps] = useState<DepArrProps>({
    localTime: '',
    fromIATA: '',
    fromCity: '',
    fromAirport: '',
    toIATA: '',
    toCity: '',
    toAirport: ''
  });

  return (
    <div className='p-3 rounded-lg bg-white text-sm'>
      <DepArr 
        localTime={depArrProps.localTime} 
        fromIATA={depArrProps.fromIATA} 
        fromCity={depArrProps.fromCity} 
        fromAirport={depArrProps.fromAirport} 
        toIATA={depArrProps.toIATA} 
        toCity={depArrProps.toCity} 
        toAirport={depArrProps.toAirport} 
        className='!px-0'
      />

      <div className='flex flex-col gap-4'>
        {
          flightItem.flights.map((flight, index) => (
            <FlightStatusSection 
              key={index} 
              flight={flight} 
              needToSet={index === 0 ? 0 : index === flightItem.flights.length - 1 ? 1 : undefined}
              layover={index !== flightItem.flights.length - 1 ? true : false} 
              setDepArrProps={(index === 0 || index === flightItem.flights.length - 1) ? setDepArrProps : undefined}
            />
          ))
        }
      </div>
      
    </div>
  )
}
