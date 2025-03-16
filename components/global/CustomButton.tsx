import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'

export default function CustomButton({ 
  loading, type, label, onClick, className, iconUrl, imageClassName
}: CustomButtonProps) {
  return (
    <Button
      disabled={loading} 
      type={type}
      onClick={onClick}
      className={`
        bg-customWhite-100 border border-customBlack-100 transition-colors duration-500 hover:bg-customBlack-100 hover:text-customWhite-100 shadow-none min-w-[78px] flex gap-2 items-center
        ${loading && 'bg-customBlack-100 !opacity-100'}
        ${className}
      `}
    >
      {
        !loading && iconUrl &&
        <Image 
          src={iconUrl}
          alt='button icon'
          width={14} height={14}
          className={imageClassName}
        />
      }
      {
        loading ? (
          <span className="loader"></span> 
        ) : (
          label
        )
      }
    </Button>
  )
}
