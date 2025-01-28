import { formatDate, formatTime, getDuration } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'
import InformationBlock from './InformationBlock';

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

        <div className='p-6 pt-0 flex flex-col gap-2'>
          <p className='text-customBlue-200 font-semibold text-xs'>On { formatDate(flightStatus.departure.scheduledTime.local) }</p>
          
          <div className='flex items-center justify-between gap-5'>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-2 text-xl'>
                <span className='font-bold'>{flightStatus.departure.airport.iata}</span>
                <p>{flightStatus.departure.airport.municipalityName}</p>
              </div>
              <p className='text-xs text-customBlack-200'>{flightStatus.departure.airport.name} Airport</p>
            </div>

            <div className='relative'>
              <Image 
                src={'/dialog/right-arrow-svgrepo-com.svg'}
                alt='right arrow'
                width={24} height={24}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-2 text-xl'>
                <span className='font-bold'>{flightStatus.arrival.airport.iata}</span>
                <p>{flightStatus.arrival.airport.municipalityName}</p>
              </div>
              <p className='text-xs text-customBlack-200'>{flightStatus.arrival.airport.name} Airport</p>
            </div>
          </div>
        </div>

        <div className='p-6 pt-0 flex flex-col gap-2'>
          <p className='text-customBlue-200 font-semibold text-xs'>Flight information</p>

          <div className='flex flex-row gap-4'>
            <div className='flex flex-col items-center py-2'>
              <span className='w-[8px] h-[8px] rounded-sm bg-black'></span>
              <span className='w-[2px] h-12 bg-black'></span>
              <span className='w-[8px] h-[8px] rounded-sm bg-black'></span>
            </div>

            <div className='flex flex-col justify-between'>
              <div>
                <span className='font-semibold'>{flightStatus.departure.airport.iata}</span> {' '}
                Scheduled Departure {' '}
                <span className='font-semibold'>{ formatTime(flightStatus.departure.scheduledTime.local) }</span> {' '}
                <span>{`(${flightStatus.departure.airport.countryCode} Time)`}</span>
              </div>

              <div className='text-customBlack-200 text-xs'>
                { getDuration(flightStatus.departure.scheduledTime.utc, flightStatus.arrival.scheduledTime.utc) }
              </div>

              <div>
                <span className='font-semibold'>{flightStatus.arrival.airport.iata}</span> {' '}
                Scheduled Arrival {' '}
                <span className='font-semibold'>{ formatTime(flightStatus.arrival.scheduledTime.local) }</span> {' '}
                <span>{`(${flightStatus.arrival.airport.countryCode} Time)`}</span>            
              </div>
            </div>
          </div>
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
              style={{objectFit: 'cover', objectPosition: 'center'}}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
