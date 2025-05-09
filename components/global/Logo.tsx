import Image from 'next/image'
import React from 'react'

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={`w-full flex gap-2 items-center px-1 select-none ${className}`}>
      <div className='flex-shrink-0 relative'>
        <Image 
          src='/logo/JetSetGo-Icon.png'
          alt='logo'
          width={156} height={24}
          className={`flex-shrink-0`}
          loading='lazy'
        />
      </div>
    </div>
  )
}
