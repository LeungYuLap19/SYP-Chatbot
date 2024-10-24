import React from 'react'

export default function HistoryTag({ name }: { name: string }) {
  return (
    <p className='text-sm font-semibold pt-4 px-2 pb-0'>
      {name}
    </p>
  )
}
