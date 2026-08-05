import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'

/**
 * Button
 * ------
 * 统一电商站点所有按钮。视觉规范继承 styles.css 中的
 * .button-primary / .button-secondary，保持 Kegani 风格的 lagoon teal
 * 强调色和方形低圆角外观。
 *
 * 6 个 variant × 3 个 size × 可选 fullWidth / loading / icon。
 */

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outline'
  | 'danger'
  | 'link'

export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  children?: ReactNode
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>

const baseClasses =
  'inline-flex items-center justify-center gap-2 font-bold leading-none tracking-[0.015em] ' +
  'transition-[color,background-color,border-color,transform,box-shadow] duration-200 ' +
  'select-none whitespace-nowrap ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lagoon)]/40 ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)] ' +
  'disabled:cursor-not-allowed disabled:opacity-50 disabled:transform-none ' +
  'active:translate-y-px'

// 尺寸同时控制高度、内边距、字号。lg 是 hero 用，sm 是表格/密集列表用。
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-[36px] px-3.5 py-2 text-[0.72rem]',
  md: 'min-h-[44px] px-5 py-2.5 text-[0.8rem]',
  lg: 'min-h-[52px] px-7 py-3.5 text-[0.88rem]',
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'border border-[var(--lagoon)] bg-[var(--lagoon)] text-white ' +
    'hover:border-[var(--lagoon-deep)] hover:bg-[var(--lagoon-deep)] ' +
    'hover:-translate-y-[1px] hover:shadow-[0_8px_24px_-12px_rgba(11,139,130,0.55)]',
  secondary:
    'border border-[var(--sea-ink)] bg-transparent text-[var(--sea-ink)] ' +
    'hover:bg-[var(--sea-ink)] hover:text-white hover:-translate-y-[1px]',
  ghost:
    'border border-transparent bg-transparent text-[var(--sea-ink)] ' +
    'hover:bg-[var(--link-bg-hover)]',
  outline:
    'border border-[var(--line)] bg-white text-[var(--sea-ink)] ' +
    'hover:border-[var(--sea-ink)] hover:-translate-y-[1px]',
  danger:
    'border border-[#aa2b2b] bg-[#aa2b2b] text-white ' +
    'hover:bg-[#8a2222] hover:border-[#8a2222] hover:-translate-y-[1px]',
  link:
    'min-h-0 border-0 bg-transparent px-0 py-0 text-[var(--sea-ink)] ' +
    'underline-offset-4 hover:text-[var(--lagoon-deep)] hover:underline',
}

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(' ')
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      className,
      type = 'button',
      disabled,
      children,
      ...rest
    },
    ref,
  ) {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={cx(
          baseClasses,
          // link 变体不受 size 高度约束
          variant !== 'link' && sizeClasses[size],
          variantClasses[variant],
          fullWidth && 'w-full',
          className,
        )}
        {...rest}
      >
        {loading ? (
          <span
            className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
        ) : (
          leftIcon && (
            <span className="inline-flex shrink-0" aria-hidden="true">
              {leftIcon}
            </span>
          )
        )}
        {children && <span className="truncate">{children}</span>}
        {!loading && rightIcon && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    )
  },
)
