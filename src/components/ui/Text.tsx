import React from 'react'

type TextProps = {
  children: React.ReactNode
  className?: string
  variant?: 'base' | 'large'
}

export const Text = ({ children, className = '', variant = 'base' }: TextProps) => {
  const base = 'text-gray-600 dark:text-gray-300'
  const size = variant === 'large' ? 'text-lg md:text-xl' : 'text-sm md:text-base'
  return <p className={`${base} ${size} ${className}`}>{children}</p>
}

export default Text
