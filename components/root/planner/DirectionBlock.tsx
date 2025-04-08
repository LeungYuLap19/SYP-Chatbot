import Image from 'next/image'
import React from 'react'

export default function DirectionBlock({ direction }: { direction: DirectionExtension }) {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex gap-2'>
        <Image 
          src={direction.icon} 
          alt={direction.travel_mode} 
          width={14} height={14}
          loading='lazy'
        />

        <p>{direction.travel_mode}</p>
      </div>
      
      <div className='flex items-center justify-between w-[120px]'>
        <p className='text-xs text-gray-400'>{direction.formatted_distance}</p>
        <p className='text-green-600 font-semibold'>{direction.formatted_duration}</p>
      </div>
    </div>
  )
}
