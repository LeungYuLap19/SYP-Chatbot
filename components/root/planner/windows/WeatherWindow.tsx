import React, { useEffect, useState } from 'react'
import WindowLayout from './WindowLayout'
import WeatherOverview from '../../chatroom/dialog/weatherForecast/WeatherOverview';
import { useGetAPIs } from '@/lib/hooks/useGetAPIs';

export default function WeatherWindow({ 
  setShowWindow, weatherItems, setSelectedIndex
}: { 
  setShowWindow: React.Dispatch<React.SetStateAction<boolean>>;
  weatherItems: WeatherItem[];
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { checkWeather, weatherResponse } = useGetAPIs(false);
  const [weatherOverviews, setWeatherOverviews] = useState<WeatherForecast[]>([]);

  useEffect(() => {
    for(const item of weatherItems) {
      checkWeather(item.location);
    }
  }, [weatherItems]);

  useEffect(() => {
    if (weatherResponse) {
      setWeatherOverviews(prev => [...prev, weatherResponse]);
    }
  }, [weatherResponse]);

  return (
    <WindowLayout setShowWindow={setShowWindow} className='flex-col gap-4'>
      {
        weatherOverviews.map((item, index) => (
          <div 
            className='w-[400px] max-sm:w-[300px] transition-all duration-500 hover:bg-gray-100 hover:drop-shadow-default p-3 rounded-lg cursor-pointer' key={index}
            onClick={() => {
              setSelectedIndex(index);
              setShowWindow(false);
            }}
          >
            <WeatherOverview weatherForecast={item} />
          </div>
        ))
      }
    </WindowLayout>
  )
}
