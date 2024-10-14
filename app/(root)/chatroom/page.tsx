import Chatroom from '@/components/root/chatroom/Chatroom'
import History from '@/components/root/history/History'
import React from 'react'

export default function page() {
  return (
    <div className='h-full w-full flex gap-3'>
      <div className='max-lg:hidden w-[35%]'>
        <History />
      </div>
      <Chatroom />
    </div>
  )
}
