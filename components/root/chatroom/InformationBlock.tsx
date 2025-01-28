import React from 'react'

export default function InformationBlock({ label, value }: { label: string; value?: string }) {
  return (
    <div className='flex flex-col gap-3'>
      <p className='text-customBlue-200 font-semibold text-xs'>{label}</p>
      <p className='font-bold text-xl'>{`${value ? value : '--'}`}</p>
    </div>
  )
}
