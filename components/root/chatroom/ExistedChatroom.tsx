import React, { useEffect, useState } from 'react'
import Message from './Message'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import chatroomsJson from '../../../jsonTest/chatrooms.json'

export default function ExistedChatroom({ id }: { id: string }) {
  const [chatroom, setChatroom] = useState<Chatroom>();

  useEffect(() => {
    const chatrooms = chatroomsJson.chatrooms;
    const selectedChatroom = chatrooms.find(chatroom => chatroom.cid === id);
    selectedChatroom && setChatroom(selectedChatroom);
  }, [id]);

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
            <Input type="text" placeholder="Enter your text..." />
            <Button>Send</Button>
          </div>
        </>
      }
    </>
  )
}
