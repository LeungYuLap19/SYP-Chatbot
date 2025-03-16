import React, { useEffect, useState } from 'react'
import CloseWindow from './CloseWindow';
import { CustomDatetimePicker } from '@/components/global/CustomDatetimePicker';
import CustomButton from '@/components/global/CustomButton';
import { showToast } from '@/lib/utils';
import { updateItemDatetimeInPlanner } from '@/lib/actions/firestore/planner.action';
import { ERROR_TOAST_TITLE } from '@/constants';

export default function ModifyWindow(
  { setShowWindow, fromDate, setFromDate, toDate, setToDate, pid, piid }:
  {
    setShowWindow: React.Dispatch<React.SetStateAction<boolean>>; 
    fromDate?: Date;
    setFromDate?: React.Dispatch<React.SetStateAction<Date | undefined>>;
    toDate?: Date;
    setToDate?: React.Dispatch<React.SetStateAction<Date | undefined>>;
    pid: string;
    piid: string;
  }
) {
  const [loading, setLoading] = useState<boolean>(false);

  const updateItem = async () => {
    setLoading(true);
    const firestoreResult = await updateItemDatetimeInPlanner(
      pid, 
      piid, 
      fromDate ? fromDate.toISOString() : null, 
      toDate ? toDate.toISOString() : null
    );
    if (firestoreResult.error) {
      showToast({ title: ERROR_TOAST_TITLE, description: firestoreResult.error.message });
      setLoading(false);
      return;
    }
    showToast({ title: 'Success', description: 'Item modified' });
    setLoading(false);
    setShowWindow(false);
  }

  useEffect(() => {
      if (fromDate) {
        if (!toDate || toDate < fromDate) {
          if (toDate && toDate < fromDate) {
            showToast({ title: 'Change Your Date Time', description: 'End time cannot be earlier than start time.' })
          }
          const newToDate = new Date(fromDate);
          newToDate.setHours(newToDate.getHours() + 1); 
          setToDate!(newToDate);
        }
      }
    }, [fromDate, toDate]);

  return (
    <div className='z-50 w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 flex justify-center items-center'>
      <div className='p-8 pt-10 bg-white rounded-lg flex flex-col gap-4 justify-center relative'>
        <CloseWindow setShowWindow={setShowWindow} />

        <p className='font-semibold'>Modify Start and End</p>

        <div className='flex gap-4 items-center'>
          <CustomDatetimePicker date={fromDate} setDate={setFromDate!} />
          <p>to</p>
          <CustomDatetimePicker date={toDate} setDate={setToDate!} />
        </div>

        <CustomButton
          loading={loading}
          type='button'
          label='Save'
          className='bg-transparent'
          onClick={() => updateItem()}
        />
      </div>
    </div>
  )
}
