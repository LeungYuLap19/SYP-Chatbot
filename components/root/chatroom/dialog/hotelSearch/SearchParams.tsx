import React from 'react'
import ParamBlock from './ParamBlock'

export default function SearchParams({ searchParams }: { searchParams: SearchParameters }) {
  return (
    <div className='flex gap-6 items-center px-6 pb-6'>
      <ParamBlock label={searchParams.q} type='location' />
      <ParamBlock label={`${searchParams.check_in_date} - ${searchParams.check_out_date}`} type='duration' />
      <ParamBlock label={searchParams.adults + searchParams.children} type='people' />
    </div>
  )
}
