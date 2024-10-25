'use client'
import React from 'react'
import HistoryChat from './HistoryChat'
import HistoryTag from './HistoryTag'
import chatroomsJson from '../../../jsonTest/chatrooms.json'
import { categorizeChatrooms } from '@/lib/utils';

export default function History() {
  // data from testing json
  const chatrooms = chatroomsJson.chatrooms;
  const categories = categorizeChatrooms(chatrooms);

  return (
    <div className='
      h-full flex flex-col gap-2 px-4 bg-customWhite-100 relative overflow-hidden
    '>
      <div className='w-full bg-customWhite-100 absolute top-0 left-0 p-4 drop-shadow-default'>
        History
      </div>
      <div className='flex flex-col gap-2 overflow-auto mt-[56px] py-2 pt-4'>
        <HistoryChat key={-1} />

        {
          categories.today.length > 0 &&
          <> 
            <HistoryTag name='Today' />
              {
                categories.today.map(chatroom => (
                  <HistoryChat key={chatroom.cid} chatroom={chatroom} />
                ))
              }
          </>
        }

        {
          categories.yesterday.length > 0 &&
          <>
            <HistoryTag name='Yesterday' />
              {
                categories.yesterday.map(chatroom => (
                  <HistoryChat key={chatroom.cid} chatroom={chatroom} />
                ))
              } 
          </>
        }

        {
          categories.previous7days.length > 0 &&
           <>
            <HistoryTag name='Previous 7 days' />
              {
                categories.previous7days.map(chatroom => (
                  <HistoryChat key={chatroom.cid} chatroom={chatroom} />
                ))
              } 
           </>
        }
      </div>
    </div>
  )
}
