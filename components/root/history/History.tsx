'use client'
import React from 'react'
import HistoryChat from './HistoryChat'
import HistoryTag from './HistoryTag'
import { useGetHistory } from '@/lib/hooks/useGetHistory'

export default function History() {
  const history = useGetHistory();
  const categories = history.categories;

  return (
    <div className='h-full flex flex-col gap-2 bg-gray-50 relative overflow-hidden'>
      <div className='w-full absolute top-0 left-0 p-4 font-medium'>
        History
      </div>
      <div className='flex flex-col gap-2 overflow-auto mt-[56px] py-2 pt-4 items-center'>
        <HistoryChat key={-1} />
        {
          categories &&
          ['today', 'yesterday', 'previous7days'].map((key) => {
            const category = key as keyof typeof categories;
            const categoryNameMap: Record<typeof category, string> = {
              today: 'Today',
              yesterday: 'Yesterday',
              previous7days: 'Previous 7 days',
            };
            
            return (
              categories[category].length > 0 && (
                <React.Fragment key={category}>
                  <HistoryTag name={categoryNameMap[category]} />
                  {categories[category].map(chatroom => (
                    <HistoryChat key={chatroom.cid} chatroom={chatroom} />
                  ))}
                </React.Fragment>
              )
            );
          })      
        }
      </div>
    </div>
  )
}
