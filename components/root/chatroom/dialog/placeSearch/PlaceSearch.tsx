'use client'
import React, { useEffect, useState } from 'react'
import PlaceOverview from './PlaceOverview'
import PlaceDetails from './PlaceDetails'
import PlaceDetailsData from '@/jsonTest/placeDetails.json'

export default function PlaceSearch({ resultItem, geoResponse }: { resultItem: ResultItem[]; geoResponse: Geocoding }) {
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);

  return (
    <div className='w-full flex'>
      <div className='w-[40%] max-2xl:w-[50%] max-xl:w-[60%] max-lg:w-[65%] max-md:w-full flex flex-col rounded-lg bg-white text-sm overflow-hidden'>
        <div className='p-6 pb-4'>
          <p>
            Here are some popular {' '}
            <span className='text-customBlue-200 font-semibold'> attractions</span> {' '}
            I found in {' '}
            <span className='text-customBlue-200 font-semibold'> {geoResponse.address_components[0].short_name}</span>:
          </p>
        </div>

        <div className='flex flex-col gap-4'>
          {
            resultItem.map((item, index) => (
              <div className='flex flex-col' key={item.fsq_id}>
                <PlaceOverview
                  resultItem={item}
                  selectedPlace={selectedPlace}
                  setSelectedPlace={setSelectedPlace}
                />
                {
                  selectedPlace === item.fsq_id && 
                  <>
                    <PlaceDetails resultItem={item} />
                    {
                      index != resultItem.length - 1 &&
                        <div className='flex px-2'>
                          <span className='w-full h-[1px] bg-slate-200'></span>
                        </div>
                    }
                  </>
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
