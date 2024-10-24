import Image from 'next/image'
import React from 'react'

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={`w-full flex gap-2 items-center px-1 ${className}`}>
      <div className='flex-shrink-0 relative'>
        <Image 
          src='/logo/icon.png'
          alt='logo'
          width={24} height={24}
          className={`flex-shrink-0 invert`}
        />
      </div>
      <p className={`text-customWhite-100 tracking-wider py-4 px-2 font-bold text-lg ${className}`}>
        JetSetGo
      </p>
    </div>
  )
}
