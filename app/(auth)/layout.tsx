import Image from 'next/image'
import React from 'react'

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <main className='auth-root h-screen'>
      {children}
      <div className='h-full w-1/2 max-lg:hidden relative bg-customBlue-100'>
        <Image 
          src={'/auth/auth-bg.png'}
          alt='auth-page-bg'
          fill={true}
          style={{objectFit: 'cover', objectPosition: 'left'}}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
          loading='lazy'
        />
      </div>
    </main>
  )
}
