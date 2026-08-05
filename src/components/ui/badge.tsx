import type { HTMLAttributes, ReactNode } from 'react'

/**
 * Badge
 * -----
 * 通用徽章。Kegani 风格下大量使用方角（radius-xs）和小写字号。
 * tone 控制配色，shape 控制方/圆。
 */

export type BadgeTone =
  | 'neutral'
  | 'brand'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'dark'

export type BadgeShape = 'square' | 'pill'

export type BadgeProps = {
  tone?: BadgeTone
  shape?: BadgeShape
  children: ReactNode
} & HTMLAttributes<HTMLSpanElement>

const toneClasses: Record<BadgeTone, string> = {
  neutral:
    'border-[var(--line)] bg-[var(--chip-bg)] text-[var(--sea-ink)]',
  brand:
    'border-[var(--lagoon)] bg-[var(--lagoon)] text-white',
  success:
    'border-[#1f7a4d] bg-[#1f7a4d] text-white',
  warning:
    'border-[#b0851e] bg-[#fbf6e7] text-[#7a5a13]',
  danger:
    'border-[#aa2b2b] bg-[#aa2b2b] text-white',
  info:
    'border-[#1c5a7a] bg-[#1c5a7a] text-white',
  dark:
    'border-[var(--sea-ink)] bg-[var(--sea-ink)] text-white',
}

const shapeClasses: Record<BadgeShape, string> = {
  square: 'rounded-[var(--radius-xs)]',
  pill: 'rounded-full',
}

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(' ')
}

export function Badge({
  tone = 'neutral',
  shape = 'square',
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 border px-2 py-[0.32rem] ' +
          'text-[0.62rem] font-bold uppercase leading-none tracking-[0.1em]',
        toneClasses[tone],
        shapeClasses[shape],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  )
}
