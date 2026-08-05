import type { ReactNode } from 'react'
import { Spinner } from './spinner'

/**
 * EmptyState
 * ----------
 * 列表为空时的占位。已有 src/components/shop/empty-state.tsx，
 * 这里给 UI kit 提供一个无依赖版本，可在非 Shopify 场景复用。
 */

export type EmptyStateProps = {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  /** loading=true 时显示 spinner 而非 icon */
  loading?: boolean
  className?: string
}

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(' ')
}

const defaultIcon = (
  <svg
    viewBox="0 0 48 48"
    className="h-12 w-12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="24" cy="24" r="20" />
    <path d="M16 30c2.5 2.5 5 3.5 8 3.5s5.5-1 8-3.5" />
    <circle cx="18" cy="20" r="1" fill="currentColor" />
    <circle cx="30" cy="20" r="1" fill="currentColor" />
  </svg>
)

export function EmptyState({
  icon = defaultIcon,
  title,
  description,
  action,
  loading = false,
  className,
}: EmptyStateProps): ReactNode {
  return (
    <div
      className={cx(
        'flex flex-col items-center justify-center gap-3 px-6 py-16 text-center text-[var(--sea-ink-soft)]',
        className,
      )}
    >
      <div className="text-[var(--sea-ink-soft)]/70">
        {loading ? <Spinner size="lg" tone="muted" /> : icon}
      </div>
      <h3 className="m-0 text-base font-semibold text-[var(--sea-ink)]">
        {title}
      </h3>
      {description && (
        <p className="m-0 max-w-sm text-sm">{description}</p>
      )}
      {action && <div className="mt-3">{action}</div>}
    </div>
  )
}
