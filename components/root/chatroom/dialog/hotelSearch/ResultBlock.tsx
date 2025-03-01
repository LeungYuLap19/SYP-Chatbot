import Image from 'next/image'
import React from 'react'

export default function ResultBlock({ hotelProperty }: { hotelProperty: HotelProperty }) {
  const allItems = hotelProperty.hotel_class 
    ? [hotelProperty.hotel_class, ...hotelProperty.amenities]
    : [...hotelProperty.amenities];

  return (
    <div className='flex gap-4'>
      <div className='flex-shrink-0 w-[20%] aspect-[5/8] bg-slate-200 rounded-md relative overflow-hidden'>
        <Image 
          src={hotelProperty.images[0].original_image}
          alt='hotel image'
          fill={true}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>

      <div className='flex flex-col flex-1'>
        <div className="flex-grow flex flex-col gap-2">
          <p className='font-semibold'>{hotelProperty.name}</p>
          <p className='text-xs text-customBlack-200'>
            Near {' '}
            {hotelProperty.nearby_places[0].name} {' '}
            ({hotelProperty.nearby_places[0].transportations[0].duration} {' '}
            by {' '}
            {hotelProperty.nearby_places[0].transportations[0].type.toLowerCase()})
          </p>
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
            />
            <p>({hotelProperty.reviews})</p>
          </div>

          <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:hidden gap-1 text-xs text-customBlue-100 mt-2">
            {allItems.slice(0, 6).map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </div>

        <p className='font-semibold w-full text-right underline'>
          <a href={hotelProperty.link} target="_blank" rel="noopener noreferrer">
            {hotelProperty.rate_per_night.lowest}
          </a>
        </p>
      </div>
    </div>
  )
}
