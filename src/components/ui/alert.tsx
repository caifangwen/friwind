import type { ReactNode } from 'react'

/**
 * Alert
 * -----
 * 信息提示条。tone 控制配色，可选标题、icon、关闭按钮。
 */

export type AlertTone = 'info' | 'success' | 'warning' | 'danger' | 'neutral'

export type AlertProps = {
  tone?: AlertTone
  title?: ReactNode
  children?: ReactNode
  icon?: ReactNode
  onClose?: () => void
  className?: string
}

const toneMap: Record<AlertTone, string> = {
  info: 'border-[#1c5a7a]/20 bg-[#e6f1f7] text-[#0d3a52]',
  success: 'border-[#1f7a4d]/20 bg-[#e7f4ed] text-[#155238]',
  warning: 'border-[#b0851e]/20 bg-[#fbf6e7] text-[#5a4413]',
  danger: 'border-[#aa2b2b]/20 bg-[#fdebeb] text-[#7a1f1f]',
  neutral: 'border-[var(--line)] bg-[#f5f5f1] text-[var(--sea-ink)]',
}

function defaultIcon(tone: AlertTone): ReactNode {
  const base = 'h-5 w-5 shrink-0'
  const stroke = {
    info: '#1c5a7a',
    success: '#1f7a4d',
    warning: '#b0851e',
    danger: '#aa2b2b',
    neutral: 'currentColor',
  }[tone]
  return (
    <svg
      viewBox="0 0 24 24"
      className={base}
      fill="none"
      stroke={stroke}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5" />
      <circle cx="12" cy="16" r="0.6" fill={stroke} />
    </svg>
  )
}

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(' ')
}

export function Alert({
  tone = 'info',
  title,
  children,
  icon,
  onClose,
  className,
}: AlertProps): ReactNode {
  return (
    <div
      role={tone === 'danger' || tone === 'warning' ? 'alert' : 'status'}
      className={cx(
        'flex items-start gap-3 rounded-[var(--radius-sm)] border px-4 py-3 text-sm',
        toneMap[tone],
        className,
      )}
    >
      <span className="mt-0.5">{icon ?? defaultIcon(tone)}</span>
      <div className="flex-1">
        {title && (
          <p className="m-0 mb-0.5 font-semibold">{title}</p>
        )}
        {children && <div className="leading-relaxed">{children}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className="rounded p-1 opacity-60 transition hover:bg-black/5 hover:opacity-100"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}
