import { useState, type ReactNode } from 'react'

/**
 * Tabs
 * ----
 * 轻量标签页。无 headless-ui 依赖，完全受控/非受控。
 * Variant: 'underline'（默认，Kegani 风格）/ 'pill'（胶囊）
 */

export type TabItem<V extends string = string> = {
  value: V
  label: ReactNode
  content: ReactNode
  disabled?: boolean
  badge?: ReactNode
}

export type TabsProps<V extends string = string> = {
  items: ReadonlyArray<TabItem<V>>
  defaultValue?: V
  value?: V
  onChange?: (next: V) => void
  variant?: 'underline' | 'pill'
  className?: string
}

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(' ')
}

export function Tabs<V extends string = string>({
  items,
  defaultValue,
  value,
  onChange,
  variant = 'underline',
  className,
}: TabsProps<V>): ReactNode {
  const isControlled = value !== undefined
  const first = items[0]?.value as V | undefined
  const [internal, setInternal] = useState<V | undefined>(
    defaultValue ?? first,
  )
  const active = (isControlled ? value : internal) ?? first

  if (!active) return null

  const set = (next: V) => {
    if (next === active) return
    if (!isControlled) setInternal(next)
    onChange?.(next)
  }

  const activeItem = items.find((i) => i.value === active) ?? items[0]

  return (
    <div className={cx('flex flex-col gap-6', className)}>
      <div
        role="tablist"
        className={cx(
          'flex flex-wrap items-center gap-1',
          variant === 'underline'
            ? 'border-b border-[var(--line)]'
            : 'rounded-full border border-[var(--line)] bg-white p-1',
        )}
      >
        {items.map((item) => {
          const selected = item.value === active
          return (
            <button
              key={item.value}
              role="tab"
              type="button"
              aria-selected={selected}
              disabled={item.disabled}
              onClick={() => set(item.value)}
              className={cx(
                'inline-flex items-center gap-2 transition-colors',
                'disabled:cursor-not-allowed disabled:opacity-50',
                variant === 'underline'
                  ? cx(
                      'min-h-[44px] -mb-px border-b-2 px-4 text-sm font-semibold',
                      selected
                        ? 'border-[var(--lagoon)] text-[var(--sea-ink)]'
                        : 'border-transparent text-[var(--sea-ink-soft)] hover:text-[var(--sea-ink)]',
                    )
                  : cx(
                      'h-9 rounded-full px-4 text-xs font-bold uppercase tracking-[0.08em]',
                      selected
                        ? 'bg-[var(--sea-ink)] text-white'
                        : 'text-[var(--sea-ink-soft)] hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]',
                    ),
              )}
            >
              {item.label}
              {item.badge && (
                <span
                  className={cx(
                    'inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[0.6rem] font-bold',
                    selected
                      ? 'bg-white/15 text-white'
                      : 'bg-[var(--link-bg-hover)] text-[var(--sea-ink-soft)]',
                  )}
                >
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        className="text-sm text-[var(--sea-ink)]"
        key={activeItem.value}
      >
        {activeItem.content}
      </div>
    </div>
  )
}
