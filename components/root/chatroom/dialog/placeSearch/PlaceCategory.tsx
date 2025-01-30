import Image from 'next/image'
import React from 'react'

export default function PlaceCategory({ category }: { category: Category }) {
  return (
    <div className='bg-customBlue-200 text-white rounded-md px-2 py-1 text-xs font-semibold flex gap-1 items-center'>
      <div className='relative'>
        <Image 
          src={`${category.icon.prefix}64${category.icon.suffix}`}
          alt='category'
          width={20} height={20}
        />
      </div>
      <p className='mt-[-1px]'>{category.name}</p>
    </div>
  )
}
