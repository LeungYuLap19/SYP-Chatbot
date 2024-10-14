import React from 'react'

export default function Message(
  // temp props
  { type }: { type: 'user' | 'bot' }
) {
  return (
    <div className={`w-full flex ${type === 'user' && 'justify-end'}`}>
      <div className={`w-[70%] flex ${type === 'user' && 'justify-end'}`}>
        <p className='text-sm text-pretty bg-customBlue-100 p-5 rounded-2xl text-customWhite-100'>
          Lorem ipsum odor amet, consectetuer adipiscing elit. Metus tincidunt volutpat finibus; nisi nulla vivamus molestie non. Hendrerit accumsan praesent suscipit vulputate sociosqu urna aptent rhoncus. Mi dis suscipit ullamcorper neque dui. Massa ex fames vel urna eget.
        </p>
      </div>
    </div>
  )
}
