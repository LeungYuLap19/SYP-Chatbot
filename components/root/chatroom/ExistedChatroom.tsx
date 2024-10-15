import React from 'react'
import Message from './Message'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function ExistedChatroom({ id }: { id: string }) {
  return (
    <>
      <div className='w-full absolute top-0 left-0 bg-customWhite-100 p-4 drop-shadow-default'>
        {id ? `Chatroom for ${id}` : 'No chat selected'}
      </div>
      {
        id && 
        <>
          <div className='flex flex-col-reverse gap-4 w-full overflow-auto flex-grow mt-[40px]'>
            {
              Array.from({ length: 80 }).map((_, index) => {
                if (index % 2 === 0) {
                  return <Message key={index} type='user' />
                }
                else {
                  return <Message key={index} type='bot' />
                }
              })
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
