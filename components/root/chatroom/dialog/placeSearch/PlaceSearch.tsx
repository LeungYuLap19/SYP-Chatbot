'use client'
import React, { useState } from 'react'
import PlaceOverview from './PlaceOverview'
import PlaceDetails from './PlaceDetails'
import { getIdsOrLabelByCategory } from '@/lib/utils';
import BotDialogLayout from '../BotDialogLayout';

export default function PlaceSearch({ 
  resultItem, geoResponse, responseType 
}: { 
  resultItem: ResultItem[]; 
  geoResponse: Geocoding; 
  responseType: "popularPlaces" | "restaurantSearch" | "dessertSearch" | "cafeSearch" | "barSearch" | "nightMarketSearch" | "entertainmentSearch" | "shoppingSearch";
}) {
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);

  return (
    <BotDialogLayout widthClassName='w-[40%] max-2xl:w-[50%] max-xl:w-[60%] max-lg:w-[65%] max-md:w-full'>
      <div className='p-6 pb-4'>
        <p>
          Here are some {' '}
          <span className='text-customBlue-200 font-semibold'>{getIdsOrLabelByCategory(responseType, false)}</span> {' '}
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
                <PlaceDetails resultItem={item} />
              }
            </div>
          ))
        }
      </div>
    </BotDialogLayout>
  )
}
