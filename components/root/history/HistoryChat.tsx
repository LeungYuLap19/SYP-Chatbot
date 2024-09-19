'use client'
import { useRouter } from 'next/navigation';
import React from 'react';

export default function HistoryChat(
  // temp props
  { index }: { index: number }
) {
  const router = useRouter();
  const handleOnClick = () => {
    const route = `/chatroom?id=HistoryChat${index}`
    router.push(route)
  };

  return (
    <div onClick={handleOnClick} className='cursor-pointer'>
      HistoryChat{index}
    </div>
  );
}
