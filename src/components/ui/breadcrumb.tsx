import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

/**
 * Breadcrumb
 * ----------
 * 面包屑。接受一组 { label, to?, params? }。
 * 最后一项不可点击，会加 aria-current。
 */

export type BreadcrumbItem = {
  label: string
  to?: string
  params?: Record<string, string>
}

export type BreadcrumbProps = {
  items: ReadonlyArray<BreadcrumbItem>
  separator?: ReactNode
  className?: string
}

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(' ')
}

const defaultSep = (
  <svg
    viewBox="0 0 24 24"
    className="h-3.5 w-3.5 text-[var(--sea-ink-soft)]"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M9 6l6 6-6 6" />
  </svg>
)

export function Breadcrumb({
  items,
  separator = defaultSep,
  className,
}: BreadcrumbProps): ReactNode {
  return (
    <nav aria-label="Breadcrumb" className={cx('text-sm', className)}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li
              key={`${item.label}-${i}`}
              className="inline-flex items-center gap-1.5"
            >
              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  params={item.params}
                  className="text-[var(--sea-ink-soft)] no-underline transition hover:text-[var(--lagoon-deep)]"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={
                    isLast
                      ? 'font-semibold text-[var(--sea-ink)]'
                      : 'text-[var(--sea-ink-soft)]'
                  }
                >
                  {item.label}
                </span>
              )}
              {!isLast && separator}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
