import React, { useEffect } from 'react'
import Message from './Message'
import { Input } from '@/components/ui/input'
import { useGetHistory } from '@/lib/hooks/useGetHistory'
import { handleKeyDown } from '@/lib/utils'
import CustomButton from '@/components/global/CustomButton'
import { useChatroom } from '@/lib/hooks/useChatroom'
import FlightStatus from './dialog/FlightStatus'
import flightStatusData from '@/jsonTest/flightStatus.json';
import FlightSearch from './dialog/FlightSearch'
import flightSearchData from '@/jsonTest/flightSearch.json';
import LoadingMessage from './dialog/LoadingMessage'

export default function ExistedChatroom({ id, test }: { id: string; test?: boolean }) {
  const history = useGetHistory(id);
  const chatroom = history.selected;
  const { loading, handleSubmit, inputRef } = useChatroom(id);

  // test
  const testFlightStatus: FlightStatus = flightStatusData.response_body[1];
  const testFlightSearch: FlightResponse = flightSearchData;

  return (
    <>
      <div className='w-full absolute top-0 left-0 bg-customWhite-100 p-4 drop-shadow-default'>
        {
          chatroom ?
            chatroom.chatroom_name :
            test ?
              'Test chatroom' :
              'No chat selected'
        }
      </div>
      {
        (chatroom || test) &&
        <>
          <div className="flex flex-col-reverse gap-4 w-full overflow-auto flex-grow mt-[40px] pt-4">
            {chatroom &&
              chatroom.messages.map(message => (
                <Message key={message.datetime} type={message.sender} text={message.text} />
              ))
            }

            {/* test */}
            {test && (
              <>
                <FlightStatus flightStatus={testFlightStatus} />
                <FlightSearch flightSearch={testFlightSearch} />
              </>
            )}
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
