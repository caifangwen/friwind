import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import * as v from 'valibot'

import { ProductGrid } from '#/components/shop/product-grid'
import { ShopImage } from '#/components/shop/shop-image'
import { getCollections, getProducts, getShop } from '#/server/shopify/catalog.functions'

/**
 * Shop landing (/shop)
 * --------------------
 * Sections, top → bottom:
 *   1. Slim hero — shop name + tagline
 *   2. Collection quick-pick strip
 *   3. Toolbar — result count + sort dropdown
 *   4. Product grid
 *
 * Sort state is held in URL search params so deep-links preserve order.
 */

const SORT_OPTIONS = [
  { value: 'BEST_SELLING', label: 'Best selling' },
  { value: 'CREATED_AT', label: 'Newest' },
  { value: 'PRICE_ASC', label: 'Price: low to high' },
  { value: 'PRICE_DESC', label: 'Price: high to low' },
  { value: 'TITLE', label: 'Alphabetical' },
] as const

type SortValue = (typeof SORT_OPTIONS)[number]['value']

const SortSearchSchema = v.object({
  sort: v.optional(v.picklist(SORT_OPTIONS.map((o) => o.value) as readonly SortValue[])),
})

function fromSortValue(value: SortValue | undefined): {
  sortKey: 'BEST_SELLING' | 'CREATED_AT' | 'PRICE' | 'TITLE'
  reverse: boolean
} {
  switch (value) {
    case 'PRICE_ASC':
      return { sortKey: 'PRICE', reverse: false }
    case 'PRICE_DESC':
      return { sortKey: 'PRICE', reverse: true }
    case 'TITLE':
      return { sortKey: 'TITLE', reverse: false }
    case 'CREATED_AT':
      return { sortKey: 'CREATED_AT', reverse: false }
    case 'BEST_SELLING':
    case undefined:
    default:
      return { sortKey: 'BEST_SELLING', reverse: false }
  }
}

export const Route = createFileRoute('/shop/')({
  validateSearch: (search) => v.parse(SortSearchSchema, search),
  loaderDeps: ({ search }) => ({ sort: search.sort }),
  loader: async ({ deps }) => {
    const { sortKey, reverse } = fromSortValue(deps.sort)
    const [shop, page, collections] = await Promise.all([
      getShop(),
      getProducts({ data: { first: 24, sortKey, reverse } }),
      getCollections(),
    ])
    return { shop, products: page.nodes, collections }
  },
  component: ShopIndex,
})

function ShopIndex() {
  const { shop, products, collections } = Route.useLoaderData()
  const search = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })

  const activeSort: SortValue = (search.sort ?? 'BEST_SELLING') as SortValue

  return (
    <div className="space-y-12">
      {/* Slim hero */}
      <header className="flex flex-col gap-3 border-b border-[var(--storefront-line)] pb-8">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--storefront-fg-muted)]">
          The shop · {new Date().getFullYear()}
        </p>
        <h1 className="text-4xl font-medium tracking-tight md:text-5xl">
          {shop.name}
        </h1>
        {shop.description && (
          <p className="max-w-2xl text-base text-[var(--storefront-fg-muted)]">
            {shop.description}
          </p>
        )}
      </header>

      {/* Collection quick-pick strip */}
      {collections.length > 0 && (
        <section aria-labelledby="quick-pick-heading">
          <h2
            id="quick-pick-heading"
            className="mb-4 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--storefront-fg-muted)]"
          >
            Browse by collection
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((collection) => (
              <QuickPickCard key={collection.id} collection={collection} />
            ))}
          </div>
        </section>
      )}

      {/* Toolbar */}
      <section>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-[var(--storefront-line)] pb-4">
          <div>
            <h2 className="text-xl font-medium tracking-tight">All products</h2>
            <p className="mt-1 text-sm text-[var(--storefront-fg-muted)]">
              Showing{' '}
              <span className="font-semibold text-[var(--storefront-fg)]">
                {products.length}
              </span>{' '}
              {products.length === 1 ? 'piece' : 'pieces'}
            </p>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <span className="text-[var(--storefront-fg-muted)]">Sort by</span>
            <select
              value={activeSort}
              onChange={(e) =>
                navigate({
                  search: { sort: e.target.value as SortValue },
                  replace: true,
                })
              }
              className="rounded-full border border-[var(--storefront-line)] bg-[var(--storefront-bg)] px-4 py-2 text-sm font-medium text-[var(--storefront-fg)] focus:border-[var(--storefront-fg)] focus:outline-none"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <ProductGrid products={products} />
      </section>
    </div>
  )
}

function QuickPickCard({
  collection,
}: {
  collection: {
    id: string
    handle: string
    title: string
    description?: string | null
    image?: { url: string; altText?: string | null } | null
  }
}) {
  return (
    <Link
      to="/shop/collections/$handle"
      params={{ handle: collection.handle }}
      className="group flex items-stretch gap-4 overflow-hidden rounded-2xl border border-[var(--storefront-line)] bg-[var(--storefront-bg)] no-underline transition hover:border-[var(--storefront-fg-muted)]"
    >
      {collection.image?.url ? (
        <ShopImage
          src={collection.image.url}
          alt={collection.image.altText ?? collection.title}
          width={240}
          height={240}
          className="h-24 w-24 flex-shrink-0 object-cover"
        />
      ) : (
        <div className="h-24 w-24 flex-shrink-0 bg-[var(--storefront-line)]" />
      )}
      <div className="flex flex-1 flex-col justify-center py-3 pr-4">
        <p className="text-sm font-semibold text-[var(--storefront-fg)]">
          {collection.title}
        </p>
        {collection.description && (
          <p className="mt-1 line-clamp-2 text-xs text-[var(--storefront-fg-muted)]">
            {collection.description}
          </p>
        )}
        <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[var(--storefront-fg-muted)] group-hover:text-[var(--storefront-fg)]">
          Shop →
        </p>
      </div>
    </Link>
  )
}
