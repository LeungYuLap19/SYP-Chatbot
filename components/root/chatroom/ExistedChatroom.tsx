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
  const { 
    inputRef, renameRef,
    loading, renameLoad, isRename, setIsRename,
    renameExistedChatroom,
    handleSubmit 
  } = useChatroom(id);

  return (
    <>
      <div className='w-full absolute top-0 left-0 bg-white p-4 flex flex-col gap-1 z-50'>
        <div className='flex items-center'>
          <p className='font-medium'>
            {
              !isRename && chatroom ?
              chatroom.chatroom_name :
              isRename && chatroom ?
              <Input 
                disabled={renameLoad}
                ref={renameRef}
                type='text'
                placeholder='Rename chatroom...'
                onKeyDown={(event) => handleKeyDown({ event, func: renameExistedChatroom })}
              /> :
              'No chat selected'
            }
          </p>
          
          {
            chatroom && !isRename &&
            <CustomButton 
              type={'button'} 
              label={''}
              onClick={() => setIsRename(true)}
              className={'!h-2 !w-9 !rounded-full !p-0 !min-w-0 bg-transparent border-none'}
              iconUrl={'/chatroom/pencil.svg'}
              disableHover={true}
            />
          }
        </div>
        
        
        <p className='text-sm text-gray-400'>Conversational Based Chatbot</p>
      </div>
      {
        chatroom &&
        <>
          <div className="flex flex-col-reverse gap-4 w-full overflow-auto flex-grow mt-[58px] py-4">
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
