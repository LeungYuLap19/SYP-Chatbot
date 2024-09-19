import Link from 'next/link'
import React from 'react'

export default function NavigationTab({ label, route, index }: NavigationTab) {
  return (
    <Link 
      className={`flex gap-2 items-center ${index == 1 && 'lg:hidden'}`}
      href={route}
    >
      <div className='bg-black h-7 w-7'>

      </div>
      <p className='max-sm:hidden'>{label}</p>
    </Link>
  )
}
