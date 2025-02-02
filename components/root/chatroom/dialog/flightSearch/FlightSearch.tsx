'use client'
import React, { useState } from 'react'
import DepArr from '../common/DepArr'
import SearchResult from './SearchResult'
import SearchResultTitle from './SearchResultTitle'
import FlightOverview from './FlightOverview'

export default function FlightSearch({ flightSearch }: { flightSearch: FlightResponse }) {
  const [showDetails, setShowDetails] = useState<number>(-1);

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
                    <div className='px-6 flex'>
                      <span className='w-full h-[1px] bg-slate-200 '></span>
                    </div>
                  </>
                  
                  // :
                  // <FlightOverview flightOption={flightOption} />
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
