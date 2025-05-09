import React from 'react'
import SearchParams from './SearchParams'
import ResultBlock from './ResultBlock'
import BotIcon from '../BotIcon'
import BotDialogLayout from '../BotDialogLayout'

export default function HotelSearch({ hotelSearch }: { hotelSearch: HotelSearchResponse }) {
  return (
    <BotDialogLayout className='w-[50%] max-2xl:w-[60%] max-xl:w-[80%] max-lg:w-full'>
      <div className='p-6'>
        <p>
          Here are some accommendation I found in {' '}
          <span className='text-customBlue-200 font-semibold'>{hotelSearch.search_parameters.q}</span>:
        </p>
      </div>

      <SearchParams searchParams={hotelSearch.search_parameters} />

      <div className='flex flex-col gap-4 px-6 pb-6'>
        {
          hotelSearch.properties.slice(0, 5).map((hotelProperty, index) => (
            <ResultBlock
              key={index}
              hotelProperty={hotelProperty}
              check_in_date={hotelSearch.search_parameters.check_in_date}
              check_out_date={hotelSearch.search_parameters.check_out_date}
            />
          ))
        }
      </div>
    </BotDialogLayout>
  )
}
