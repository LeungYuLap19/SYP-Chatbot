import React, { useEffect } from 'react';
import FlightBlock from './FlightBlock';
import PropertyBlock from './PropertyBlock';
import PlaceBlock from './PlaceBlock';
import { format } from 'date-fns';
import Image from 'next/image';
import CustomButton from '@/components/global/CustomButton';
import ModifyWindow from '../windows/ModifyWindow';
import WeatherBlock from './WeatherBlock';
import { useItemBlock } from '@/lib/hooks/useItemBlock';
import WeatherWindow from '../windows/WeatherWindow';

export default function ItemBlock({ 
  item, planner, showDate = true, 

  weatherItems, setSelectedIndex 
}: {
  item: FlightItem | AccommodationItem | PlaceItem | WeatherItem;
  planner: PlannerDetails;
  showDate?: boolean;

  weatherItems?: WeatherItem[];
  setSelectedIndex?: React.Dispatch<React.SetStateAction<number>>;
}) {
  const {
    unassigned,
    isWeather,
    loading,
    showWindow,
    setShowWindow,
    showWeatherWindow,
    setShowWeatherWindow,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    handleDelete,
  } = useItemBlock(item, planner, setSelectedIndex);

  return (
    <div className={`flex flex-col gap-4 w-full group ${unassigned && '!w-fit'}`}>
      {
        !unassigned && !isWeather && (
          showDate ? (
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
              <p className='text-xs font-semibold text-customBlue-200'>
                {
                  item.from_datetime &&
                  (
                    'flights' in item ? `Flight on ${format(new Date(item.from_datetime), "yyyy-MM-dd")}` :
                    'property_token' in item ? `Stays on ${format(new Date(item.from_datetime), "yyyy-MM-dd")}` :
                    null
                  )
                }
              </p>
            </div>
          ) : (
            <div className='flex gap-2 items-center'>
              <div className='w-6 h-6 rounded-full bg-customBlue-200 flex justify-center items-center'>
                <Image
                  src={'/planner/clock-three.svg'}
                  alt='clock'
                  width={14} height={14}
                  className='invert'
                  loading='lazy'
                />
              </div>
              <p className='text-sm font-semibold text-customBlue-200 opacity-80'>
                {item.from_datetime && format(new Date(item.from_datetime), "HH:mm")} to {item.to_datetime && format(new Date(item.to_datetime), "HH:mm")}
              </p>
            </div>
          )
        )
      }

      <div className={`flex gap-6 items-center relative ${!unassigned && !isWeather && 'pl-[10px]'} ${unassigned && 'flex-col gap-2'}`}>
        {
          !unassigned && !isWeather &&
          <span className='h-full w-[5px] bg-customBlue-200 opacity-70 rounded-full'></span>
        }

        <div className={`
          w-2/3 max-xl:w-full rounded-tr-none p-4 rounded-2xl bg-gray-50 
          ${isWeather && 'w-[calc(66.6667%+39px)]'}
          ${unassigned && 'h-72 !w-72 !p-3 flex justify-center overflow-y-auto overflow-x-hidden'}
        `}>
          {
            'flights' in item ? <FlightBlock flightItem={item} /> :
            'property_token' in item ? <PropertyBlock accommodationItem={item} /> :
            'fsq_id' in item ? <PlaceBlock placeItem={item} /> : 
            'location' in item ? <WeatherBlock weatherItem={item} /> :
            null
          }
        </div>

        <div className={`flex ${!unassigned && 'flex-col'} gap-4`}>
          <CustomButton
            type={'button'}
            loading={loading}
            label={''}
            iconUrl='/history/trash.svg'
            className='!h-9 !w-9 !rounded-full bg-gray-400 !p-0 !min-w-0 hover:bg-customBlack-100 border-none 
              transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100'
            imageClassName='invert'
            onClick={handleDelete}
            title='Delete Item from Planner'
          />
          {
            'fsq_id' in item &&
            <CustomButton
              type={'button'}
              loading={loading}
              label={''}
              iconUrl='/planner/edit.svg'
              className='!h-9 !w-9 !rounded-full bg-gray-400 !p-0 !min-w-0 transition-all duration-500 hover:bg-customBlack-100 border-none 
                ease-in-out opacity-0 group-hover:opacity-100'
              imageClassName='invert'
              onClick={() => setShowWindow(true)}
              title='Edit Datetimes'
            />
          }
          {
            'location' in item &&
            <CustomButton
              type={'button'}
              loading={loading}
              label={''}
              iconUrl='/planner/bars-sort.svg'
              className='!h-9 !w-9 !rounded-full bg-gray-400 !p-0 !min-w-0 transition-all duration-500 hover:bg-customBlack-100 border-none 
                ease-in-out opacity-0 group-hover:opacity-100'
              imageClassName='invert'
              onClick={() => setShowWeatherWindow(true)}
              title='All Added Weathers'
            />
          }
        </div>
      </div>
      {
        showWindow &&
        <ModifyWindow
          setShowWindow={setShowWindow}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          pid={planner.pid!}
          piid={item.piid}
        />
      }
      {
        showWeatherWindow && weatherItems && setSelectedIndex &&
        <WeatherWindow 
          setShowWindow={setShowWeatherWindow}
          weatherItems={weatherItems}
          setSelectedIndex={setSelectedIndex}
        />
      }
    </div>
  );
}
