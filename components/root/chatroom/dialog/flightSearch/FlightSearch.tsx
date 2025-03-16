'use client'
import React, { useState } from 'react'
import DepArr from '../common/DepArr'
import SearchResult from './SearchResult'
import SearchResultTitle from './SearchResultTitle'
import CustomButton from '@/components/global/CustomButton'
import SaveWindow from '@/components/root/planner/SaveWindow'
import { randomUUID } from 'crypto'

export default function FlightSearch({ flightSearch }: { flightSearch: FlightResponse }) {
  const [showDetails, setShowDetails] = useState<number>(-1);
  const [showWindow, setShowWindow] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<FlightItem | AccommodationItem | PlaceItem>();

  return (
    <div className='w-full flex'>
      <div className='w-[50%] max-2xl:w-[60%] max-xl:w-[80%] max-lg:w-full flex flex-col rounded-lg bg-white text-sm overflow-hidden'>
        <div className='p-6'>
          <p>
            Here are some scheduled flights I found:
          </p>
        </div>

        <DepArr
          localTime={
            flightSearch.best_flights?.[0].flights[0].departure_airport.time ||
            flightSearch.other_flights[0].flights[0].departure_airport.time ||
            ''
          }
          fromIATA={flightSearch.airports[0].departure[0].airport.id}
          fromAirport={flightSearch.airports[0].departure[0].airport.name.replace("Airport", "").trim()}
          fromCity={flightSearch.airports[0].departure[0].city}
          toIATA={flightSearch.airports[0].arrival[0].airport.id}
          toAirport={flightSearch.airports[0].arrival[0].airport.name.replace("Airport", "").trim()}
          toCity={flightSearch.airports[0].arrival[0].city}
          className='py-0'
        />

        <div className='flex flex-col py-6'>
          {
            flightSearch.sortedFlights?.map((flightOption, index) => (
              <div key={index} className='flex flex-col gap-4'>
                <div className='flex px-6'>
                  {
                    index == 0 && !flightOption.layovers ?
                    <p className='text-xs text-customBlue-200 font-semibold'>
                      Non-Stop Flights
                    </p> :
                    index === flightSearch.sortedFlights?.findIndex(f => f.layovers) && flightOption.layovers ?
                    <p className={`text-xs text-customBlue-200 font-semibold ${index !== 0 && 'mt-4'}`}>
                      Flights With Layovers
                    </p> :
                    <></>
                  }
                </div>
                <div className='px-4'>
                  <SearchResultTitle
                    index={index}
                    airline={!flightOption.airline_logo?.includes('multi.png') ? flightOption.flights[0].airline : undefined}
                    totalDuration={flightOption.total_duration}
                    airlineLogo={flightOption.airline_logo || ''}
                    price={flightOption.price}
                    showDetails={showDetails}
                    setShowDetails={setShowDetails}
                  />
                </div>
                {
                  showDetails === index &&
                  <>
                    <SearchResult
                      key={index}
                      flightOption={flightOption}
                    /> 
                    <div className='flex justify-end px-6 mb-4'>
                      <CustomButton
                        loading={false}
                        label='Save Flight to Plan'
                        type='button'
                        onClick={() => 
                          {
                            setShowWindow(true);
                            setSelectedItem({
                              piid: crypto.randomUUID(),
                              from_datetime: flightOption.flights[0].departure_airport.time || null,
                              to_datetime: flightOption.flights[flightOption.flights.length - 1].arrival_airport.time || null,
                              flights: flightOption.flights.map((flight) => ({
                                flight_number: flight.flight_number,
                                from_datetime: flight.departure_airport.time || null,
                                to_datetime: flight.arrival_airport.time || null,
                              }))
                            });
                          }
                        }
                        className='bg-transparent text-xs rounded-lg w-full'
                      />
                    </div>
                  </>
                }
              </div>
            ))
          }
        </div>
      </div>
      {
        showWindow && selectedItem &&
        <SaveWindow setShowWindow={setShowWindow} selectedItem={selectedItem} />
      }
    </div>
  )
}
