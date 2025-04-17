import Image from 'next/image'
import React, { useEffect } from 'react'
import ItemBlock from '../ItemBlocks/ItemBlock'

export default function WeatherItemBlock({ 
  weatherItems, selected, selectedIndex, setSelectedIndex 
}: { weatherItems: WeatherItem[]; selected: PlannerDetails; selectedIndex: number; setSelectedIndex: React.Dispatch<React.SetStateAction<number>> }) {

  return (
    <div className='flex flex-col gap-2 pl-11 max-lg:pl-0'>
      <div className='flex gap-2 items-center'>
        <div className='w-6 h-6 rounded-full bg-customBlue-200 flex justify-center items-center'>
          <Image
            src={'/planner/clouds-sun.svg'}
            alt='wait-icon'
            width={14} height={14}
            className='invert'
            loading='lazy'
          />
        </div>

        <p className='font-semibold text-sm text-customBlue-200'>Weathers</p>
      </div>
      <ItemBlock 
        planner={selected} 
        item={weatherItems[selectedIndex]} 
        showDate={false} 
        weatherItems={weatherItems} 
        setSelectedIndex={setSelectedIndex}
      />
    </div>
  )
}
