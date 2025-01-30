import { getDurationWithMinutes } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

export default function SearchResultTitle({
  index, totalDuration, airlineLogo, price, showDetails, setShowDetails
}: SearchResultTitleProps) {
  return (
    <>
      <div 
        className='flex justify-between items-center w-full cursor-pointer hover:bg-gray-100 hover:drop-shadow-sm p-3 py-2 rounded-lg'
        onClick={() => {
          index === showDetails ? setShowDetails(-1) : setShowDetails(index)
        }}
      >
        <div className='flex items-center gap-6'>
          <Image 
            src={airlineLogo}
            alt='Airline Logo'
            width={25} height={25}
          />

          <p>Total {getDurationWithMinutes(totalDuration)}</p>
        </div>

        {/* testing, use button later */}
        <div className='text-customBlue-200 font-semibold'>
          ${' '}{price}
        </div>
      </div>
    </>
    
  )
}
