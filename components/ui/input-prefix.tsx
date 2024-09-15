import React from 'react'

interface InputPrefixProps {
  children: React.ReactNode
}

export function InputPrefix({ children }: InputPrefixProps) {
  return (
    <span className="absolute left-3 text-sm top-1/2 transform -translate-y-1/2 text-gray-500">
      {children}
    </span>
  )
}