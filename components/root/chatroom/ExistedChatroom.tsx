import React, { useRef, useState } from 'react'
import Message from './Message'
import { Input } from '@/components/ui/input'
import { useGetHistory } from '@/lib/hooks/useGetHistory'
import { handleKeyDown, showToast } from '@/lib/utils'
import { storeMessage } from '@/lib/actions/firestore/message.action'
import { ERROR_TOAST_TITLE } from '@/constants'
import CustomButton from '@/components/global/CustomButton'

export default function ExistedChatroom({ id }: { id: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useGetHistory(id);
  const chatroom = history.selected;
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (loading) {
      return;
    }
    else {
      setLoading(true);
    }

    const inputText = inputRef.current?.value || '';
    if (!inputText.trim()) {
      setLoading(false);
      return; 
    }
    const message: Message = {
      sender: 'user',
      text: inputText.trim(),
      datetime: new Date().toISOString()
    }
    const firestoreResult = await storeMessage({ cid: id, message: message });
    if (firestoreResult.data && inputRef.current) {
      inputRef.current.value = '';
    }
    if (firestoreResult.error) {
      showToast({ title: ERROR_TOAST_TITLE, description: firestoreResult.error.message });
    }

    setLoading(false);
  }

  return (
    <>
      <div className='w-full absolute top-0 left-0 bg-customWhite-100 p-4 drop-shadow-default'>
        {chatroom ? chatroom.chatroom_name : 'No chat selected'}
      </div>
      {
        chatroom && 
        <>
          <div className='flex flex-col-reverse gap-4 w-full overflow-auto flex-grow mt-[40px]'>
            {
              chatroom.messages.map(message => (
                <Message key={message.datetime} type={message.sender} text={message.text} />
              ))
            }
          </div>
          <div className='flex gap-2'>
            <Input 
              disabled={loading}
              ref={inputRef}
              type="text" 
              placeholder="Enter your text..." 
              onKeyDown={(event) => handleKeyDown({event, func: handleSubmit})}
            />

            <CustomButton 
              loading={loading} 
              type={'button'} 
              label={'Send'} 
              onClick={handleSubmit} 
            />
          </div>
        </>
      }
    </>
  )
}
