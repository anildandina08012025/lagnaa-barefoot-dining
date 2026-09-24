import type { MouseEvent, PointerEvent, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'light'

type ButtonProps = {
  children: ReactNode
  variant?: ButtonVariant
  href?: string | null
  className?: string
  disabled?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  onClick?: (event: MouseEvent<HTMLElement>) => void
  ariaLabel?: string
  type?: 'button' | 'submit' | 'reset'
}

export function Button({
  children,
  variant = 'primary',
  href,
  className = '',
  disabled = false,
  leadingIcon,
  trailingIcon,
  onClick,
  ariaLabel,
  type = 'button',
}: ButtonProps) {
  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--button-ripple-x', `${event.clientX - bounds.left}px`)
    event.currentTarget.style.setProperty('--button-ripple-y', `${event.clientY - bounds.top}px`)
  }

  const content = (
    <>
      {leadingIcon ? <span className="button__icon" aria-hidden="true">{leadingIcon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? <span className="button__icon" aria-hidden="true">{trailingIcon}</span> : null}
    </>
  )
  const classes = `button button--${variant} ${className}`.trim()

  if (href && !disabled) {
    return (
      <a className={classes} href={href} aria-label={ariaLabel} onClick={onClick} onPointerDown={handlePointerDown}>
        {content}
      </a>
    )
  }

  return (
    <button
      className={classes}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onPointerDown={handlePointerDown}
      aria-label={ariaLabel}
      title={disabled ? 'This link will be available once confirmed.' : undefined}
    >
      {content}
    </button>
  )
}

type IconButtonProps = {
  label: string
  children: ReactNode
  onClick: () => void
  className?: string
  expanded?: boolean
  controls?: string
}

export function IconButton({ label, children, onClick, className = '', expanded, controls }: IconButtonProps) {
  return (
    <button
      className={`icon-button ${className}`.trim()}
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-expanded={expanded}
      aria-controls={controls}
    >
      {children}
    </button>
  )
}
