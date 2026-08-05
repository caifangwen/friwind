import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'

/**
 * IconButton
 * ---------
 * 纯图标按钮，方形 hit area。继承 Button 的 variant，但永远是方形。
 */

export type IconButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
export type IconButtonSize = 'sm' | 'md' | 'lg'

export type IconButtonProps = {
  variant?: IconButtonVariant
  size?: IconButtonSize
  'aria-label': string
  icon: ReactNode
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'>

const sizeMap: Record<IconButtonSize, { box: string; icon: string }> = {
  sm: { box: 'h-9 w-9', icon: 'h-4 w-4' },
  md: { box: 'h-11 w-11', icon: 'h-5 w-5' },
  lg: { box: 'h-[3.25rem] w-[3.25rem]', icon: 'h-6 w-6' },
}

const variantMap: Record<IconButtonVariant, string> = {
  primary:
    'border border-[var(--lagoon)] bg-[var(--lagoon)] text-white ' +
    'hover:bg-[var(--lagoon-deep)] hover:border-[var(--lagoon-deep)]',
  secondary:
    'border border-[var(--sea-ink)] bg-transparent text-[var(--sea-ink)] ' +
    'hover:bg-[var(--sea-ink)] hover:text-white',
  ghost:
    'border border-transparent bg-transparent text-[var(--sea-ink)] ' +
    'hover:bg-[var(--link-bg-hover)]',
  outline:
    'border border-[var(--line)] bg-white text-[var(--sea-ink)] ' +
    'hover:border-[var(--sea-ink)]',
}

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(' ')
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { variant = 'ghost', size = 'md', icon, className, type = 'button', ...rest },
    ref,
  ) {
    const sizing = sizeMap[size]
    return (
      <button
        ref={ref}
        type={type}
        className={cx(
          'inline-flex shrink-0 items-center justify-center rounded-full ' +
            'transition-[color,background-color,border-color,transform] duration-200 ' +
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lagoon)]/40 ' +
            'focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)] ' +
            'disabled:cursor-not-allowed disabled:opacity-50',
          sizing.box,
          variantMap[variant],
          className,
        )}
        {...rest}
      >
        <span className={cx('inline-flex', sizing.icon)} aria-hidden="true">
          {icon}
        </span>
      </button>
    )
  },
)
