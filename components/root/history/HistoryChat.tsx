'use client'
import { ERROR_TOAST_TITLE } from '@/constants';
import { deleteChatroom } from '@/lib/actions/firestore/chatroom.action';
import { showToast } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useState } from 'react';

function HistoryChatPage({ chatroom }: { chatroom?: Chatroom; }) {
  const [loading, setLoading] = useState<boolean>(false);
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
  const handleDelete = async () => {
    setLoading(true);
    router.push('/chatroom');
    await new Promise(resolve => setTimeout(resolve, 100));
    
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
      w-[90%]
      cursor-pointer text-customBlack-100 text-sm p-2 px-4 rounded-2xl flex justify-between items-center transition-colors duration-500 hover:bg-white
      ${chatroom && id === chatroom.cid && 'bg-white cursor-default drop-shadow-default'}
      ${!id && !chatroom && path !== '/history' && 'bg-white drop-shadow-default'}
    `}>
      {
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
          loading='lazy'
        /> :
        chatroom && id === chatroom.cid && loading ? 
        <span className="loader"></span> :
        <></>
      }
    </div>
  );
}

const HistoryChat = ({ chatroom }: { chatroom?: Chatroom; }) => (
  <HistoryChatPage chatroom={chatroom} />
)

export default HistoryChat;