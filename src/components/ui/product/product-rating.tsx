import type { ReactNode } from 'react'

/**
 * StarRating
 * ----------
 * 0–5 星评分，可显示数字。支持只读 / 可交互。
 * 视觉规范：实心用 sea-ink，未选用 line/30，partial 用半填充 SVG mask。
 */

export type StarRatingProps = {
  value: number
  outOf?: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  reviewCount?: number
  className?: string
}

const sizeMap = {
  sm: { box: 'h-3 w-3', text: 'text-xs' },
  md: { box: 'h-4 w-4', text: 'text-sm' },
  lg: { box: 'h-5 w-5', text: 'text-base' },
} as const

function Star({
  fill,
  size,
}: {
  fill: 'full' | 'half' | 'empty'
  size: string
}) {
  const path =
    'M12 2 14.95 8.55 22 9.42 16.7 14.32 18.18 21.5 12 17.77 5.82 21.5 7.3 14.32 2 9.42 9.05 8.55Z'
  if (fill === 'empty') {
    return (
      <svg
        viewBox="0 0 24 24"
        className={size}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={path} />
      </svg>
    )
  }
  // 满星 / 半星都用实心 SVG，覆盖半星时用 mask 切一半
  return (
    <svg viewBox="0 0 24 24" className={size} aria-hidden="true">
      <defs>
        <linearGradient id={`half-${fill}`} x1="0" x2="1" y1="0" y2="0">
          <stop
            offset="50%"
            stopColor="currentColor"
            stopOpacity="1"
          />
          <stop
            offset="50%"
            stopColor="currentColor"
            stopOpacity="0"
          />
        </linearGradient>
      </defs>
      <path
        d={path}
        fill={fill === 'full' ? 'currentColor' : `url(#half-${fill})`}
      />
    </svg>
  )
}

export function StarRating({
  value,
  outOf = 5,
  size = 'sm',
  showValue = true,
  reviewCount,
  className,
}: StarRatingProps): ReactNode {
  const sizing = sizeMap[size]
  const clamped = Math.max(0, Math.min(value, outOf))
  const items: Array<'full' | 'half' | 'empty'> = Array.from(
    { length: outOf },
    (_, i) => {
      const remaining = clamped - i
      if (remaining >= 0.75) return 'full'
      if (remaining >= 0.25) return 'half'
      return 'empty'
    },
  )

  return (
    <div
      className={
        'inline-flex items-center gap-1.5 text-[var(--sea-ink)] ' +
        (className ?? '')
      }
      role="img"
      aria-label={`Rated ${clamped} out of ${outOf} stars${
        reviewCount ? `, ${reviewCount} reviews` : ''
      }`}
    >
      <span className={`inline-flex gap-0.5 ${sizing.box}`}>
        {items.map((fill, i) => (
          <Star key={i} fill={fill} size={sizing.box} />
        ))}
      </span>
      {showValue && (
        <span className={`font-semibold ${sizing.text}`}>
          {clamped.toFixed(1)}
        </span>
      )}
      {typeof reviewCount === 'number' && (
        <span className={`text-[var(--sea-ink-soft)] ${sizing.text}`}>
          ({reviewCount})
        </span>
      )}
    </div>
  )
}
