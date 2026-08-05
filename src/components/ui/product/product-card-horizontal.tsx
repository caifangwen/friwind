import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

import { ProductBadge } from './product-badge'
import { ProductPrice } from './product-price'
import { StarRating } from './product-rating'
import { Button } from '../button'
import type { ProductItem } from './types'

/**
 * ProductCardHorizontal
 * --------------------
 * 横向版本，左图右文。适合"搜索结果"、"购物车替代推荐"、"对比表"等。
 * 1.5:1 比例，密度中等，底部带 Add 按钮。
 */

export type ProductCardHorizontalProps = {
  product: ProductItem
  to?: string
  onAdd?: (product: ProductItem) => void
  className?: string
}

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(' ')
}

export function ProductCardHorizontal({
  product,
  to = '/shop/products/$handle',
  onAdd,
  className,
}: ProductCardHorizontalProps): ReactNode {
  return (
    <article
      className={cx(
        'group flex gap-4 border border-[var(--line)] bg-white p-3 text-[var(--sea-ink)]',
        'transition-shadow duration-200 hover:shadow-[var(--shadow-float)]',
        className,
      )}
      style={{ borderRadius: 'var(--radius-sm)' }}
    >
      <Link
        to={to}
        params={{ handle: product.handle }}
        className="relative block aspect-square w-32 shrink-0 overflow-hidden bg-[#e9ebe7] sm:w-40"
        style={{ borderRadius: 'var(--radius-sm)' }}
      >
        <img
          src={product.image.src}
          alt={product.image.alt || product.title}
          width={320}
          height={320}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-2 top-2">
            <ProductBadge tone={product.badge} />
          </span>
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {product.vendor && (
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[var(--sea-ink-soft)]">
            {product.vendor}
          </p>
        )}
        <h3 className="m-0 text-base font-semibold leading-snug">
          <Link
            to={to}
            params={{ handle: product.handle }}
            className="text-[var(--sea-ink)] no-underline hover:text-[var(--lagoon-deep)]"
          >
            {product.title}
          </Link>
        </h3>

        {typeof product.rating === 'number' && (
          <StarRating
            value={product.rating}
            reviewCount={product.reviewCount}
            size="sm"
          />
        )}

        <p className="hidden text-sm text-[var(--sea-ink-soft)] sm:block">
          高质感面料，舒适耐穿，适合多种场合。
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-1">
          <ProductPrice
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            maxPrice={product.maxPrice}
            size="md"
          />
          {onAdd && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onAdd(product)}
            >
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}
