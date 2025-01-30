import { formatTime, getDuration } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'
import InformationBlock from './InformationBlock';
import DepArr from '../common/DepArr';
import FromTo from '../common/FromTo';

export default function FlightStatus({ flightStatus }: { flightStatus: FlightStatus }) {
  return (
    <div className='w-full flex'>
      <div className='max-w-[70%] max-lg:max-w-full flex flex-col rounded-lg bg-white text-sm overflow-hidden'>
        <div className='p-6'>
          <p>
            Here is the flight status for{' '}
            <span className='text-customBlue-200 font-semibold'>{flightStatus.airline.name}</span>
            {' '}flight{' '}
            <span className='text-customBlue-200 font-semibold'>{flightStatus.number}</span>:
          </p>
        </div>

        <DepArr
          localTime={flightStatus.departure.scheduledTime.local}
          fromIATA={flightStatus.departure.airport.iata}
          fromCity={flightStatus.departure.airport.municipalityName}
          fromAirport={flightStatus.departure.airport.name}
          toIATA={flightStatus.arrival.airport.iata}
          toCity={flightStatus.arrival.airport.municipalityName}
          toAirport={flightStatus.arrival.airport.name}
        />

        <div className='p-6 pt-0 flex flex-col gap-2'>
          <p className='text-customBlue-200 font-semibold text-xs'>Flight information</p>
          <FromTo
            fromIATA={flightStatus.departure.airport.iata}
            fromLocalTime={flightStatus.departure.scheduledTime.local}
            fromCountryCode={flightStatus.departure.airport.countryCode}
            toIATA={flightStatus.arrival.airport.iata}
            toLocalTime={flightStatus.arrival.scheduledTime.local}
            toCountryCode={flightStatus.arrival.airport.countryCode}
            fromUTCTime={flightStatus.departure.scheduledTime.utc}
            toUTCTime={flightStatus.arrival.scheduledTime.utc}
          />
        </div>

        <div className='flex justify-between p-6 pt-0'>
          <InformationBlock label='Terminal' value={`${flightStatus.departure.terminal && 'T' + flightStatus.departure.terminal}`} />
          <InformationBlock label='Check-In' value={flightStatus.departure.checkInDesk} />
          <InformationBlock label='Gate' value={flightStatus.departure.gate} />
          <InformationBlock label='Status' value={flightStatus.status} />
        </div>

        <div className='flex flex-col gap-2 p-6 pt-0'>
          <InformationBlock label='Aircraft Model' value={flightStatus.aircraft.model} />

          <div className='w-full h-32 relative rounded-md overflow-hidden'>
            <Image
              src={flightStatus.aircraft.image.url}
              alt='aircraft image'
              fill={true}
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
