import React from 'react'
import Message from './Message'
import { Input } from '@/components/ui/input'
import { useGetHistory } from '@/lib/hooks/useGetHistory'
import { handleKeyDown } from '@/lib/utils'
import CustomButton from '@/components/global/CustomButton'
import { useChatroom } from '@/lib/hooks/useChatroom'

export default function ExistedChatroom({ id }: { id: string; }) {
  const history = useGetHistory(id);
  const chatroom = history.selected;
  const { loading, handleSubmit, inputRef } = useChatroom(id);

  return (
    <>
      <div className='w-full absolute top-0 left-0 bg-customWhite-100 p-4 drop-shadow-default'>
        {
          chatroom ?
          chatroom.chatroom_name :
          'No chat selected'
        }
      </div>
      {
        chatroom &&
        <>
          <div className="flex flex-col-reverse gap-4 w-full overflow-auto flex-grow mt-[40px] pt-4">
            {
              loading && 
              <Message 
                type={'bot'}
                message={
                  {
                    sender: 'bot',
                    text: 'Thinking...',
                    datetime: new Date().toISOString(),
                  }
                }
                className='!bg-customBlack-100 !text-customWhite-100'
              />
            }
            {
              chatroom &&
                chatroom.messages.map(message => (
                  <Message 
                    key={message.datetime} 
                    type={message.sender} 
                    message={message} 
                  />
                ))
            }
          </div>
          <div className='flex gap-2'>
            <Input
              disabled={loading}
              ref={inputRef}
              type="text"
              placeholder="Enter your text..."
              onKeyDown={(event) => handleKeyDown({ event, func: handleSubmit })}
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
