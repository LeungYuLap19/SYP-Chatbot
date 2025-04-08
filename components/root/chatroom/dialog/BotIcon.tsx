import Image from 'next/image'
import React from 'react'

export default function BotIcon() {
  return (
    <div className='bg-gray-900 rounded-2xl p-2 flex items-center justify-center h-fit mr-2'>
      <Image 
        src={'/dialog/bot.svg'}
        alt='bot'
        width={20} height={20}
        className='invert'
      />
    </div>
  )
}
