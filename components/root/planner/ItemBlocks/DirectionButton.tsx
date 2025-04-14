import CustomButton from '@/components/global/CustomButton'
import React, { useState } from 'react'
import ETAWindow from '../windows/ETAWindow';

export default function DirectionButton({ address }: { address: string }) {
  const [showWindow, setShowWindow] = useState(false);

  return (
    <div className='absolute top-[-52px] right-[-16px] max-sm:top-[-44px]'>
      <CustomButton
        type={'button'}
        label={'Show ETA'}
        className='text-xs bg-gray-50 !h-9 border-none rounded-b-none max-sm:!h-7'
        onClick={() => {
          setShowWindow(true);
        }}
      />
      {
        showWindow &&
        <ETAWindow setShowWindow={setShowWindow} address={address} />
      }
    </div>
  )
}
