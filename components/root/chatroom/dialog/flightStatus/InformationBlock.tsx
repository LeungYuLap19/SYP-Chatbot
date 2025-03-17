import React from 'react'

export default function InformationBlock({ label, value, className }: { label: string; value?: string; className?: string }) {
  return (
    <div className='flex flex-col gap-3'>
      <p className='text-customBlue-200 font-semibold text-xs'>{label}</p>
      <p className={`font-bold text-xl ${className}`}>{`${(!value || value == 'undefined') ? '--' : value}`}</p>
    </div>
  )
}
