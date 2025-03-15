import CustomButton from '@/components/global/CustomButton'
import { Input } from '@/components/ui/input'
import { usePlanner } from '@/lib/hooks/usePlanner';
import { handleKeyDown } from '@/lib/utils';
import Link from 'next/link'
import React from 'react'

export default function NewPlanner() {
  const { loading, inputRef, handleEnter } = usePlanner();

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='flex flex-col gap-4 justify-center items-center w-[600px] max-lg:w-full max-lg:px-10 max-sm:w-full max-sm:px-0'>
        <p className='text-[28px] font-semibold text-customBlack-100'>Build Your Travel Plan</p>
        <div className='flex gap-2 w-full'>
          <Input 
            placeholder="Name your planner" 
            type='text'
            disabled={loading} 
            ref={inputRef}
            onKeyDown={(event) => handleKeyDown({event, func: handleEnter})}
            className="bg-customWhite-100 border border-customBlack-100"
          />
          <CustomButton 
            type='button'
            label='Create'
            onClick={() => handleEnter()} 
            loading={loading} 
          />
        </div>
        <Link
          className='font-semibold underline text-sm text-customBlack-200'
          href={'/chatroom'}
          onClick={() => handleEnter(true)}
        >
          Create planner and add items to your planner from chatroom
        </Link>
      </div>
    </div>
  )
}
