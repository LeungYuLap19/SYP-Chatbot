import { navLinks } from '@/constants'
import React from 'react'
import NavigationTab from './NavigationTab'

export default function Navigation() {
  return (
    <div className='flex flex-col gap-2 p-4 h-full'>
      <p className='max-sm:hidden text-customWhite-100'>
        APP NAME
      </p>

      <div className='
        flex flex-col gap-4 
        max-sm:flex-row max-sm:justify-around
      '>
        {
          navLinks.map((item, index) => (
            <NavigationTab 
              key={item.label} 
              label={item.label} 
              route={item.route} 
              index={index} 
              imgUrl={item.imgUrl}
            />
          ))
        }
      </div>
    </div>
  )
}
