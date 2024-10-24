import React from 'react'
import { Input } from '@/components/ui/input'

export default function NewChatroom() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center gap-2'>
        <p className='text-[28px] font-semibold text-customBlack-100'>I am your travel assistance</p>
        <Input className='text-sm' type="text" placeholder='Ask for attractions or check flights...' />
      </div>
    </div>
  )
}
