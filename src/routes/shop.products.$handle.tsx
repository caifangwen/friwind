import { useState } from 'react'
import { createFileRoute, notFound } from '@tanstack/react-router'

import { AddToCartButton } from '#/components/shop/add-to-cart-button'
import { Money } from '#/components/shop/money'
import { ShopImage } from '#/components/shop/shop-image'
import {
  VariantSelector,
  defaultSelectedOptions,
  findVariant,
} from '#/components/shop/variant-selector'
import { getProduct } from '#/server/shopify/catalog.functions'

/**
 * Product detail (/shop/products/$handle)
 * ----------------------------------------
 * Layout:
 *   [breadcrumb shown via parent shop.tsx]
 *   ── left: image gallery (click thumb to swap hero)
 *   ── right: sticky buy box (vendor · title · price · variants · add-to-cart · trust row)
 *   ── bottom: long description block
 */

export const Route = createFileRoute('/shop/products/$handle')({
  loader: async ({ params }) => {
    const product = await getProduct({ data: { handle: params.handle } })
    if (!product) throw notFound()
    return { product }
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: loaderData.product.seo.title ?? loaderData.product.title },
          loaderData.product.seo.description
            ? {
                name: 'description',
                content: loaderData.product.seo.description,
              }
            : { name: 'description', content: '' },
        ]
      : [],
  }),
  component: ProductDetailRoute,
})

function ProductDetailRoute() {
  const { product } = Route.useLoaderData()
  const [selected, setSelected] = useState(() =>
    defaultSelectedOptions(product),
  )
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const variant = findVariant(product.variants.nodes, selected)

  // Variant image (if it has its own) wins over the all-images list.
  const variantImageIndex = variant?.image
    ? product.images.nodes.findIndex(
        (img) => img.url === variant.image?.url,
      )
    : -1

  const fallbackImage = product.images.nodes[0] ?? null
  const activeImage =
    activeImageIndex === 0 && variantImageIndex > 0 && variant?.image
      ? variant.image
      : product.images.nodes[activeImageIndex] ?? fallbackImage

  const onVariantChange = (next: Record<string, string>) => {
    setSelected(next)
    // When the new variant has its own image, focus it.
    const nextVariant = findVariant(product.variants.nodes, next)
    if (nextVariant?.image) {
      const idx = product.images.nodes.findIndex(
        (img) => img.url === nextVariant.image?.url,
      )
      if (idx >= 0) setActiveImageIndex(idx)
    }
  }

  return (
    <article className="space-y-12">
      {/* Top — gallery + buy box */}
      <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        {/* Gallery */}
        <div className="flex flex-col gap-3">
          <div
            className="relative overflow-hidden rounded-2xl bg-[var(--storefront-line)]"
            style={{ aspectRatio: '4 / 5' }}
          >
            {activeImage && (
              <ShopImage
                src={activeImage.url}
                alt={activeImage.altText ?? product.title}
                width={1000}
                height={1250}
                loading="eager"
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="h-full w-full object-cover transition-opacity duration-300"
              />
            )}
          </div>

          {product.images.nodes.length > 1 && (
            <div
              role="tablist"
              aria-label="Product images"
              className="grid grid-cols-5 gap-2 sm:grid-cols-6 lg:grid-cols-5"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeImageIndex === 0}
                onClick={() => setActiveImageIndex(0)}
                className={[
                  'aspect-square overflow-hidden rounded-md border-2 transition',
                  activeImageIndex === 0
                    ? 'border-[var(--storefront-fg)]'
                    : 'border-transparent hover:border-[var(--storefront-line)]',
                ].join(' ')}
              >
                {fallbackImage && (
                  <ShopImage
                    src={fallbackImage.url}
                    alt={fallbackImage.altText ?? product.title}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                )}
              </button>
              {product.images.nodes.slice(1).map((img, idx) => {
                const i = idx + 1
                const isActive = activeImageIndex === i
                return (
                  <button
                    key={img.url}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveImageIndex(i)}
                    className={[
                      'aspect-square overflow-hidden rounded-md border-2 transition',
                      isActive
                        ? 'border-[var(--storefront-fg)]'
                        : 'border-transparent hover:border-[var(--storefront-line)]',
                    ].join(' ')}
                  >
                    <ShopImage
                      src={img.url}
                      alt={img.altText ?? product.title}
                      width={200}
                      height={200}
                      className="h-full w-full object-cover"
                    />
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Buy box */}
        <div className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
          <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
            {product.title}
          </h1>

          {variant && (
            <p className="flex items-baseline gap-3 text-2xl font-medium">
              <Money
                amount={variant.price.amount}
                currencyCode={variant.price.currencyCode}
              />
              {!variant.availableForSale && (
                <span className="text-sm font-normal text-[var(--storefront-fg-muted)]">
                  · Sold out
                </span>
              )}
            </p>
          )}

          <VariantSelector
            product={product}
            selectedOptions={selected}
            onChange={onVariantChange}
          />

          <AddToCartButton product={product} variant={variant} />

          <TrustRow />
        </div>
      </div>

      {/* Long description */}
      {product.descriptionHtml && (
        <section
          aria-labelledby="product-description-heading"
          className="border-t border-[var(--storefront-line)] pt-10"
        >
          <h2
            id="product-description-heading"
            className="mb-4 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--storefront-fg-muted)]"
          >
            About this piece
          </h2>
          <div
            className="shop-prose"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
        </section>
      )}
    </article>
  )
}

/* -------------------------------------------------------------------------- */
/*  Trust signals row                                                           */
/* -------------------------------------------------------------------------- */

function TrustRow() {
  return (
    <ul className="mt-2 grid grid-cols-1 gap-2 border-t border-[var(--storefront-line)] pt-5 text-sm text-[var(--storefront-fg-muted)] sm:grid-cols-3">
      <li className="flex items-center gap-2">
        <TrustIcon kind="truck" />
        Free shipping over ¥500
      </li>
      <li className="flex items-center gap-2">
        <TrustIcon kind="return" />
        30-day easy returns
      </li>
      <li className="flex items-center gap-2">
        <TrustIcon kind="hand" />
        Hand-finished in small batches
      </li>
    </ul>
  )
}

function TrustIcon({ kind }: { kind: 'truck' | 'return' | 'hand' }) {
  return (
    <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[var(--storefront-line)] text-[var(--storefront-fg)]">
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {kind === 'truck' && (
          <>
            <path d="M3 7h11v10H3z" />
            <path d="M14 10h4l3 3v4h-7" />
            <circle cx="7" cy="18" r="1.5" />
            <circle cx="17" cy="18" r="1.5" />
          </>
        )}
        {kind === 'return' && (
          <>
            <path d="M4 12a8 8 0 0 1 14-5l3-3v6h-6" />
            <path d="M20 12a8 8 0 0 1-14 5l-3 3v-6h6" />
          </>
        )}
        {kind === 'hand' && (
          <>
            <path d="M6 14V8a2 2 0 0 1 4 0v4" />
            <path d="M10 12V6a2 2 0 0 1 4 0v6" />
            <path d="M14 12V8a2 2 0 0 1 4 0v8a6 6 0 0 1-12 0v-2" />
          </>
        )}
      </svg>
    </span>
  )
}
