'use client'
import React, { Suspense } from 'react'
import PlannerList from './PlannerList'
import { useSearchParams } from 'next/navigation';
import ExistedPlanner from './ExistedPlanner';
import NewPlanner from './NewPlanner';

function PlannerDetailsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return (
    <div className='h-full flex-grow bg-white flex flex-col gap-2 p-4 relative overflow-auto'>
      {
        id ?
        <ExistedPlanner id={id} /> :
        <>
          <NewPlanner />
          <div className='lg:hidden mx-[-16px]'>
            <PlannerList />
          </div>
        </>
      }
    </div>
  )
}

const PlannerDetails = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <PlannerDetailsPage />
  </Suspense>
)

export default PlannerDetails;