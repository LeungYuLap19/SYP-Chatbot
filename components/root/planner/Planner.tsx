'use client'
import { ERROR_TOAST_TITLE } from '@/constants';
import { deletePlanner } from '@/lib/actions/firestore/planner.action';
import { showToast } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useState } from 'react'

function PlannerPage({ planner }: { planner?: PlannerDetails }) {
  const [loading, setLoading] = useState<boolean>(false);
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const handleOnClick = () => {
    if (planner) {
      const route = `/planner?id=${planner.pid}`;
      router.push(route);
    }
    else {
      router.push('/planner');
    }
  };
  const handleDelete = async () => {
    setLoading(true);
    router.push('/planner');
    await new Promise(resolve => setTimeout(resolve, 100));

    if (planner && planner.pid) {
      const result = await deletePlanner(planner.pid);
      if (result.data) {
        showToast({ title: 'Notification', description: `${planner.name} deleted`});
        router.push('/planner');
      }
      if (result.error) {
        showToast({ title: ERROR_TOAST_TITLE, description: result.error.message });
      }
    }
    setLoading(false);
  }


  return (
    <div onClick={handleOnClick} className={`
      w-[90%]
      cursor-pointer text-customBlack-100 text-sm p-2 px-4 rounded-2xl flex justify-between transition-colors duration-500 hover:bg-white
      ${planner && id === planner.pid && 'bg-white cursor-default drop-shadow-default'}
      ${!id && !planner && path == '/planner' && 'bg-white drop-shadow-default'}
    `}>
      {
        !planner ? 
        'Create planner':
        planner.name
      }
      {
        planner && id === planner.pid && !loading ?
        <Image
          src={'/history/trash.svg'}
          alt='delete-planner'
          width={14} height={14}
          className='cursor-pointer'
          onClick={handleDelete}
          loading='lazy'
        /> :
        planner && id === planner.pid && loading ? 
        <span className="loader"></span> :
        <></>
      }
    </div>
  )
}

const Planner = ({ planner }: { planner?: PlannerDetails }) => (
  <Suspense fallback={<div>Loading Planner List...</div>}>
    <PlannerPage planner={planner} />
  </Suspense>
)

export default Planner