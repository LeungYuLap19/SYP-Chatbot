import CurrencySelector from '@/components/global/CurrencySelector'
import Navigation from '@/components/root/nav/Navigation'
import React from 'react'

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <main className='
      flex h-screen w-screen bg-customBlack-100
      max-sm:flex-col-reverse
      overflow-auto relative
    '>
      <div className='flex-shrink-0'>
        <Navigation />
      </div>
      
      <div className='
        h-full flex-grow
        max-sm:h-page-custom max-sm:p-0
      '>
        {children}
      </div>

      <div className='sm:hidden'>
        <CurrencySelector />
      </div>
    </main>
  )
}
