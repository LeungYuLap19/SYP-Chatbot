'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

function HistoryChatPage(
  // temp props
  { chatroom }: { chatroom?: Chatroom }
) {
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const handleOnClick = () => {
    if (chatroom) {
      const route = `/chatroom?id=${chatroom.cid}`;
      router.push(route);
    }
    else {
      router.push('/chatroom');
    }
  };

  return (
    <div onClick={handleOnClick} className={`
      cursor-pointer text-customBlack-100 text-sm p-2 rounded-lg
      ${chatroom && id === chatroom.cid && 'bg-slate-300'}
      ${!id && !chatroom && path !== '/history' && 'bg-slate-300'}
    `}>
      {
        !chatroom ?
        'Start a new chat':
        chatroom.chatroom_name
      }
    </div>
  );
}

const HistoryChat = (
  { chatroom }: { chatroom?: Chatroom }
) => (
  <Suspense fallback={<div>Loading...</div>}>
    <HistoryChatPage chatroom={chatroom} />
  </Suspense>
)

export default HistoryChat;