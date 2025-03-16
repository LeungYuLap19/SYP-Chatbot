import Image from 'next/image'
import React from 'react'

export default function CloseWindow({ setShowWindow }: { setShowWindow: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <div 
      className='w-5 h-5 flex justify-center items-center absolute top-4 right-4 cursor-pointer'
      onClick={() => setShowWindow(false)}
    >
      <Image
        src={'/planner/cross.svg'}
        alt='close'
        width={12} height={12}
      />
    </div>
  )
}
