import Image from 'next/image'
import React from 'react'
import PlaceCategory from './PlaceCategory'

export default function PlaceOverview({ resultItem }: { resultItem: ResultItem }) {
  return (
    <div className='p-2 pt-0'>
      <div className='p-2 hover:bg-gray-100 hover:drop-shadow-sm rounded-lg cursor-pointer flex flex-col gap-2'>
        <div className='w-full h-[180px] bg-slate-200 rounded-md'>
          {/* <Image /> */}
        </div>

        <div className='w-full display flex justify-between items-center'>
          <p className='font-semibold text-lg'>{resultItem.name}</p>
          <div className='flex gap-1 items-center ml-2 flex-shrink-0'>
            <p>
              <span className='text-customBlue-200 font-semibold'>4.6</span>/5
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
