import React, { useEffect, useState } from 'react'
import Message from './Message'
import { Input } from '@/components/ui/input'
import { useGetHistory } from '@/lib/hooks/useGetHistory'
import { handleKeyDown } from '@/lib/utils'
import CustomButton from '@/components/global/CustomButton'
import { useChatroom } from '@/lib/hooks/useChatroom'
import FlightStatus from './dialog/flightStatus/FlightStatus'
import flightStatusData from '@/jsonTest/flightStatus.json';
import FlightSearch from './dialog/flightSearch/FlightSearch'
import flightSearchData from '@/jsonTest/flightSearch.json';
import LoadingMessage from './dialog/LoadingMessage'
import PlaceSearch from './dialog/placeSearch/PlaceSearch'
import PlaceSearchData from '@/jsonTest/placeSearch.json';
import { getFlightStatus } from '@/lib/actions/aerobox/flightStatus.action'
import { TEST_AUTOCOMPLETION, TEST_FLIGHT_ARRIVAL, TEST_FLIGHT_DATE, TEST_FLIGHT_DEPARTURE, TEST_FLIGHT_DEPARTURE_DATE, TEST_FLIGHT_NUMBER, TEST_SEARCH_LIMIT } from '@/constants'
import { getFlightSearch } from '@/lib/actions/serpapi/flightSearch.action'
import { getLocationDetails } from '@/lib/actions/google/geocoding.action'
import { getPopularPlaces } from '@/lib/actions/foursquare/placeSearch.action'
import { useGetAPIs } from '@/lib/hooks/useGetAPIs'

export default function ExistedChatroom({ id, test }: { id: string; test?: boolean }) {
  const history = useGetHistory(id);
  const chatroom = history.selected;
  const { loading, handleSubmit, inputRef } = useChatroom(id);

  // test
  // const testFlightStatus: FlightStatus = flightStatusData.response_body[1];
  // const testFlightSearch: FlightResponse = flightSearchData;
  // const testPlaceSearch: ResultItem[] = PlaceSearchData.results;

  // test api
  const { flightStatus, flightResponse, geoResponse, placeResponse } = useGetAPIs(true);

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
                <Message 
                  key={message.datetime} 
                  type={message.sender} 
                  message={message} 
                />
              ))
            }

            {/* test */}
            {test && (
              <>
                {
                  flightStatus && 
                  <FlightStatus flightStatus={flightStatus} />
                }
                {
                  flightResponse &&
                  <FlightSearch flightSearch={flightResponse} />
                }
                {
                  placeResponse && geoResponse &&
                  <PlaceSearch resultItem={placeResponse} geoResponse={geoResponse[0]} />
                }
                <LoadingMessage type='flightSearch' />
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
