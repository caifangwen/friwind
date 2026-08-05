import type { HTMLAttributes } from 'react'

/**
 * Spinner
 * ------
 * 简单的 loading 圈。size 控制直径，tone 控制颜色。
 */

export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl'
export type SpinnerTone = 'brand' | 'ink' | 'white' | 'muted'

export type SpinnerProps = {
  size?: SpinnerSize
  tone?: SpinnerTone
  label?: string
} & HTMLAttributes<HTMLSpanElement>

const sizeMap: Record<SpinnerSize, string> = {
  sm: 'h-3.5 w-3.5 border-2',
  md: 'h-5 w-5 border-2',
  lg: 'h-8 w-8 border-[3px]',
  xl: 'h-12 w-12 border-4',
}

const toneMap: Record<SpinnerTone, string> = {
  brand: 'border-[var(--lagoon)]/30 border-t-[var(--lagoon)]',
  ink: 'border-[var(--sea-ink)]/20 border-t-[var(--sea-ink)]',
  white: 'border-white/30 border-t-white',
  muted: 'border-[var(--sea-ink-soft)]/30 border-t-[var(--sea-ink-soft)]',
}

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(' ')
}

export function Spinner({
  size = 'md',
  tone = 'brand',
  label = 'Loading',
  className,
  ...rest
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cx(
        'inline-block animate-spin rounded-full',
        sizeMap[size],
        toneMap[tone],
        className,
      )}
      {...rest}
    />
  )
}
