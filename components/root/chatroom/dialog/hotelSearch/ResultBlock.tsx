import CustomButton from '@/components/global/CustomButton';
import SaveWindow from '@/components/root/planner/windows/SaveWindow';
import Image from 'next/image'
import React, { useState } from 'react'

export default function ResultBlock(
  {
    hotelProperty,
    check_in_date,
    check_out_date
  }: {
    hotelProperty: HotelProperty;
    check_in_date: string;
    check_out_date: string;
  }
) {
  const allItems = hotelProperty.hotel_class
    ? [hotelProperty.hotel_class, ...hotelProperty.amenities]
    : [...hotelProperty.amenities];

  const [showWindow, setShowWindow] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<AccommodationItem>();

  return (
    <div className='flex gap-4'>
      <div className='flex-shrink-0 w-[20%] aspect-[5/8] bg-slate-200 rounded-md relative overflow-hidden'>
        {
          hotelProperty.images?.length > 0 &&
          <Image
            src={hotelProperty.images[0].original_image}
            alt='hotel image'
            fill={true}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            loading='lazy'
          />
        }
      </div>

      <div className='flex flex-col flex-1'>
        <div className="flex-grow flex flex-col gap-2">
          <p className='font-semibold'>{hotelProperty.name}</p>
          {
            hotelProperty.nearby_places &&
            hotelProperty.nearby_places.length > 0 &&
            hotelProperty.nearby_places[0].transportations &&
            <p className='text-xs text-gray-400'>
              Near {' '}
              {hotelProperty.nearby_places[0].name} {' '}
              {hotelProperty.nearby_places[0].transportations[0].duration} {' '}
              by {' '}
              {hotelProperty.nearby_places[0].transportations[0].type.toLowerCase()}
            </p>
          }
          <div className='flex gap-1 items-center text-xs'>
            <p>
              <span className='text-customBlue-200 font-semibold'>
                {(Math.ceil((hotelProperty.overall_rating) * 10) / 10).toFixed(1)}
              </span>/5
            </p>
            <Image
              src={'/dialog/star.png'}
              alt='star'
              width={16} height={16}
              loading='lazy'
            />
            <p>({hotelProperty.reviews})</p>
          </div>

          <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:hidden gap-1 text-xs text-customBlue-100 mt-2">
            {allItems.slice(0, 6).map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </div>

        <div className='w-full flex justify-between items-center'>
          <p className='font-semibold underline'>
            <a href={hotelProperty.link} target="_blank" rel="noopener noreferrer">
              {hotelProperty.rate_per_night.lowest}
            </a>
          </p>

          <CustomButton
            label='Save to Planner'
            type='button'
            className='rounded-lg text-xs bg-gray-200 px-3 py-[6px] h-fit'
            onClick={() => {
              setShowWindow(true);
              setSelectedItem({
                piid: crypto.randomUUID(),
                from_datetime: check_in_date,
                to_datetime: check_out_date,
                property_token: hotelProperty.property_token
              })
            }}
          />
        </div>
      </div>
      {
        showWindow && selectedItem &&
        <SaveWindow setShowWindow={setShowWindow} selectedItem={selectedItem} />
      }
    </div>
  )
}
