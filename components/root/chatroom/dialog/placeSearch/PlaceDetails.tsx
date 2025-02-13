'use client'
import React, { useEffect, useState } from 'react'
import Subtitle from './Subtitle'
import Image from 'next/image'
import { socialMedia, weekDays } from '@/constants'
import { showToast } from '@/lib/utils';

export default function PlaceDetails({ resultItem }: {resultItem: ResultItem}) {
  const [hoursDisplay, setHoursDisplay] = useState<boolean>(false);
  const googleMapsUrl = `https://www.google.com/maps?q=${resultItem.geocodes.main.latitude},${resultItem.geocodes.main.longitude}`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast({
      title: "Copied to Clipboard",
      description: text,
    });
  };

  useEffect(() => {
    console.log(resultItem);
  }, [resultItem]);

  return (
    <div className='p-2 pt-0 flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <Subtitle text='Opening Hours' />
        <div 
          className='flex items-center gap-2 p-2 py-1 hover:bg-gray-100 hover:drop-shadow-sm rounded-lg cursor-pointer'
          onClick={() => setHoursDisplay(!hoursDisplay)}
        >
          <p className={`font-semibold ${resultItem.hours.open_now ? 'text-green-500' : 'text-red-500'}`}>
            {resultItem.hours.open_now ? 'Open' : 'Closed'}
          </p>
          <p>⋅</p>
          <p>{resultItem.hours.display}</p>
          <div
            className='relative mt-[1px] transition-transform duration-200' 
            style={{ transform: hoursDisplay ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <Image 
              src={'/dialog/down-arrow-backup-2-svgrepo-com.svg'}
              alt='down-arrow'
              width={14} height={14}
            />
          </div>
        </div>
        {
          hoursDisplay && (
            <div className='flex flex-col gap-2'>
              <table className="w-full border-collapse text-xs">
                <tbody>
                  {resultItem.hours.regular.map((day) => {
                    const isToday = day.day === new Date().getDay() || (new Date().getDay() === 0 && day.day === 7);

                    return (
                      <tr key={day.day} className={isToday ? "font-semibold" : ""}>
                        <td className="px-2 py-2 whitespace-nowrap w-1/3">{weekDays[day.day - 1]}</td>
                        <td className="px-2 py-2">
                          {day.open.slice(0, 2)}:{day.open.slice(2)} - {day.close.slice(0, 2)}:{day.close.slice(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
        }
      </div>

      {
        Object.keys(resultItem.social_media).length > 0 &&
        <div className='flex flex-col gap-2'>
          <Subtitle text='Social Media' />
          <div className='flex flex-col gap-2'>
            {
              Object.entries(resultItem.social_media).map(([key, value]) => value ? (
                <a 
                  key={key}
                  href={socialMedia.find((media) => media.name === key)?.url + value} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className='flex items-center gap-2 p-2 py-1 hover:bg-gray-100 hover:drop-shadow-sm rounded-lg cursor-pointer'
                >
                  <Image 
                    src={`/dialog/${key}.svg`}
                    alt={key}
                    width={16} height={16}
                  />
                  {value}
                </a>
              ) : null)
            }
          </div>
        </div>
      }
      
      {
        resultItem.website &&
        <div className='flex flex-col gap-2'>
          <Subtitle text='Website' />
          <a 
            href={resultItem.website} 
            target="_blank" 
            rel="noopener noreferrer" 
            className='p-2 py-1 text-blue-500 hover:bg-gray-100 hover:drop-shadow-sm rounded-lg cursor-pointer'
          >
            {resultItem.website}
          </a>
        </div>
      }

      {
        (resultItem.tel || resultItem.email) &&
        <div className='flex flex-col gap-2'>
          <Subtitle text='Tel & Email' />
          <div className="px-2 py-1 flex flex-col gap-2">
            {/* Phone Number */}
            {
              resultItem.tel &&
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm">{resultItem.tel}</p>
                <button 
                  onClick={() => handleCopy(resultItem.tel)}
                  className="relative p-1 rounded-md hover:bg-gray-200 transition"
                >
                  <Image src={'/dialog/copy-svgrepo-com.svg'} alt='copy' width={16} height={16} />
                </button>
              </div>
            }
            {/* Email */}
            {
              resultItem.email &&
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm">{resultItem.email}</p>
                <button 
                  onClick={() => handleCopy(resultItem.email)}
                  className="relative p-1 rounded-md hover:bg-gray-200 transition"
                >
                  <Image src={'/dialog/copy-svgrepo-com.svg'} alt='copy' width={16} height={16} />
                </button>
              </div>
            }
          </div>
        </div>
      }

      {
        resultItem.location.formatted_address &&
        <div className='flex flex-col gap-2'>
          <Subtitle text='Address' />
          <div className='flex items-center gap-2 p-2 py-1 hover:bg-gray-100 hover:drop-shadow-sm rounded-lg cursor-pointer'>
            <a 
              href={googleMapsUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-500 underline"
            >
              {resultItem.location.formatted_address}
            </a>
          </div>
        </div>
      }
    </div>
  )
}
