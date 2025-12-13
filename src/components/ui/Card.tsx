import React from 'react'

export const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl border border-gray-200 bg-white shadow-sm transition dark:border-gray-700 dark:bg-gray-800 ${className}`}>
    {children}
  </div>
)

export default Card
