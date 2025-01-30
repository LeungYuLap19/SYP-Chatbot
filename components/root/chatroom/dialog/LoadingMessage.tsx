import React from 'react'

export default function LoadingMessage({ type }: { type: 'flightSearch' | 'flightStatus' | 'locationSearch' }) {
  return (
    <div className='w-full flex'>
      <div className='max-w-[70%] max-lg:max-w-full flex flex-col rounded-lg bg-white text-sm overflow-hidden'>
          <p className='text-sm text-pretty py-3 px-5 rounded-2xl'>Looking {`${
            type === 'flightSearch' ? 'flights for you...' :
            type === 'flightStatus' ? 'your flight status...' :
            'attractions for you...'
          }`}</p>
      </div>
    </div>
  )
}
