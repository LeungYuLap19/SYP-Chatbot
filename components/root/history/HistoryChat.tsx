'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

export default function HistoryChat(
  // temp props
  { index }: { index: number }
) {
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const handleOnClick = () => {
    if (index > -1) {
      const route = `/chatroom?id=HistoryChat${index}`;
      router.push(route);
    }
    else {
      router.push('/chatroom');
    }
  };

  return (
    <div onClick={handleOnClick} className={`
      cursor-pointer text-customBlack-100 text-sm p-2 rounded-lg
      ${id === 'HistoryChat' + index && 'bg-slate-300'}
      ${!id && index === -1 && path !== '/history' && 'bg-slate-300'}
    `}>
      {
        index > -1 ?
        'HistoryChat' + index :
        'Start a new chat'
      }
    </div>
  );
}
