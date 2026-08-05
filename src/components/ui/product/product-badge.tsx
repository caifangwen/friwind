import type { ReactNode } from 'react'

/**
 * ProductBadge
 * ------------
 * 专为产品卡设计的徽章。覆盖电商最常见的 6 种状态。
 * 用在 product-card__media 角落，绝对定位。
 */

export type ProductBadgeTone =
  | 'sale'
  | 'soldOut'
  | 'new'
  | 'limited'
  | 'hot'
  | 'preorder'

export type ProductBadgeProps = {
  tone: ProductBadgeTone
  /** 可选，sale/limited 时显示具体折扣 */
  label?: string
}

const meta: Record<
  ProductBadgeTone,
  { label: string; classes: string; defaultLabel: string }
> = {
  sale: {
    defaultLabel: 'Sale',
    classes:
      'bg-[var(--lagoon)] text-white border-[var(--lagoon)]',
    label: 'Sale',
  },
  soldOut: {
    defaultLabel: 'Sold out',
    classes:
      'bg-white/90 text-[var(--sea-ink)] border-[var(--sea-ink)]/10',
    label: 'Sold out',
  },
  new: {
    defaultLabel: 'New',
    classes: 'bg-[var(--sea-ink)] text-white border-[var(--sea-ink)]',
    label: 'New',
  },
  limited: {
    defaultLabel: 'Limited',
    classes:
      'bg-[#7a5a13] text-white border-[#7a5a13]',
    label: 'Limited',
  },
  hot: {
    defaultLabel: 'Hot',
    classes: 'bg-[#aa2b2b] text-white border-[#aa2b2b]',
    label: 'Hot',
  },
  preorder: {
    defaultLabel: 'Pre-order',
    classes:
      'bg-white text-[var(--sea-ink)] border-[var(--line)]',
    label: 'Pre-order',
  },
}

export function ProductBadge({ tone, label }: ProductBadgeProps): ReactNode {
  const m = meta[tone]
  return (
    <span
      className={
        'inline-flex items-center gap-1 border rounded-full ' +
        'px-2.5 py-1 text-[0.62rem] font-bold uppercase leading-none ' +
        'tracking-[0.1em] ' +
        m.classes
      }
    >
      {label ?? m.defaultLabel}
    </span>
  )
}
