import React, { useEffect, useState } from 'react';
import FlightBlock from './FlightBlock';
import PropertyBlock from './PropertyBlock';
import PlaceBlock from './PlaceBlock';
import { format } from 'date-fns';
import Image from 'next/image';
import CustomButton from '@/components/global/CustomButton';
import { deleteItemFromPlanner } from '@/lib/actions/firestore/planner.action';
import { showToast } from '@/lib/utils';
import ModifyWindow from '../windows/ModifyWindow';

export default function ItemBlock({ item, planner, showDate = true }: {
  item: FlightItem | AccommodationItem | PlaceItem;
  planner: PlannerDetails;
  showDate?: boolean;
}) {
  // if ('fsq_id' in item && !item.from_datetime && !item.to_datetime) return null;
  const unassigned: boolean = ('fsq_id' in item && !item.from_datetime && !item.to_datetime) ? true : false;
  const [loading, setLoading] = useState<boolean>(false);
  const [showWindow, setShowWindow] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState<Date | undefined>(
    item.from_datetime ? new Date(item.from_datetime) : undefined
  );
  const [toDate, setToDate] = useState<Date | undefined>(
    item.to_datetime ? new Date(item.to_datetime) : undefined
  );

  const handleDelete = async () => {
    setLoading(true);
    const result = await deleteItemFromPlanner(planner.pid!, item.piid);
    if (result.error) {
      showToast({ title: 'Error', description: result.error.message });
    } else {
      showToast({ title: 'Success', description: 'Item deleted from planner' });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (planner.from_datetime && planner.to_datetime) {
      setFromDate(new Date(planner.from_datetime));
      setToDate(new Date(planner.to_datetime));
    }
  }, [planner]);

  return (
    <div className={`flex flex-col gap-4 w-full group ${unassigned && '!w-fit'}`}>
      {
        !unassigned && (
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

      <div className={`flex gap-6 items-center relative ${!unassigned && 'pl-[10px]'} ${unassigned && 'flex-col gap-2'}`}>
        {
          !unassigned &&
          <span className='h-full w-[5px] bg-customBlue-200 opacity-70 rounded-full'></span>
        }

        <div className={`w-2/3 max-xl:w-full rounded-tr-none p-4 rounded-2xl bg-gray-50 ${unassigned && 'h-72 !w-72 !p-3 overflow-auto'}`}>
          {
            'flights' in item ? <FlightBlock flightItem={item} /> :
              'property_token' in item ? <PropertyBlock accommodationItem={item} /> :
                'fsq_id' in item ? <PlaceBlock placeItem={item} /> : null
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
    </div>
  );
}
