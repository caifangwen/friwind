import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

import { ProductBadge } from './product-badge'
import { ProductPrice } from './product-price'
import type { ProductItem } from './types'

/**
 * ProductCardCompact
 * -----------------
 * 1:1 比例小卡，密度高。常用于 "Recently viewed"、"Cart drawer recommendations"、
 * "订单完成后你可能还想要" 这类场景。
 */

export type ProductCardCompactProps = {
  product: ProductItem
  to?: string
  className?: string
}

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(' ')
}

export function ProductCardCompact({
  product,
  to = '/shop/products/$handle',
  className,
}: ProductCardCompactProps): ReactNode {
  return (
    <article
      className={cx(
        'group flex items-center gap-3 text-[var(--sea-ink)]',
        className,
      )}
    >
      <Link
        to={to}
        params={{ handle: product.handle }}
        className="relative block h-20 w-20 shrink-0 overflow-hidden bg-[#e9ebe7] no-underline"
        style={{ borderRadius: 'var(--radius-sm)' }}
      >
        <img
          src={product.image.src}
          alt={product.image.alt || product.title}
          width={160}
          height={160}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-1.5 top-1.5">
            <ProductBadge
              tone={product.badge}
              label={
                product.badge === 'sale' ? '促销' : undefined
              }
            />
          </span>
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {product.vendor && (
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[var(--sea-ink-soft)]">
            {product.vendor}
          </p>
        )}
        <h3 className="m-0 truncate text-sm font-semibold leading-snug">
          <Link
            to={to}
            params={{ handle: product.handle }}
            className="text-[var(--sea-ink)] no-underline hover:text-[var(--lagoon-deep)]"
          >
            {product.title}
          </Link>
        </h3>
        <ProductPrice
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          maxPrice={product.maxPrice}
          size="sm"
        />
      </div>
    </article>
  )
}
