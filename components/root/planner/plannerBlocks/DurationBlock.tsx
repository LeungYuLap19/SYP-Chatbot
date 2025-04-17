import { format } from 'date-fns'
import Image from 'next/image'
import React from 'react'

export default function DurationBlock({ selected }: { selected: PlannerDetails }) {
  return (
    <div className='flex gap-3 items-center max-lg:justify-center text-sm pl-11 max-lg:pl-0'>
      <Image
        src={'/dialog/calendar-clock.svg'}
        alt='calendar'
        width={16} height={16}
        loading='lazy'
      />
      <p className='font-semibold text-customBlack-100'>
        {selected.from_datetime ? format(new Date(selected.from_datetime), 'yyyy/MM/dd') : 'N/A'}
      </p>
      <p>to</p>
      <p className='font-semibold text-customBlack-100'>
        {selected.to_datetime ? format(new Date(selected.to_datetime), 'yyyy/MM/dd') : 'N/A'}
      </p>
    </div>
  )
}
