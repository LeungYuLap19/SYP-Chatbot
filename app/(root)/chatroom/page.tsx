import Chatroom from '@/components/root/chatroom/Chatroom'
import History from '@/components/root/history/History'
import React, { Suspense } from 'react'

export default function page() {
  return (
    <div className='h-full w-full flex'>
      <div className='max-lg:hidden w-[200px] border-r-[0.5px] border-slate-200 flex-shrink-0'>
        <Suspense fallback={<div>Loading history...</div>}>
          <History />
        </Suspense>
      </div>
      <Suspense fallback={<div>Loading chatroom...</div>}>
        <Chatroom />
      </Suspense>
    </div>
  )
}
