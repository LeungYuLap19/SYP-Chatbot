import CustomButton from '@/components/global/CustomButton'
import { useGetAPIs } from '@/lib/hooks/useGetAPIs'
import React, { useEffect } from 'react'

export default function DirectionButton({ address }: { address: string }) {
  const { directionResponse, checkDirection, loading } = useGetAPIs(false);

  useEffect(() => {
    if (directionResponse) {
      const directionsUrl = directionResponse.search_metadata.google_maps_directions_url;

      if (directionsUrl) {
        window.open(directionsUrl, '_blank');
      }
    }
  }, [directionResponse]);

  return (
    <div className='absolute top-[-52px] right-[-16px]'>
      <CustomButton 
        type={'button'} 
        label={'Get Direction on Google Map'}   
        loading={loading}
        className='text-xs bg-white !h-9 border-none rounded-b-none'
        onClick={() => checkDirection(address)}
      />
    </div>
  )
}
