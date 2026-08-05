import type { ReactNode } from 'react'

/**
 * ProductPrice
 * ------------
 * 展示产品价格。compareAt 大于 price 时显示划线原价。
 * 走中国电商惯例：人民币符号 ¥ 由 prop 传入，默认 "$"。
 */

export type MoneyLike = {
  amount: string | number
  currencyCode?: string
}

export type ProductPriceProps = {
  price: MoneyLike
  compareAtPrice?: MoneyLike | null
  /** 区间价：min ~ max */
  maxPrice?: MoneyLike | null
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

function format(money: MoneyLike): string {
  const amount = Number(money.amount)
  if (!Number.isFinite(amount)) return ''
  return amount.toLocaleString(undefined, {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })
}

function prefix(money: MoneyLike): string {
  const c = money.currencyCode?.toUpperCase()
  if (c === 'CNY' || c === 'RMB') return '¥'
  if (c === 'USD') return '$'
  if (c === 'EUR') return '€'
  if (c === 'GBP') return '£'
  if (c === 'JPY') return '¥'
  return c ? `${c} ` : ''
}

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-2xl',
} as const

export function ProductPrice({
  price,
  compareAtPrice,
  maxPrice,
  size = 'md',
  className,
}: ProductPriceProps): ReactNode {
  const onSale =
    compareAtPrice && Number(compareAtPrice.amount) > Number(price.amount)
  const isRange =
    maxPrice && Number(maxPrice.amount) > Number(price.amount)

  return (
    <p
      className={
        'flex flex-wrap items-baseline gap-x-2 gap-y-0.5 ' +
        'text-[var(--sea-ink)] ' +
        sizeClasses[size] +
        (className ? ` ${className}` : '')
      }
    >
      {onSale && (
        <span className="text-[var(--sea-ink-soft)] line-through">
          {prefix(compareAtPrice!)}
          {format(compareAtPrice!)}
        </span>
      )}
      <span className="font-semibold">
        {prefix(price)}
        {format(price)}
      </span>
      {isRange && (
        <>
          <span className="text-[var(--sea-ink-soft)]">–</span>
          <span className="font-semibold">
            {prefix(maxPrice!)}
            {format(maxPrice!)}
          </span>
        </>
      )}
    </p>
  )
}
