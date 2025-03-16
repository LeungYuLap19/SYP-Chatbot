import { getPlaceDetails } from '@/lib/actions/foursquare/placeSearch.action';
import React, { useEffect, useState } from 'react'
import PlaceOverview from '../../chatroom/dialog/placeSearch/PlaceOverview';
import PlaceDetails from '../../chatroom/dialog/placeSearch/PlaceDetails';

export default function PlaceBlock({ placeItem }: { placeItem: PlaceItem }) {
  const [placeDetails, setPlaceDetails] = useState<ResultItem | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);

  const getPlace = async (fsq_id: string) => {
    const response = await getPlaceDetails(fsq_id); 
    if (response) {
      setPlaceDetails(response);
    }
  }

  useEffect(() => {
    getPlace(placeItem.fsq_id);
  }, [placeItem]);

  return (
    <div className=' rounded-lg bg-white text-sm'>
      {
        placeDetails &&
        <div className='flex flex-col ml-[-8px] mr-[-8px]'>
          <PlaceOverview 
            resultItem={placeDetails}
            selectedPlace={selectedPlace}
            setSelectedPlace={setSelectedPlace}
          />
          {
            selectedPlace === placeDetails.fsq_id && 
            <PlaceDetails resultItem={placeDetails} isSaved={true} />
          }
        </div>
      }
    </div>
  )
}
