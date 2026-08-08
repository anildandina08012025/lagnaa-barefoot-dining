import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type ContainerProps = ComponentPropsWithoutRef<'div'> & {
  children: ReactNode
  narrow?: boolean
}

export function Container({ children, className = '', narrow = false, ...props }: ContainerProps) {
  const sizeClass = narrow ? 'container container--narrow' : 'container'

  return (
    <div className={`${sizeClass} ${className}`.trim()} {...props}>
      {children}
    </div>
  )
}
