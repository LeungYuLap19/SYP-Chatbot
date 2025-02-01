import React from 'react'

export default function Subtitle({ text }: { text: string }) {
  return (
    <p className='px-2 font-semibold text-xs text-customBlue-200'>
      {text}
    </p>
  )
}
