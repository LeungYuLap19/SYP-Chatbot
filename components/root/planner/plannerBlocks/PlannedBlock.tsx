import Image from 'next/image';
import React from 'react'
import ItemBlock from '../ItemBlocks/ItemBlock';

export default function PlannedBlock({ 
  scheduledItems,
  currentDate, 
  selected
}: {
  scheduledItems: (FlightItem | AccommodationItem | PlaceItem | WeatherItem)[];
  currentDate: string;
  selected: PlannerDetails;
}) {
  return (
    <div className='flex flex-col gap-4 pl-11 max-lg:pl-0'>
      {
        scheduledItems.map((item, index) => {
          if ('fsq_id' in item && item.from_datetime?.substring(0, 10) !== currentDate.substring(0, 10)) {
            currentDate = item.from_datetime || '';
            return (
              <>
                <div className='flex gap-2 items-center'>
                  <div className='w-6 h-6 rounded-full bg-customBlue-200 flex justify-center items-center'>
                    <Image
                      src={'/dialog/calendar-clock.svg'}
                      alt='calendar'
                      width={14} height={14}
                      className='invert'
                      loading='lazy'
                    />
                  </div>
                  <p className='text-sm font-semibold text-customBlue-200'>
                    Planned on {currentDate.substring(0, 10)}
                  </p>
                </div>

                <ItemBlock key={index} planner={selected} item={item} showDate={false} />
              </>
            )
          }
          if ('fsq_id' in item && item.from_datetime?.substring(0, 10) === currentDate.substring(0, 10)) {
            currentDate = item.from_datetime || '';
            return <ItemBlock key={index} planner={selected} item={item} showDate={false} />;
          }
          else {
            return <ItemBlock key={index} planner={selected} item={item} />;
          }
        })
      }
    </div>
  )
}
