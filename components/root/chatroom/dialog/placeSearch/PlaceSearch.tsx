import React from 'react'
import PlaceOverview from './PlaceOverview'

export default function PlaceSearch({ resultItem }: { resultItem: ResultItem[] }) {
  return (
    <div className='w-full flex'>
      <div className='w-[40%] max-2xl:w-[50%] max-xl:w-[60%] max-lg:w-[65%] max-md:w-full flex flex-col rounded-lg bg-white text-sm overflow-hidden'>
        <div className='p-6 pb-4'>
          <p>
            Here are some popular {' '}
            <span className='text-customBlue-200 font-semibold'> attractions</span> {' '}
            I found in {' '}
            <span className='text-customBlue-200 font-semibold'> New York City</span>:
          </p>
        </div>

        <div className='flex flex-col gap-4'>
          {
            resultItem.map((item) => (
              <PlaceOverview
                key={item.fsq_id}
                resultItem={item}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}
