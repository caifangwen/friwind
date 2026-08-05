import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

import { ProductBadge } from './product-badge'
import { ProductPrice } from './product-price'
import { StarRating } from './product-rating'
import type { ProductItem } from './types'

/**
 * ProductCard (default)
 * --------------------
 * 4:5 比例主图 + 角标 + 标题 + 价格 + 评分。
 * 这是 grid 中最常见的一种。也是可访问的（整张卡是链接）。
 *
 * Variants:
 * - default：带 hover 切换第二张图 + quick add
 * - minimal：无评分/quick add，密度更高
 */

export type ProductCardProps = {
  product: ProductItem
  variant?: 'default' | 'minimal'
  /** 点击整张卡跳转到的目标，'/shop/products/$handle' 这种带 param 模板 */
  to?: string
  /** Quick add 按钮点击 */
  onQuickAdd?: (product: ProductItem) => void
  className?: string
}

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(' ')
}

export function ProductCard({
  product,
  variant = 'default',
  to = '/shop/products/$handle',
  onQuickAdd,
  className,
}: ProductCardProps): ReactNode {
  const showQuickAdd =
    variant === 'default' && product.showQuickAdd && onQuickAdd

  return (
    <article
      className={cx(
        'group flex flex-col gap-3 text-[var(--sea-ink)]',
        className,
      )}
    >
      <Link
        to={to}
        params={{ handle: product.handle }}
        className="relative block overflow-hidden bg-[#e9ebe7] no-underline"
        style={{
          aspectRatio: '4 / 5',
          borderRadius: 'var(--radius-sm)',
        }}
      >
        <img
          src={product.image.src}
          alt={product.image.alt || product.title}
          width={600}
          height={750}
          loading="lazy"
          className={cx(
            'h-full w-full object-cover transition-all duration-500',
            'group-hover:scale-[1.04]',
            product.hoverImage
              ? 'opacity-100 group-hover:opacity-0'
              : undefined,
          )}
        />
        {product.hoverImage && (
          <img
            src={product.hoverImage.src}
            alt={product.hoverImage.alt || product.title}
            width={600}
            height={750}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}

        {product.badge && (
          <span className="absolute left-3 top-3 z-10">
            <ProductBadge tone={product.badge} />
          </span>
        )}

        {showQuickAdd && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onQuickAdd?.(product)
            }}
            className={cx(
              'absolute bottom-3 left-3 right-3 z-10 inline-flex items-center justify-center gap-2',
              'translate-y-2 rounded-[var(--radius-sm)] bg-white/95 px-4 py-2.5',
              'text-xs font-bold uppercase tracking-[0.08em] text-[var(--sea-ink)]',
              'opacity-0 shadow-[0_8px_24px_-12px_rgba(17,19,17,0.25)] transition-all duration-300',
              'group-hover:translate-y-0 group-hover:opacity-100',
              'hover:bg-[var(--sea-ink)] hover:text-white',
            )}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 6h15l-1.5 9H7.5L6 3H3" />
              <circle cx="9" cy="20" r="1.4" />
              <circle cx="18" cy="20" r="1.4" />
            </svg>
            Quick add
          </button>
        )}
      </Link>

      <div className="flex flex-col gap-1.5">
        {product.vendor && variant === 'default' && (
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[var(--sea-ink-soft)]">
            {product.vendor}
          </p>
        )}
        <h3 className="m-0 text-sm font-semibold leading-snug">
          <Link
            to={to}
            params={{ handle: product.handle }}
            className="text-[var(--sea-ink)] no-underline hover:text-[var(--lagoon-deep)]"
          >
            {product.title}
          </Link>
        </h3>

        {variant === 'default' &&
          typeof product.rating === 'number' && (
            <StarRating
              value={product.rating}
              reviewCount={product.reviewCount}
              size="sm"
              showValue
            />
          )}

        <ProductPrice
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          maxPrice={product.maxPrice}
          size="sm"
        />

        {product.swatches && product.swatches.length > 0 && (
          <ul className="mt-1 flex flex-wrap gap-1.5">
            {product.swatches.map((color) => (
              <li
                key={color}
                title={color}
                aria-label={color}
                style={{ background: color }}
                className="h-3.5 w-3.5 rounded-full border border-[var(--line)]"
              />
            ))}
            {product.swatches.length > 5 && (
              <li className="text-xs text-[var(--sea-ink-soft)]">
                +{product.swatches.length - 5}
              </li>
            )}
          </ul>
        )}
      </div>
    </article>
  )
}
