import { getHotelByToken } from '@/lib/actions/serpapi/hotelSearch.action';
import React, { useEffect, useState } from 'react'
import ParamBlock from '../../chatroom/dialog/hotelSearch/ParamBlock';
import Image from 'next/image';
import { showToast } from '@/lib/utils';
import { ERROR_TOAST_TITLE } from '@/constants';
import DirectionButton from './DirectionButton';

export default function PropertyBlock({ accommodationItem }: { accommodationItem: AccommodationItem }) {
  const [hotelDetails, setHotelDetails] = useState<HotelDetails | null>(null);

  const getHotel = async (propertyToken: string, checkIn: string, checkOut: string) => {
    const response = await getHotelByToken(propertyToken, checkIn, checkOut);
    if (response.data) {
      setHotelDetails(response.data);
    }
    else if (response.error) {
      showToast({ title: ERROR_TOAST_TITLE, description: response.error.message });
    }
  }
  
  useEffect(() => {
    if (accommodationItem.from_datetime && accommodationItem.to_datetime)
    getHotel(accommodationItem.property_token, accommodationItem.from_datetime, accommodationItem.to_datetime);
  }, [accommodationItem]);

  return (
    <div className='p-1 pt-3 rounded-lg flex flex-col gap-4 relative'>
      {
        hotelDetails &&
        <DirectionButton address={hotelDetails.address} />
      }      
      {
        hotelDetails &&
        <>
          <div className='flex gap-6 items-center'>
            <ParamBlock label={`${hotelDetails.search_parameters.check_in_date} - ${hotelDetails.search_parameters.check_out_date}`} type='duration' />
            <ParamBlock label={hotelDetails.search_parameters.adults} type='people' />
            <ParamBlock label={hotelDetails.address} type='location' />
          </div>

          <div className='flex gap-4'>
            <div className='flex-shrink-0 w-[20%] aspect-[5/7] bg-slate-200 rounded-md relative overflow-hidden'>
              <Image
                src={hotelDetails.images[0].original_image}
                alt='hotel image'
                fill={true}
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                loading='lazy'
              />
            </div>

            <div className='flex flex-col flex-1'>
              <div className="flex-grow flex flex-col gap-2">
                <p className='font-semibold'>{hotelDetails.name}</p>
                <p className='text-xs text-gray-400'>
                  Near {' '}
                  {hotelDetails.nearby_places[0].name} {' '}
                  {
                    hotelDetails.nearby_places[0].transportations &&
                    <>
                      ({hotelDetails.nearby_places[0].transportations[0].duration} {' '}
                      by {' '}
                      {hotelDetails.nearby_places[0].transportations[0].type.toLowerCase()})
                    </>
                  }
                </p>
                <div className='flex gap-1 items-center text-xs'>
                  <p>
                    <span className='text-customBlue-200 font-semibold'>
                      {(Math.ceil((hotelDetails.overall_rating) * 10) / 10).toFixed(1)}
                    </span>/5
                  </p>
                  <Image 
                    src={'/dialog/star.png'}
                    alt='star'
                    width={16} height={16}
                    loading='lazy'
                  />
                  <p>({hotelDetails.reviews})</p>
                </div>
              </div>
      
              <div className='w-full flex justify-between items-center'>
                <p className='font-semibold underline'>
                  <a href={hotelDetails.link} target="_blank" rel="noopener noreferrer">
                    {hotelDetails.rate_per_night.lowest}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  )
}
