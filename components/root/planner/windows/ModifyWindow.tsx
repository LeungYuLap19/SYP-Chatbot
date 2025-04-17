import React, { useEffect, useState } from 'react'
import CloseWindow from './CloseWindow';
import { CustomDatetimePicker } from '@/components/global/CustomDatetimePicker';
import CustomButton from '@/components/global/CustomButton';
import { showToast } from '@/lib/utils';
import { updateItemDatetimeInPlanner } from '@/lib/actions/firestore/planner.action';
import { ERROR_TOAST_TITLE } from '@/constants';
import WindowLayout from './WindowLayout';

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

  return (
    <WindowLayout className='flex-col gap-4' setShowWindow={setShowWindow}>
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
        className='rounded-lg'
        onClick={() => updateItem()}
      />
    </WindowLayout>
  )
}
