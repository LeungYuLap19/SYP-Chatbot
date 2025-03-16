import React from 'react';
import CustomButton from '@/components/global/CustomButton';
import { useGetPlanner } from '@/lib/hooks/useGetPlanner';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import Image from 'next/image';
import ItemBlock from './ItemBlocks/ItemBlock';

export default function ExistedPlanner({ id }: { id: string }) {
  const router = useRouter();
  const handleOnClick = () => {
    router.push('/planner');
  };
  const { selected } = useGetPlanner(id);

  if (!selected) return;

  // Group items
  const groupedPlaceItems: Record<string, PlaceItem[]> = {};
  const otherItems: (FlightItem | AccommodationItem)[] = [];
  const unscheduledPlaceItems: PlaceItem[] = []; // Ensure only PlaceItems are grouped here

  selected.items.forEach((item) => {
    // Group items with valid from_datetime for PlaceItems
    if ('fsq_id' in item && item.from_datetime && item.to_datetime) {
      const dateKey = format(new Date(item.from_datetime), 'yyyy-MM-dd');
      if (!groupedPlaceItems[dateKey]) {
        groupedPlaceItems[dateKey] = [];
      }
      groupedPlaceItems[dateKey].push(item);
    } 
    // Include Flight and Accommodation items in otherItems
    else if ('property_token' in item || 'flights' in item) {
      otherItems.push(item);
    } 
    // Group PlaceItems without from_datetime and to_datetime in unscheduledPlaceItems
    else if ('fsq_id' in item) {
      unscheduledPlaceItems.push(item);
    }
  });

  return (
    <div className='w-full flex flex-col gap-8'>
      <div className='flex justify-between items-center p-11 pb-0 lg:pr-28'>
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

      <div className='flex gap-3 items-center max-lg:justify-center text-sm pl-11'>
        <Image 
          src={'/dialog/calendar-clock.svg'}
          alt='calendar'
          width={16} height={16}
        />
        <p className='font-semibold text-customBlack-100'>
          {selected.from_datetime ? format(new Date(selected.from_datetime), 'yyyy/MM/dd') : 'N/A'}
        </p>
        <p>to</p>
        <p className='font-semibold text-customBlack-100'>
          {selected.to_datetime ? format(new Date(selected.to_datetime), 'yyyy/MM/dd') : 'N/A'}
        </p>
      </div>

      {
        unscheduledPlaceItems.length > 0 &&
        <div className='flex flex-col gap-2 pl-11 relative pb-[360px]'>
          <div className='flex gap-2 items-center'>
            <div className='w-6 h-6 rounded-full bg-customBlue-200 flex justify-center items-center'>
              <Image 
                src={'/planner/hourglass-end.svg'}
                alt='wait-icon'
                width={14} height={14}
                className='invert'
              />
            </div>
            
            <p className='font-semibold text-sm text-customBlue-200'>Unplanned Items</p>
          </div>

          <div className="absolute top-10 left-11 right-0 overflow-x-auto">
            <div className="flex gap-2 w-max">
              {unscheduledPlaceItems.map((item, index) => (
                <ItemBlock key={index} plannerId={id} item={item} showDate={false} />
              ))}
            </div>
          </div>
        </div>
      }

      <div className='flex flex-col gap-4 pl-11 pb-11'>
        {otherItems.map((item, index) => (
          <ItemBlock key={index} plannerId={id} item={item} />
        ))}

        {/* Grouped Place Items */}
        {Object.entries(groupedPlaceItems).map(([date, items]) => (
          <div key={date} className="flex flex-col gap-4">
            <div className='flex gap-2 items-center'>
              <div className='w-6 h-6 rounded-full bg-customBlue-200 flex justify-center items-center'>
                <Image 
                  src={'/dialog/calendar-clock.svg'}
                  alt='calendar'
                  width={14} height={14}
                  className='invert'
                />
              </div>
              <p className='text-sm font-semibold text-customBlue-200'>
                Planned on {date}
              </p>
            </div>

            {items.map((item, index) => (
              <ItemBlock key={index} plannerId={id} item={item} showDate={false} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
