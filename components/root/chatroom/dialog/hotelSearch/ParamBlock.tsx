import { hotelSearchParams } from '@/constants'
import Image from 'next/image'
import React from 'react'

export default function ParamBlock({ label, type }: { label: string | number, type: 'people' | 'duration' | 'location' }) {
  return (
    <div className='flex gap-1 items-center'>
      <Image 
        src={hotelSearchParams[type]}
        alt={type}
        width={12} height={12}
      />

      <p className='text-xs'>{label}</p>
    </div>
  )
}
