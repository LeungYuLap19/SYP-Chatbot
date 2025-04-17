import React, { useEffect, useState } from 'react'
import WeatherOverview from './WeatherOverview'
import HourlyForecast from './HourlyForecast'
import DayForecast from './DayForecast'
import { get7DaysForecast } from '@/lib/utils';
import BotDialogLayout from '../BotDialogLayout';
import CustomButton from '@/components/global/CustomButton';
import SaveWindow from '@/components/root/planner/windows/SaveWindow';

export default function WeatherForecast({ weatherForecast, isSaved = false }: { weatherForecast: WeatherForecast; isSaved?: boolean }) {
  const [formattedDays, setFormattedDays] = useState<FormattedDaysForecast[] | null>(null);
  const [showWindow, setShowWindow] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<WeatherItem>();

  useEffect(() => {
    setFormattedDays(get7DaysForecast(weatherForecast.forecast.forecastday, weatherForecast.current.is_day));
  }, [weatherForecast]);

  return (
    <BotDialogLayout className='w-[40%] max-2xl:w-[50%] max-xl:w-[60%] max-lg:w-[65%] max-md:w-full'>
      <div className='p-6 pb-4'>
        <p>
          Here is the weather in {' '}
          <span className='text-customBlue-200 font-semibold'>{weatherForecast.location.name}</span>
        </p>
      </div>

      <div className='flex flex-col gap-4 p-6 pt-0'>
        <WeatherOverview weatherForecast={weatherForecast} />
        <HourlyForecast weatherForecast={weatherForecast} />

        <p className='font-semibold text-xs text-customBlue-200 mt-4'>3 Days Forecast</p>
        {
          formattedDays &&
          formattedDays.map((day, index) => (
            <DayForecast day={day} key={index} />
          ))
        }
      </div>
      {
        !isSaved &&
        <div className='p-6 pt-2'>
          <CustomButton
            label='Save to Planner'
            type='button'
            className='rounded-lg text-xs w-full bg-gray-200'
            onClick={() => {
              setShowWindow(true);
              setSelectedItem({
                piid: crypto.randomUUID(),
                from_datetime: null,
                to_datetime: null,
                location: weatherForecast.location.name
              });
            }}
          />
        </div>
      }
      {
        showWindow && selectedItem &&
        <SaveWindow setShowWindow={setShowWindow} selectedItem={selectedItem} />
      }
    </BotDialogLayout>
  )
}
