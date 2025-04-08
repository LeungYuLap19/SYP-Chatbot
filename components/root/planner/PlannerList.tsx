'use client'
import React from 'react'
import Planner from './Planner'
import { useGetPlanner } from '@/lib/hooks/useGetPlanner';

export default function PlannerList() {
  const { planners } = useGetPlanner();

  return (
    <div className='h-full flex flex-col gap-2 bg-gray-50 relative'>
      <div className='w-full absolute top-0 left-0 p-4 font-medium'>
        <span className='lg:hidden'>Existed</span> {' '}
        Planners
      </div>
      <div 
      className='flex flex-col gap-2 overflow-auto mt-[56px] py-2 pt-4 max-lg:pb-4 items-center
      max-lg:max-h-[150px]'
      >
        <div className='max-lg:hidden w-full flex justify-center'>
          <Planner key={-1} />
        </div>
        {
          planners?.map(planner => (
            <Planner key={planner.pid} planner={planner} />
          ))
        }
      </div>
    </div>
  )
}
