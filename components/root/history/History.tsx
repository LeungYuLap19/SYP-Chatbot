import React from 'react'
import HistoryChat from './HistoryChat'

export default function History() {
  return (
    <div className='
      h-full flex flex-col gap-2 px-4 bg-customWhite-100 rounded-lg relative overflow-hidden
      max-sm:rounded-none
    '>
      <div className='w-full bg-customWhite-100 absolute top-0 left-0 p-4 drop-shadow-default'>
        History
      </div>
      <div className='flex flex-col gap-2 overflow-auto mt-[40px] pb-2'>
        {
          Array.from({ length: 80 }).map((_, index) => (
            <HistoryChat key={index} index={index} />
          ))
        }
      </div>
    </div>
  )
}
