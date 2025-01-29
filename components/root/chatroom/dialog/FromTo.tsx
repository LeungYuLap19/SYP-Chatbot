import { formatTime, getDuration } from '@/lib/utils'
import React from 'react'

export default function FromTo({
  fromIATA, fromAirport, fromLocalTime, fromCountryCode,
  toIATA, toAirport, toLocalTime, toCountryCode,
  fromUTCTime, toUTCTime
}: FromToProps) {
  return (
    <div className='flex flex-row gap-4'>
      <div className='flex flex-col items-center py-2'>
        <span className='w-[8px] h-[8px] rounded-sm bg-slate-300'></span>
        <span className='w-[2px] h-12 bg-slate-200'></span>
        <span className='w-[8px] h-[8px] rounded-sm bg-slate-300'></span>
      </div>

      <div className='flex flex-col justify-between'>
        <div>
          <span className='font-semibold'>{fromIATA}</span> {' '}
          {
            fromAirport &&
            <span className='max-md:hidden'>{fromAirport} {' '}</span>
          }
          Departure at {' '}
          <span className='font-semibold'>{formatTime(fromLocalTime)}</span> {' '}
          {
            fromCountryCode &&
            <span>{`(${fromCountryCode} Time)`}</span>
          }
        </div>

        <div className='text-customBlack-200 text-xs'>
          {getDuration(fromUTCTime, toUTCTime)}
        </div>

        <div>
          <span className='font-semibold'>{toIATA}</span> {' '}
          {
            toAirport &&
            <span className='max-md:hidden'>{toAirport} {' '}</span>
          }
          Arrival at {' '}
          <span className='font-semibold'>{formatTime(toLocalTime)}</span> {' '}
          {
            toCountryCode &&
            <span>{`(${toCountryCode} Time)`}</span>
          }
        </div>
      </div>
    </div>
  )
}
