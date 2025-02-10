import Image from 'next/image'
import React from 'react'
import PlaceCategory from './PlaceCategory'

export default function PlaceOverview({ resultItem, selectedPlace, setSelectedPlace }: PlaceOverviewProps) {
  const photo: Photo | undefined = resultItem.photos && resultItem.photos[1];
  const photoUrl = photo && `${photo.prefix}${photo.width}x${photo.height}${photo.suffix}`

  return (
    <div className='p-2 pt-0'>
      <div 
        className='p-2 hover:bg-gray-100 hover:drop-shadow-sm rounded-lg cursor-pointer flex flex-col gap-2'
        onClick={() => {
          selectedPlace === resultItem.fsq_id ? setSelectedPlace(null) : setSelectedPlace(resultItem.fsq_id)
        }}
      >
        <div className='w-full h-[180px] bg-slate-200 rounded-md relative overflow-hidden'>
          {
            photoUrl &&
            <Image 
              src={photoUrl}
              alt={resultItem.name + 'photo'}
              fill={true}
              style={{objectFit: 'cover', objectPosition: 'center'}}
            />
          }
          
        </div>

        <div className='w-full display flex justify-between items-center'>
          <p className='font-semibold'>{resultItem.name}</p>
          <div className='flex gap-1 items-center ml-2 flex-shrink-0'>
            <p>
            <span className='text-customBlue-200 font-semibold'>
              {(Math.ceil((resultItem.rating / 2) * 10) / 10).toFixed(1)}
            </span>/5
            </p>
            <div className='relative'>
              <Image 
                src={'/dialog/star.png'}
                alt='star'
                width={16} height={16}
              />
            </div>
          </div>
        </div>

        <div className='flex gap-2 flex-wrap'>
          {
            resultItem.categories.map((category) => (
              <PlaceCategory
                key={category.id}
                category={category}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}
