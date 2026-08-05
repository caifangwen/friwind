import { useState, type ReactNode } from 'react'

/**
 * Accordion
 * ---------
 * 折叠面板。常用于商品详情、FAQ、规格说明。
 * 支持多开（defaultOpen 是数组）/ 单开（默认）。
 */

export type AccordionItem = {
  id: string
  title: ReactNode
  content: ReactNode
  disabled?: boolean
}

export type AccordionProps = {
  items: ReadonlyArray<AccordionItem>
  /** 受控打开项 */
  openIds?: ReadonlyArray<string>
  /** 默认打开项 */
  defaultOpenIds?: ReadonlyArray<string>
  onChange?: (next: ReadonlyArray<string>) => void
  /** 是否允许多个同时打开 */
  multiple?: boolean
  className?: string
}

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(' ')
}

export function Accordion({
  items,
  openIds,
  defaultOpenIds = [],
  onChange,
  multiple = false,
  className,
}: AccordionProps): ReactNode {
  const isControlled = openIds !== undefined
  const [internal, setInternal] = useState<ReadonlyArray<string>>(
    defaultOpenIds,
  )
  const active = isControlled ? (openIds as ReadonlyArray<string>) : internal

  const toggle = (id: string) => {
    const isOpen = active.includes(id)
    let next: ReadonlyArray<string>
    if (isOpen) {
      next = active.filter((x) => x !== id)
    } else {
      next = multiple ? [...active, id] : [id]
    }
    if (!isControlled) setInternal(next)
    onChange?.(next)
  }

  return (
    <div
      className={cx(
        'divide-y divide-[var(--line)] border-y border-[var(--line)]',
        className,
      )}
    >
      {items.map((item) => {
        const isOpen = active.includes(item.id)
        const panelId = `acc-panel-${item.id}`
        const buttonId = `acc-button-${item.id}`
        return (
          <div key={item.id}>
            <h3>
              <button
                id={buttonId}
                type="button"
                onClick={() => !item.disabled && toggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                disabled={item.disabled}
                className={cx(
                  'flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-semibold',
                  'transition-colors hover:text-[var(--lagoon-deep)]',
                  'disabled:cursor-not-allowed disabled:opacity-50',
                )}
              >
                {item.title}
                <span
                  className={cx(
                    'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--line)]',
                    'transition-transform duration-200',
                    isOpen && 'rotate-45 border-[var(--lagoon)] text-[var(--lagoon)]',
                  )}
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-5 pr-12 text-sm leading-relaxed text-[var(--sea-ink-soft)]"
            >
              {item.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}
