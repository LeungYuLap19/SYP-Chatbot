import React from 'react'
import HistoryChat from './HistoryChat'
import HistoryTag from './HistoryTag'

export default function History() {
  return (
    <div className='
      h-full flex flex-col gap-2 px-4 bg-customWhite-100 relative overflow-hidden
    '>
      <div className='w-full bg-customWhite-100 absolute top-0 left-0 p-4 drop-shadow-default'>
        History
      </div>
      <div className='flex flex-col gap-2 overflow-auto mt-[56px] py-2'>
        <HistoryChat key={-1} index={-1} />
        <HistoryTag name='Today' />
        {
          Array.from({ length: 3 }).map((_, index) => (
            <HistoryChat key={index} index={index} />
          ))
        }
        <HistoryTag name='Yesterday' />
        {
         Array.from({ length: 5 }).map((_, index) => (
            <HistoryChat key={index + 3} index={index + 3} />
          ))
        } 
        <HistoryTag name='Previous 7 days' />
        {
         Array.from({ length: 20 }).map((_, index) => (
            <HistoryChat key={index + 8} index={index + 8} />
          ))
        } 
      </div>
    </div>
  )
}
