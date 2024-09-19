'use client'
import { useSearchParams } from 'next/navigation';
import React from 'react'

export default function Chatroom() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return (
    <div className='h-full flex-grow border border-black'>
      {id ? `Chatroom for ${id}` : 'No chat selected'}
    </div>
  )
}
