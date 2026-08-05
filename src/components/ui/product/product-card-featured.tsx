import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

import { ProductBadge } from './product-badge'
import { ProductPrice } from './product-price'
import { StarRating } from './product-rating'
import { Button } from '../button'
import type { ProductItem } from './types'

/**
 * ProductCardFeatured
 * -------------------
 * 大尺寸 hero-style 卡片。用在：
 *  - 首页"主推" / "本周精选"
 *  - 落地页主商品
 *  - Hero 区右侧大图
 * 1:1 大图，左文右图（stack 在窄屏）。
 */

export type ProductCardFeaturedProps = {
  product: ProductItem
  /** 主标题下的 kicker */
  eyebrow?: string
  to?: string
  onAdd?: (product: ProductItem) => void
  className?: string
}

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(' ')
}

export function ProductCardFeatured({
  product,
  eyebrow = 'Featured',
  to = '/shop/products/$handle',
  onAdd,
  className,
}: ProductCardFeaturedProps): ReactNode {
  return (
    <article
      className={cx(
        'group relative grid grid-cols-1 gap-0 overflow-hidden border border-[var(--line)] bg-white text-[var(--sea-ink)]',
        'md:grid-cols-2',
        className,
      )}
      style={{ borderRadius: 'var(--radius-sm)' }}
    >
      <div className="relative aspect-square overflow-hidden bg-[#e9ebe7] md:aspect-auto md:h-full">
        <img
          src={product.image.src}
          alt={product.image.alt || product.title}
          width={800}
          height={800}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        {product.badge && (
          <span className="absolute left-5 top-5 z-10">
            <ProductBadge tone={product.badge} />
          </span>
        )}
      </div>

      <div className="flex flex-col justify-center gap-4 p-8 sm:p-12 lg:p-16">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[var(--lagoon)]">
          {eyebrow}
        </p>

        {product.vendor && (
          <p className="m-0 text-xs font-bold uppercase tracking-[0.14em] text-[var(--sea-ink-soft)]">
            {product.vendor}
          </p>
        )}

        <h3 className="m-0 font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-4xl lg:text-5xl">
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
            size="md"
          />
        )}

        <p className="m-0 max-w-md text-[var(--sea-ink-soft)]">
          Premium materials, refined details, and timeless silhouette
          — built to last season after season.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <ProductPrice
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            maxPrice={product.maxPrice}
            size="lg"
          />
          {onAdd && (
            <Button
              variant="primary"
              size="md"
              onClick={() => onAdd(product)}
              rightIcon={
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              }
            >
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}
