import { navLinks } from '@/constants'
import React from 'react'
import NavigationTab from './NavigationTab'

export default function Navigation() {
  return (
    <div className='flex flex-col gap-2 p-4 h-full border border-black'>
      <p>APP <span className='max-sm:hidden'>NAME</span></p>

      <div className='flex flex-col gap-2'>
        {
          navLinks.map((item, index) => (
            <NavigationTab 
              key={item.label} 
              label={item.label} 
              route={item.route} 
              index={index} 
            />
          ))
        }
      </div>
    </div>
  )
}
