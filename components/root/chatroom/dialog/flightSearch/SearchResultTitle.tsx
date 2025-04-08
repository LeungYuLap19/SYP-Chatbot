import { COOKIES_KEY_CURRENCY, ERROR_TOAST_TITLE } from '@/constants';
import { getFromCookies } from '@/lib/actions/cookies/cookies.action';
import { getDurationWithMinutes, showToast } from '@/lib/utils'
import Image from 'next/image'
import React, { useEffect } from 'react'

export default function SearchResultTitle({
  index, totalDuration, airline, airlineLogo, price, showDetails, setShowDetails
}: SearchResultTitleProps) {
  const [currency, setCurrency] = React.useState('');

  const getCurrencyFromCookies = async () => {
    const cookiesResult = await getFromCookies<string>({ key: COOKIES_KEY_CURRENCY });
    if (cookiesResult.data) {
      setCurrency(cookiesResult.data);
    } else if (cookiesResult.error) {
      showToast({ 
        title: ERROR_TOAST_TITLE, 
        description: cookiesResult.error.message 
      });
    }
  }

  useEffect(() => {
    getCurrencyFromCookies();
  }, []);

  return (
    <>
      <div 
        className={`flex justify-between items-center w-full
        cursor-pointer duration-500 hover:bg-white hover:drop-shadow-default p-3 py-2 rounded-lg
        ${index === showDetails && 'bg-white drop-shadow-default'}`}
        onClick={() => {
          index === showDetails ? setShowDetails(-1) : setShowDetails(index)
        }}
      >
        <div className='flex items-center justify-between w-52'>
          <div className='flex items-center gap-4'>
            <Image 
              src={airlineLogo}
              alt='Airline Logo'
              width={25} height={25}
              loading='lazy'
            />
            <p className='text-sm'>{airline || 'Multi-Airlines'}</p>
          </div>
          <p className='text-sm'>{getDurationWithMinutes(totalDuration)}</p>
        </div>
        
        <p className='text-sm text-customBlue-200 font-semibold'>{Math.floor(price).toLocaleString()}{' '}{currency}</p>
      </div>
    </>
    
  )
}
