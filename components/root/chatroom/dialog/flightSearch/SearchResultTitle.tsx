import { getDurationWithMinutes } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

export default function SearchResultTitle({
  index, totalDuration, airline, airlineLogo, price, showDetails, setShowDetails
}: SearchResultTitleProps) {
  return (
    <>
      <div 
        className={`flex justify-between items-center w-full
        cursor-pointer hover:bg-gray-100 hover:drop-shadow-sm p-3 py-2 rounded-lg
        ${index === showDetails && 'bg-gray-100'}`}
        onClick={() => {
          index === showDetails ? setShowDetails(-1) : setShowDetails(index)
        }}
      >
        <div className='flex items-center justify-between w-52'>
          <div className='flex items-center gap-4'>
            <Image 
              src={airlineLogo}
              alt='Airline Logo'
              width={25} height={25}
            />
            <p className='text-sm'>{airline || 'Multi-Airlines'}</p>
          </div>
          <p className='text-sm'>{getDurationWithMinutes(totalDuration)}</p>
        </div>
        
        <p className='text-sm text-customBlue-200 font-semibold'>{Math.floor(price * 7.8)}{' '}HKD</p>
      </div>
    </>
    
  )
}
