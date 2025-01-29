'use client'
import React, { useState } from 'react'
import DepArr from './DepArr'
import SearchResult from './SearchResult'
import SearchResultTitle from './SearchResultTitle'
import FlightOverview from './FlightOverview'

export default function FlightSearch({ flightSearch }: { flightSearch: FlightResponse }) {
  const [showDetails, setShowDetails] = useState<number>(-1);

  return (
    <div className='w-full flex'>
      <div className='max-w-[70%] max-lg:max-w-full flex flex-col rounded-lg bg-white text-sm overflow-hidden'>
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
        />

        <div className='flex flex-col gap-5 p-6'>
          {
            flightSearch.best_flights?.map((flightOption, index) => (
              <div key={index} className='flex flex-col gap-5'>
                <div className='flex'>
                  <span className='w-full h-[1px] bg-slate-200'></span>
                </div>
                <SearchResultTitle 
                  index={index}
                  totalDuration={flightOption.total_duration}
                  airlineLogo={flightOption.airline_logo || ''}
                  price={flightOption.price}
                  showDetails={showDetails}
                  setShowDetails={setShowDetails}
                />
                {
                  showDetails === index ?
                    <SearchResult 
                      key={index}
                      flightOption={flightOption}
                    /> :
                  <FlightOverview flightOption={flightOption} />  
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
