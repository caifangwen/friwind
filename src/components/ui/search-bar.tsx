import { useState, type FormEvent, type ReactNode } from 'react'
import { useNavigate } from '@tanstack/react-router'

/**
 * SearchBar
 * ---------
 * 站点搜索框。直接对接 TanStack Router 的 /shop/search。
 * 按下回车跳到搜索结果页。
 */

export type SearchBarProps = {
  /** 初始值（来自 URL ?q= 之类的回填） */
  defaultValue?: string
  placeholder?: string
  /** 提交后跳转的目标 */
  to?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onSearch?: (q: string) => void
}

const sizeMap = {
  sm: 'h-9 text-sm',
  md: 'h-11 text-sm',
  lg: 'h-[3.25rem] text-base',
} as const

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(' ')
}

export function SearchBar({
  defaultValue = '',
  placeholder = '搜索商品…',
  to = '/shop/search',
  size = 'md',
  className,
  onSearch,
}: SearchBarProps): ReactNode {
  const [value, setValue] = useState(defaultValue)
  const navigate = useNavigate()

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const q = value.trim()
    if (!q) return
    if (onSearch) onSearch(q)
    else {
      navigate({
        to,
        search: { q } as never,
      })
    }
  }

  return (
    <form
      onSubmit={submit}
      role="search"
      className={cx(
        'flex items-center rounded-full border border-[var(--line)] bg-white pl-4 pr-1',
        'transition focus-within:border-[var(--lagoon)] focus-within:shadow-[0_0_0_3px_rgba(11,139,130,0.12)]',
        sizeMap[size],
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0 text-[var(--sea-ink-soft)]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
        className="min-w-0 flex-1 bg-transparent px-3 outline-none placeholder:text-[var(--sea-ink-soft)]"
      />
      {value && (
        <button
          type="button"
          aria-label="Clear"
          onClick={() => setValue('')}
          className="rounded-full p-1.5 text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>
      )}
      <button
        type="submit"
        className="ml-1 inline-flex h-[calc(100%-8px)] items-center rounded-full bg-[var(--lagoon)] px-4 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[var(--lagoon-deep)]"
      >
        搜索
      </button>
    </form>
  )
}
