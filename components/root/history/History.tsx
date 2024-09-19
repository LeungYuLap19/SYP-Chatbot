import React from 'react'
import HistoryChat from './HistoryChat'

export default function History() {
  return (
    <div className='h-full border border-black flex flex-col gap-2 p-4 overflow-auto'>
      History
      <div className='flex flex-col gap-2'>
        {
          Array.from({ length: 80 }).map((_, index) => (
            <HistoryChat key={index} index={index} />
          ))
        }
      </div>
    </div>
  )
}
