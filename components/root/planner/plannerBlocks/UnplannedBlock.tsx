import Image from 'next/image'
import React from 'react'
import ItemBlock from '../ItemBlocks/ItemBlock'

export default function UnplannedBlock({ unscheduledPlaceItems, selected }: { unscheduledPlaceItems: PlaceItem[]; selected: PlannerDetails }) {
  return (
    <div id="bottom-of-page" className='flex flex-col gap-2 pl-11 relative pb-[400px] max-lg:pl-0'>
      <div className='flex gap-2 items-center'>
        <div className='w-6 h-6 rounded-full bg-customBlue-200 flex justify-center items-center'>
          <Image
            src={'/planner/hourglass-end.svg'}
            alt='wait-icon'
            width={14} height={14}
            className='invert'
            loading='lazy'
          />
        </div>

        <p className='font-semibold text-sm text-customBlue-200'>Unplanned Items</p>
      </div>

      <div className="absolute top-10 left-11 max-lg:left-0 right-0 overflow-x-scroll">
        <div className="flex gap-2 w-max">
          {unscheduledPlaceItems.map((item, index) => (
            <ItemBlock key={index} planner={selected} item={item} showDate={false} />
          ))}
        </div>
      </div>
    </div>
  )
}
