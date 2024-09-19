import React from 'react'

export default function Message(
  // temp props
  { type }: { type: 'user' | 'bot' }
) {
  return (
    <div className={`w-full flex ${type === 'user' && 'justify-end'}`}>
      <p>Message</p>
    </div>
  )
}
