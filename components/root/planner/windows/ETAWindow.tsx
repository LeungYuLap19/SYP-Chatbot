import React, { useEffect, useState } from 'react'
import CloseWindow from './CloseWindow'
import DirectionBlock from '../DirectionBlock';
import CustomButton from '@/components/global/CustomButton';
import DirectionMap from '@/components/global/DirectionMap';
import { travelModes } from '@/constants';
import { useGetAPIs } from '@/lib/hooks/useGetAPIs';

export default function ETAWindow({
  setShowWindow,
  address
}: {
  setShowWindow: React.Dispatch<React.SetStateAction<boolean>>;
  address: string;
}) {
  const [url, setUrl] = useState<string>('');
  const [selectedMode, setSelectedMode] = useState<TravelModeProps>(travelModes[0]);
  const { directionResponse, checkDirection } = useGetAPIs(false);

  const getEmbeddedMapUrl = (directionResponse: DirectionResponse) => {
    const origin = encodeURIComponent(directionResponse.search_parameters.start_coords);
    const destination = encodeURIComponent(directionResponse.search_parameters.end_addr);
    const mode = encodeURIComponent(
      directionResponse.directions[0].travel_mode.toLowerCase() === 'cycling'
        ? 'bicycling' :
      directionResponse.directions[0].travel_mode.toLowerCase() === 'flight' 
        ? 'flying' :
      directionResponse.directions[0].travel_mode.toLowerCase()
    );

    const directionsUrl = `https://www.google.com/maps/embed/v1/directions?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&origin=${origin}&destination=${destination}&mode=${mode}`;
    setUrl(directionsUrl);
  };

  useEffect(() => {
    if (directionResponse && !directionResponse.error) {
      getEmbeddedMapUrl(directionResponse);
    }
  }, [directionResponse]);

  useEffect(() => {
    checkDirection(address, selectedMode.value);
  }, [selectedMode, address]);

  return (
    <div className='z-50 w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 flex justify-center items-center'>
      <div className='p-8 pt-10 bg-white rounded-lg flex max-sm:flex-col gap-6 justify-center relative min-w-[400px]'>
        <CloseWindow setShowWindow={setShowWindow} />

        {
          directionResponse && directionResponse.error ?
            <div className='w-[400px] h-[200px] flex justify-center items-center'>
              <p>⚠️ {directionResponse.error}</p>
            </div> :
            !directionResponse ?
              <div className='w-[400px] h-[200px] flex justify-center items-center'>
                <p>⚠️ Cannot get direction.</p>
              </div> :
              <>
                <div className='flex flex-col gap-6'>
                  <p className='font-semibold'>Leave Now to Destination</p>

                  <div className='flex gap-4 items-center'>
                    <div className='flex flex-col items-center'>
                      <span className='w-3 h-3 rounded-full border-2 border-customBlue-200'></span>
                      <span className='w-[2px] h-8 bg-gradient-to-b from-customBlue-200 to-green-600'></span>
                      <span className='w-3 h-3 bg-green-600 rounded-full'></span>
                    </div>

                    <div className='flex flex-col gap-[20px] text-sm mt-[-2px] text-customBlack-100'>
                      <p>Current Location</p>
                      <p className='w-[300px] truncate'>{directionResponse ? directionResponse.search_parameters.end_addr : ''}</p>
                    </div>
                  </div>

                  <div className='flex gap-6 items-center ml-[-8px]'>
                    {
                      travelModes.map((mode, index) => (
                        <CustomButton
                          type='button'
                          label={mode.mode}
                          key={index}
                          onClick={() => { setSelectedMode(mode) }}
                          className={`
                        bg-transparent text-xs border-none flex-col gap-1 items-center !p-0 !min-w-0 !h-14 !w-14 rounded-lg
                        ${selectedMode.mode === mode.mode && 'bg-customBlack-100 text-white'}
                      `}
                          imageClassName={`mt-1 ${selectedMode.mode === mode.mode && 'invert'}`}
                          iconUrl={mode.icon}
                          disableHover={true}
                          disableActive={
                            mode.mode !== 'best' ?
                              !directionResponse?.durations.some(duration =>
                                duration.travel_mode.toLowerCase() === mode.mode.toLowerCase()
                              ) : false
                          }
                        />
                      ))
                    }
                  </div>

                  <div className='flex flex-col gap-4'>
                    {
                      directionResponse &&
                      directionResponse.directions.map((direction, index) => (
                        <DirectionBlock direction={direction} key={index} />
                      ))
                    }
                  </div>

                  <CustomButton
                    type={'button'}
                    label={'Get Directions in Google Maps'}
                    className='rounded-lg text-xs'
                    onClick={() => {
                      const directionsUrl = directionResponse ? directionResponse.search_metadata.google_maps_directions_url : null;

                      if (directionsUrl) {
                        window.open(directionsUrl, '_blank');
                      }
                      setShowWindow(false);
                    }}
                  />
                </div>

                <DirectionMap url={url} />
              </>
        }
      </div>
    </div>
  )
}
