import type { ReactNode } from 'react'

/**
 * Section / CodeBlock
 * -------------------
 * 给 showcase 页用的辅助排版。给每个组件分组加标题、说明、代码示例。
 */

export type SectionProps = {
  id?: string
  eyebrow?: string
  title: string
  description?: string
  children: ReactNode
}

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(' ')
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: SectionProps): ReactNode {
  return (
    <section
      id={id}
      className="kegani-section border-b border-[var(--line)] last:border-b-0"
    >
      <div className="page-wrap">
        <div className="kegani-section__head">
          <div>
            {eyebrow && <p className="section-kicker">{eyebrow}</p>}
            <h2 className="section-title">{title}</h2>
          </div>
          {description && (
            <p className="section-copy max-w-md">{description}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  )
}

export function Showcase({
  label = 'Example',
  children,
  className,
}: {
  label?: string
  children: ReactNode
  className?: string
}): ReactNode {
  return (
    <div
      className={cx(
        'rounded-[var(--radius-sm)] border border-[var(--line)] bg-white p-6 sm:p-8',
        className,
      )}
    >
      <p className="mb-4 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--sea-ink-soft)]">
        {label}
      </p>
      {children}
    </div>
  )
}

export function ShowcaseGrid({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}): ReactNode {
  return (
    <div
      className={cx(
        'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function CodeBlock({ children }: { children: string }): ReactNode {
  return (
    <pre className="demo-code-block overflow-x-auto text-xs leading-relaxed">
      <code>{children}</code>
    </pre>
  )
}
