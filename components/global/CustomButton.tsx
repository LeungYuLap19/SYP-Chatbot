import React from 'react'
import { Button } from '../ui/button'

export default function CustomButton({ loading, type, label, onClick, className }: CustomButtonProps) {
  return (
    <Button
      disabled={loading} 
      type={type}
      onClick={onClick}
      className={`
        bg-customWhite-100 border border-customBlack-100 transition-colors duration-500 hover:bg-customBlack-100 hover:text-customWhite-100 shadow-none min-w-[78px]
        ${loading && 'bg-customBlack-100 !opacity-100'}
        ${className}
      `}
    >
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
