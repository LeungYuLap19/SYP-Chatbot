import CustomButton from '@/components/global/CustomButton'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function ExistedPlanner({ id }: { id: string }) {
  const router = useRouter();
  const handleOnClick = () => {
    router.push('/planner');
  };

  return (
    <div className='w-full'>
      <CustomButton 
        label='Return'
        type='button'
        className='lg:hidden'
        onClick={handleOnClick}
      />
      ExistedPlanner
    </div>
  )
}
