import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetPlanner } from '@/lib/hooks/useGetPlanner';
import { useSaveToPlanner } from '@/lib/hooks/useSaveToPlanner';
import CustomButton from '@/components/global/CustomButton';
import { CustomDatetimePicker } from '@/components/global/CustomDatetimePicker';
import { showToast } from '@/lib/utils';
import CloseWindow from './CloseWindow';
import WindowLayout from './WindowLayout';

export default function SaveWindow(
  { setShowWindow, selectedItem, isPlace = false, fromDate, setFromDate, toDate, setToDate }:
    {
      setShowWindow: React.Dispatch<React.SetStateAction<boolean>>;
      selectedItem: FlightItem | AccommodationItem | PlaceItem | WeatherItem;
      isPlace?: boolean;
      fromDate?: Date;
      setFromDate?: React.Dispatch<React.SetStateAction<Date | undefined>>
      toDate?: Date;
      setToDate?: React.Dispatch<React.SetStateAction<Date | undefined>>
    }
) {
  const router = useRouter();
  const { planners } = useGetPlanner();
  const { loading, saveToPlanner, selectedID, setSelectedID } = useSaveToPlanner();
  const [defaultMonth, setDefaultMonth] = useState<Date | undefined>();

  useEffect(() => {
    if (fromDate) {
      setToDate!(prevToDate => {
        const newToDate = new Date(fromDate);
        newToDate.setHours(newToDate.getHours() + 1);
        return newToDate;
      });
    }
  }, [fromDate]);

  useEffect(() => {
    if (fromDate && toDate && toDate < fromDate) {
      showToast({
        title: 'Change Your Date Time',
        description: 'End time cannot be earlier than start time.'
      });

      const newToDate = new Date(fromDate);
      newToDate.setHours(newToDate.getHours() + 1);
      setToDate!(newToDate);
    }
  }, [toDate]);

  useEffect(() => {
    const selectedPlanner = planners?.find(planner => planner.pid === selectedID);

    if (selectedPlanner?.from_datetime && selectedPlanner?.to_datetime) {
      setDefaultMonth?.(new Date(selectedPlanner.from_datetime));
    }
  }, [selectedID, planners]);

  return (
    <WindowLayout className='flex-col gap-4' setShowWindow={setShowWindow}>
      <p className='font-semibold'>Save To Planner</p>

      <Select
        onValueChange={(value) => {
          setSelectedID(value);
        }}
      >
        <SelectTrigger className="w-full min-w-[400px]" disabled={planners && planners.length === 0}>
          <SelectValue placeholder={`${planners && planners.length > 0 ? 'Select Planner' : 'No Planner'}`} />
        </SelectTrigger>
        <SelectContent className='bg-white'>
          {
            planners?.map((planner, index) => (
              <SelectItem
                key={index}
                value={planner.pid!}
                className='cursor-pointer'
              >
                {planner.name}
              </SelectItem>
            ))
          }
        </SelectContent>
      </Select>

      {
        isPlace &&
        <div className='flex gap-4 items-center'>
          <CustomDatetimePicker date={fromDate} setDate={setFromDate!} defaultMonth={defaultMonth} />
          <p>to</p>
          <CustomDatetimePicker date={toDate} setDate={setToDate!} defaultMonth={defaultMonth} />
        </div>
      }

      <CustomButton
        loading={loading}
        type='button'
        label={`${planners && planners.length === 0 ? 'Create Planner' : 'Save'}`}
        className='rounded-lg'
        onClick={
          async () => {
            if (planners && planners.length === 0) {
              router.push('/planner');
              return;
            }

            await saveToPlanner(selectedItem);
            setShowWindow(false);
          }
        }
      />
    </WindowLayout>
  )
}
