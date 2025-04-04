import { useGetAPIs } from '@/lib/hooks/useGetAPIs'
import { format } from 'date-fns';
import React, { useEffect } from 'react'
import FromTo from '../../chatroom/dialog/common/FromTo';
import InformationBlock from '../../chatroom/dialog/flightStatus/InformationBlock';
import { getAirportForDirection } from '@/lib/utils';

export default function FlightStatusSection(
  { flight, layover, needToSet, setDepArrProps }: 
  { 
    flight: Flight; 
    layover: boolean; 
    needToSet?: number;
    setDepArrProps?: React.Dispatch<React.SetStateAction<DepArrProps>>;
  }
) {
  const { flightStatus, searchFlightStatus } = useGetAPIs(false);

  useEffect(() => {
    if (flight.from_datetime) {
      const formattedDate = format(new Date(flight.from_datetime), "yyyy-MM-dd");
      searchFlightStatus(flight.flight_number.replace(' ', ''), formattedDate);
    }
  }, [flight]);

  useEffect(() => {
    if (setDepArrProps && flightStatus) {
      if (needToSet === 0) {
        setDepArrProps((prev) => ({
          ...prev,
          localTime: flightStatus.departure.scheduledTime.local,
          fromIATA: flightStatus.departure.airport.iata,
          fromCity: flightStatus.departure.airport.municipalityName,
          fromAirport: flightStatus.departure.airport.name,
        }));

        if (getAirportForDirection(flightStatus) === 'departure') {
          setDepArrProps((prev) => ({
            ...prev,
            address: flightStatus.departure.airport.name,
          }));
        }
      }
      if (needToSet === 1) {
        setDepArrProps((prev) => ({
          ...prev,
          toIATA: flightStatus.arrival.airport.iata,
          toCity: flightStatus.arrival.airport.municipalityName,
          toAirport: flightStatus.arrival.airport.name,
        }));

        if (getAirportForDirection(flightStatus) === 'arrival') {
          setDepArrProps((prev) => ({
            ...prev,
            address: flightStatus.arrival.airport.name,
          }));
        }
      }
    }
  }, [flightStatus, setDepArrProps, needToSet]);



  return (
    <div className='flex flex-col gap-4'>
      { 
        flightStatus &&
        <>
          <div className='flex items-center gap-4'>
            <div className='w-5 h-5 bg-slate-200 rounded-md'></div>
            <p className='text-xs'>{flightStatus.airline.name}</p>
          </div>

          <div className='px-2'>
            <FromTo 
              fromIATA={flightStatus.departure.airport.iata} 
              fromLocalTime={flightStatus.departure.scheduledTime.local} 
              toIATA={flightStatus.arrival.airport.iata} 
              toLocalTime={flightStatus.arrival.scheduledTime.local} 
              fromUTCTime={flightStatus.departure.scheduledTime.utc} 
              toUTCTime={flightStatus.arrival.scheduledTime.utc}        
            />
          </div>
          

          <p className='text-xs text-customBlack-200'>
            {flightStatus.number.replace(' ', '')} {' - '} {flightStatus.aircraft?.model && flightStatus.aircraft.model} {' - '}
          </p>

          <div className='flex justify-between'>
            <InformationBlock className='!text-sm' label='Terminal' value={`${flightStatus.departure.terminal && 'T' + flightStatus.departure.terminal}`} />
            <InformationBlock className='!text-sm' label='Check-In' value={flightStatus.departure.checkInDesk} />
            <InformationBlock className='!text-sm' label='Gate' value={flightStatus.departure.gate} />
            <InformationBlock className='!text-sm' label='Status' value={flightStatus.status} />
          </div>

          {
            layover &&
            <div className='flex flex-row gap-2 justify-center items-center'>
              <span className='w-[5%] h-[2px] bg-slate-200'></span>
              <p className='text-xs text-customBlack-200 flex-shrink-0'>
                layover {' - '}
                {flightStatus.arrival.airport.iata} {' - '}
                {flightStatus.arrival.airport.name} Airport 
              </p>
              <span className='w-full h-[2px] bg-slate-200'></span>
            </div>
          }
        </>
      }
    </div>
  )
}
