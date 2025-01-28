'use client'
import { ERROR_TOAST_TITLE } from '@/constants';
import { deleteChatroom } from '@/lib/actions/firestore/chatroom.action';
import { showToast } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useState } from 'react';

function HistoryChatPage(
  // temp props
  { chatroom, test }: { chatroom?: Chatroom; test?: boolean }
) {
  const [loading, setLoading] = useState<boolean>(false);
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const handleOnClick = () => {
    if (test) {
      router.push('/chatroom?id=test');
    }
    else if (chatroom) {
      const route = `/chatroom?id=${chatroom.cid}`;
      router.push(route);
    }
    else {
      router.push('/chatroom');
    }
  };
  const handleDelete = async () => {
    setLoading(true);
    if (chatroom && chatroom.cid) {
      const result = await deleteChatroom(chatroom.cid);
      if (result.data) {
        showToast({ title: 'Notification', description: `${chatroom.chatroom_name} deleted` });
        router.push('/chatroom');
      }
      if (result.error) {
        showToast({ title: ERROR_TOAST_TITLE, description: result.error.message });
      }
    }
    setLoading(false);
  }

  return (
    <div onClick={handleOnClick} className={`
      cursor-pointer text-customBlack-100 text-sm p-2 rounded-lg flex justify-between items-center
      ${chatroom && id === chatroom.cid && 'bg-slate-300 cursor-default font-semibold'}
      ${!id && !chatroom && path !== '/history' && 'bg-slate-300'}
    `}>
      {
        test ? 'Test chat' :
        !chatroom ? 
        'Start a new chat':
        chatroom.chatroom_name
      }
      {
        chatroom && id === chatroom.cid && !loading ?
        <Image 
          src={'/history/trash.svg'}
          alt='delete-chat'
          width={14} height={14}
          className='cursor-pointer'
          onClick={handleDelete}
        /> :
        chatroom && id === chatroom.cid && loading ? 
        <span className="loader"></span> :
        <></>
      }
    </div>
  );
}

const HistoryChat = (
  { chatroom, test }: { chatroom?: Chatroom; test?: boolean }
) => (
  <Suspense fallback={<div>Loading...</div>}>
    <HistoryChatPage chatroom={chatroom} test={test} />
  </Suspense>
)

export default HistoryChat;