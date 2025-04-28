import PlannerDetails from '@/components/root/planner/PlannerDetails'
import PlannerList from '@/components/root/planner/PlannerList'
import React, { Suspense } from 'react'

export default function page() {
  return (
    <div className='h-full w-full flex'>
      <div className='max-lg:hidden w-[200px] border-r-[0.5px] border-slate-200 flex-shrink-0'>
        <Suspense fallback={<div>Loading Planner List...</div>}>
          <PlannerList />
        </Suspense>
      </div>
      <Suspense fallback={<div>Loading Planner Details...</div>}>
        <PlannerDetails />
      </Suspense>
    </div>
  )
}
