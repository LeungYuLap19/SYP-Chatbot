'use client'
import { COOKIES_KEY_USERDATA, ERROR_TOAST_TITLE } from '@/constants'
import { removeFromCookies } from '@/lib/actions/cookies/cookies.action'
import { showToast } from '@/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function NavigationTab({ label, route, index }: NavigationTab) {
  const router = useRouter();
  const handleOnClick = async () => {
    if (index === 3) {
      const cookiesResult = await removeFromCookies({ key: COOKIES_KEY_USERDATA });
      if (cookiesResult.data) {
        router.push(route);
      }
      else if (cookiesResult.error) {
        showToast({ title: ERROR_TOAST_TITLE, description: cookiesResult.error.message });
      }
    }
  }

  return (
    <Link 
      className={`flex gap-2 items-center ${index == 1 && 'lg:hidden'}`}
      href={`${index !== 3 ? route : ''}`}
      onClick={handleOnClick}
    >
      <div className='bg-black h-7 w-7'>

      </div>
      <p className='max-sm:hidden'>{label}</p>
    </Link>
  )
}
