'use client'
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react'
import ExistedChatroom from './ExistedChatroom';
import NewChatroom from './NewChatroom';

function ChatroomPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return (
    <div className='
      h-full flex-grow bg-white flex flex-col gap-2 p-4 relative overflow-hidden
    '>
      {
        id ?
        <ExistedChatroom id={id} /> :
        <NewChatroom />
      }
    </div>
  )
}

const Chatroom = () => (
  <ChatroomPage />
)

export default Chatroom;