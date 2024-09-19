'use client'
import { useSearchParams } from 'next/navigation';
import React from 'react'
import Message from './Message';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Chatroom() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return (
    <div className='h-full flex-grow border border-black flex flex-col gap-2 p-4'>
      <div>
        {id ? `Chatroom for ${id}` : 'No chat selected'}
      </div>
      <div className='flex flex-col-reverse gap-2 w-full h-full overflow-auto'>
        {
          Array.from({ length: 80 }).map((_, index) => {
            if (index % 2 === 0) {
              return <Message key={index} type='user' />
            }
            else {
              return <Message key={index} type='bot' />
            }
          })
        }
      </div>
      <div className='flex gap-2'>
        <Input type="text" placeholder="Enter your text..." />
        <Button>Send</Button>
      </div>
    </div>
  )
}
