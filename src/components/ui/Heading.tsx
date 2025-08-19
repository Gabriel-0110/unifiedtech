import React from 'react'

type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  className?: string
}

export const Heading = ({ level = 2, children, className = '' }: HeadingProps) => {
  const Tag = `h${level}` as React.ElementType
  return React.createElement(
    Tag,
    { className: `font-semibold tracking-tight text-gray-900 dark:text-gray-100 ${className}` },
    children
  )
}

export default Heading
