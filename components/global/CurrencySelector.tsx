'use client'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { COOKIES_KEY_CURRENCY, currencyList, ERROR_TOAST_TITLE } from '@/constants';
import { getFromCookies, storeToCookies } from '@/lib/actions/cookies/cookies.action';
import { showToast } from '@/lib/utils';

export default function CurrencySelector() {
  const [currency, setCurrency] = useState<string>('');

  const handleCurrencyChange = async (value: string) => {
    const cookiesResult = await storeToCookies<string>({ 
      key: COOKIES_KEY_CURRENCY, 
      data: value, 
      daysToExpire: 9999 
    });

    if (cookiesResult.data) {
      // Reload the page to reflect currency changes
      window.location.reload(); // ← This refreshes the page while keeping the URL
    }
    else if (cookiesResult.error) {
      showToast({ 
        title: ERROR_TOAST_TITLE, 
        description: cookiesResult.error.message 
      });
    }
  }

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
    <div className='max-sm:absolute max-sm:top-2 max-sm:right-2'>
      <Select
        onValueChange={handleCurrencyChange}
        value={currency}
      >
        <SelectTrigger className="bg-transparent sm:text-white sm:border-customBlack-200">
          <SelectValue placeholder="Select a Currency" />
        </SelectTrigger>
        <SelectContent className='bg-transparent sm:text-white sm:border-customBlack-200 w-[100px]'>
          {currencyList.map((currency, index) => (
            <SelectItem 
              key={index} 
              value={currency.name}
              className='cursor-pointer'
            >
              {currency.name} ({currency.symbol})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}