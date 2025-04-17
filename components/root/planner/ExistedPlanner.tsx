import React, { useEffect, useState } from 'react';
import CustomButton from '@/components/global/CustomButton';
import { useGetPlanner } from '@/lib/hooks/useGetPlanner';
import { useRouter } from 'next/navigation';
import UnplannedBlock from './plannerBlocks/UnplannedBlock';
import DurationBlock from './plannerBlocks/DurationBlock';
import PlannedBlock from './plannerBlocks/PlannedBlock';
import WeatherItemBlock from './plannerBlocks/WeatherItemBlock';

export default function ExistedPlanner({ id }: { id: string }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const handleOnClick = () => {
    router.push('/planner');
  };
  
  const { selected } = useGetPlanner(id);
  if (!selected) return;

  const weatherItems: WeatherItem[] = [];
  const unscheduledPlaceItems: PlaceItem[] = [];
  const scheduledItems: (FlightItem | AccommodationItem | PlaceItem | WeatherItem)[] = [];

  // Iterate through selected items
  selected.items.forEach((item) => {
    // If item has valid from_datetime, add to scheduledItems
    if (item.from_datetime && item.to_datetime) {
      scheduledItems.push(item);
    }
    // If item is a PlaceItem without from_datetime and to_datetime, push it to unscheduledPlaceItems
    else if ('fsq_id' in item) {
      unscheduledPlaceItems.push(item);
    }
    // If item is a WeatherItem, push it to weatherItems
    else if ('location' in item) {
      weatherItems.push(item);
    }
  });

  let currentDate: string = '';

  return (
    <div className='w-full flex flex-col gap-8'>
      <div className='flex justify-between items-center p-11 pb-0 lg:pr-28 max-lg:p-4'>
        <CustomButton
          label=''
          type='button'
          className='lg:hidden h-fit p-1 min-w-0 w-fit border-none hover:bg-transparent'
          onClick={handleOnClick}
          iconUrl='/planner/angle-left.svg'
        />
        <p className='text-xl font-semibold lg:text-[28px] max-lg:hidden'>
          My Planner
          <span className='text-[50px] text-customBlue-200'>.</span>
        </p>
        <p className='text-xl font-semibold lg:text-[28px]'>{selected.name}</p>
        <span className='w-[14px] h-[14px] p-1 lg:hidden'></span>
      </div>

      <DurationBlock selected={selected} />

      <div className='w-full flex flex-col gap-12'>
        {
          weatherItems.length > 0 &&
          <WeatherItemBlock
            weatherItems={weatherItems}
            selected={selected}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        }

        <PlannedBlock 
          scheduledItems={scheduledItems}
          currentDate={currentDate}
          selected={selected}
        />

        {
          unscheduledPlaceItems.length > 0 &&
          <UnplannedBlock
            unscheduledPlaceItems={unscheduledPlaceItems}
            selected={selected}
          />
        }
      </div>

      {
        unscheduledPlaceItems.length > 0 &&
        <CustomButton 
          type={'button'} 
          label={'Go to Unplanned Items'}
          className='fixed bottom-8 max-sm:bottom-16 right-5 max-sm:right-2'
          onClick={() => {
            document.getElementById('bottom-of-page')?.scrollIntoView({ behavior: 'smooth' });
          }}  
        />
      }
    </div>
  );
}
