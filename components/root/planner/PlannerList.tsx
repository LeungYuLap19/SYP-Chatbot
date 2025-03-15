'use client'
import React from 'react'
import Planner from './Planner'
import { useGetPlanner } from '@/lib/hooks/useGetPlanner';

export default function PlannerList() {
  const { planners } = useGetPlanner();

  return (
    <div className='h-full flex flex-col gap-2 px-4 bg-customWhite-100 relative overflow-hidden'>
      <div className='max-lg:hidden w-full bg-customWhite-100 absolute top-0 left-0 p-4 drop-shadow-default'>
        Planners
      </div>
      <div className='flex flex-col gap-2 overflow-auto mt-[56px] py-2 pt-4'>
        <div className='max-lg:hidden'>
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
