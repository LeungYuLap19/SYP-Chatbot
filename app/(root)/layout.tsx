import Navigation from '@/components/root/nav/Navigation'
import React from 'react'

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <main className='flex h-screen w-screen'>
      <Navigation />
      <div className='h-full flex-grow'>
        {children}
      </div>
    </main>
  )
}
