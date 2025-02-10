import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

export default function DepArr({ 
  localTime, 
  fromIATA, fromCity, fromAirport, 
  toIATA, toCity, toAirport, 
  className
}: DepArrProps) {
  return (
    <div className={`p-6 pt-0 flex flex-col gap-2 ${className}`}>
        <p className='text-customBlue-200 font-semibold text-xs'>On {formatDate(localTime)}</p>

        <div className='flex items-center justify-between gap-5'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2 text-xl'>
              <span className='font-bold max-sm:hidden'>{fromIATA}</span>
              <p className='max-sm:font-bold'>{fromCity}</p>
            </div>
            <p className='text-xs text-customBlack-200'>{fromAirport} Airport</p>
          </div>

          <div className='relative'>
            <Image
              src={'/dialog/right-arrow-svgrepo-com.svg'}
              alt='right arrow'
              width={24} height={24}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2 text-xl'>
              <span className='font-bold max-sm:hidden'>{toIATA}</span>
              <p className='max-sm:font-bold'>{toCity}</p>
            </div>
            <p className='text-xs text-customBlack-200'>{toAirport} Airport</p>
          </div>
        </div>
      </div>
  )
}
