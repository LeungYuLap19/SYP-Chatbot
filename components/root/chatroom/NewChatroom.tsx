import React from 'react'
import { Input } from '@/components/ui/input'
import { handleKeyDown } from '@/lib/utils'
import { useChatroom } from '@/lib/hooks/useChatroom'
import CustomButton from '@/components/global/CustomButton';

export default function NewChatroom() {
  const { loading, inputRef, handleEnter } = useChatroom();

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center gap-2'>
        <p className='text-[28px] font-semibold text-customBlack-100'>I am your travel assistance</p>
        <div className='flex gap-2 w-full'>
          <Input 
            className='bg-customWhite-100 border border-customBlack-100' 
            type="text"
            disabled={loading} 
            ref={inputRef}
            onKeyDown={(event) => handleKeyDown({event, func: handleEnter})}
            placeholder='Ask for attractions or check flights...' 
          />
          <CustomButton 
            loading={loading} 
            type={'button'} 
            label={'Send'} 
            onClick={handleEnter} 
          />
        </div>
      </div>
    </div>
  )
}
