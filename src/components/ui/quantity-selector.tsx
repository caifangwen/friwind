import { useState, type ReactNode } from 'react'

/**
 * QuantitySelector
 * ----------------
 * 数字步进器。min/max/step 都可配。完全受控或非受控。
 */

export type QuantitySelectorProps = {
  value?: number
  defaultValue?: number
  onChange?: (next: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  size?: 'sm' | 'md'
  className?: string
  'aria-label'?: string
}

const sizeMap = {
  sm: { box: 'h-8', button: 'w-8 text-sm', display: 'w-8 text-xs' },
  md: { box: 'h-11', button: 'w-11 text-base', display: 'w-11 text-sm' },
} as const

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(' ')
}

export function QuantitySelector({
  value,
  defaultValue = 1,
  onChange,
  min = 1,
  max = 99,
  step = 1,
  disabled = false,
  size = 'md',
  className,
  ...rest
}: QuantitySelectorProps): ReactNode {
  const isControlled = value !== undefined
  const [internal, setInternal] = useState(defaultValue)
  const current = isControlled ? (value as number) : internal
  const sizing = sizeMap[size]

  const set = (next: number) => {
    const clamped = Math.max(min, Math.min(max, next))
    if (clamped === current) return
    if (!isControlled) setInternal(clamped)
    onChange?.(clamped)
  }

  return (
    <div
      role="group"
      aria-label={rest['aria-label'] ?? 'Quantity'}
      className={cx(
        'inline-flex items-center rounded-full border border-[var(--line)] bg-white',
        sizing.box,
        disabled && 'opacity-50',
        className,
      )}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => set(current - step)}
        disabled={disabled || current <= min}
        className={cx(
          'inline-flex items-center justify-center transition-colors',
          'hover:bg-[var(--link-bg-hover)] disabled:cursor-not-allowed disabled:hover:bg-transparent',
          sizing.button,
        )}
      >
        −
      </button>
      <span
        className={cx(
          'inline-flex items-center justify-center font-semibold tabular-nums',
          sizing.display,
        )}
        aria-live="polite"
      >
        {current}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => set(current + step)}
        disabled={disabled || current >= max}
        className={cx(
          'inline-flex items-center justify-center transition-colors',
          'hover:bg-[var(--link-bg-hover)] disabled:cursor-not-allowed disabled:hover:bg-transparent',
          sizing.button,
        )}
      >
        +
      </button>
    </div>
  )
}
