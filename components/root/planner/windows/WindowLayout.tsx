import React from 'react'
import CloseWindow from './CloseWindow'

export default function WindowLayout({ className, children, setShowWindow }: LayoutProps) {
  return (
    <div className='z-50 w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 flex justify-center items-center'>
      <div className={`p-8 pt-10 bg-white rounded-2xl flex justify-center relative ${className}`}>
        <CloseWindow setShowWindow={setShowWindow!} />
        {children}
      </div>
    </div>
  )
}
