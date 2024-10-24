import { navLinks } from '@/constants'
import React from 'react'
import NavigationTab from './NavigationTab'
import Logo from '@/components/global/Logo'

export default function Navigation() {
  return (
    <div className='flex flex-col gap-2 p-4 h-full sm:w-[200px]'>
      <Logo className='max-sm:hidden' />

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
