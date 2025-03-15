import PlannerDetails from '@/components/root/planner/PlannerDetails'
import PlannerList from '@/components/root/planner/PlannerList'
import React from 'react'

export default function page() {
  return (
    <div className='h-full w-full flex'>
      <div className='max-lg:hidden w-[200px] border-r-[0.5px] border-customBlue-100 flex-shrink-0'>
        <PlannerList />
      </div>
      <PlannerDetails />
    </div>
  )
}
