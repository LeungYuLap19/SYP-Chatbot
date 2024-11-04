import React, { useRef } from 'react'
import { Input } from '@/components/ui/input'
import { handleKeyDown, showToast } from '@/lib/utils'
import { createChatroom } from '@/lib/actions/firestore/chatroom.action'
import { getFromCookies } from '@/lib/actions/cookies/cookies.action'
import { COOKIES_KEY_USERDATA, ERROR_TOAST_TITLE } from '@/constants'
import { useRouter } from 'next/navigation'

export default function NewChatroom() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const handleEnter = async () => {
    const inputText = inputRef.current?.value || '';
    if (!inputText.trim()) {
      return; 
    }
    const message: Message = {
      sender: 'user',
      text: inputText.trim(),
      datetime: new Date().toISOString()
    }
    const cookiesResult = await getFromCookies<UserData>({ key: COOKIES_KEY_USERDATA });
    if (cookiesResult.data) {
      const firestoreResult = await createChatroom({
        uid: cookiesResult.data.uid,
        chatroom_name: 'new chatroom',
        last_message_datetime: new Date().toISOString(),
        messages: [message]
      });
      if (firestoreResult.data) {
        const route = `/chatroom?id=${firestoreResult.data}`;
        router.push(route);
      }
      if (firestoreResult.error) {
        showToast({ title: ERROR_TOAST_TITLE, description: firestoreResult.error.message });
      }
    }
    if (cookiesResult.error) {
      showToast({ title: ERROR_TOAST_TITLE, description: cookiesResult.error.message });
    }
  }

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center gap-2'>
        <p className='text-[28px] font-semibold text-customBlack-100'>I am your travel assistance</p>
        <Input 
          className='text-sm' 
          type="text" 
          ref={inputRef}
          onKeyDown={(event) => handleKeyDown({event, func: handleEnter})}
          placeholder='Ask for attractions or check flights...' 
        />
      </div>
    </div>
  )
}
