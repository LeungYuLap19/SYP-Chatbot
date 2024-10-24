'use client'
import { COOKIES_KEY_USERDATA, ERROR_TOAST_TITLE } from '@/constants'
import { removeFromCookies } from '@/lib/actions/cookies/cookies.action'
import { showToast } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function NavigationTab({ label, route, index, imgUrl }: NavigationTabProps) {
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
      className={`
        flex gap-4 items-center text-sm p-1 rounded-lg 
        ${index == 1 && 'lg:hidden'}
      `}
      href={`${index !== 3 ? route : ''}`}
      onClick={handleOnClick}
    >
      <div className='relative'>
        <Image 
          src={imgUrl}
          alt={label + ' icon'}
          width={16} height={16}
        />
      </div>
      <p className='max-sm:hidden text-customBlue-100 text-base font-semibold'>{label}</p>
    </Link>
  )
}
