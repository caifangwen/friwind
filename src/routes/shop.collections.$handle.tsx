import { createFileRoute, notFound, useNavigate } from '@tanstack/react-router'
import * as v from 'valibot'

import { ProductGrid } from '#/components/shop/product-grid'
import { ShopImage } from '#/components/shop/shop-image'
import { getCollection } from '#/server/shopify/catalog.functions'

/**
 * Collection page (/shop/collections/$handle)
 * ------------------------------------------
 * - Big editorial hero (collection image)
 * - Title + description + meta strip
 * - Sort + result count toolbar
 * - Product grid
 */

const SORT_OPTIONS = [
  { value: 'COLLECTION_DEFAULT', label: 'Curated' },
  { value: 'BEST_SELLING', label: 'Best selling' },
  { value: 'CREATED', label: 'Newest' },
  { value: 'PRICE_ASC', label: 'Price: low to high' },
  { value: 'PRICE_DESC', label: 'Price: high to low' },
  { value: 'TITLE', label: 'Alphabetical' },
] as const

type SortValue = (typeof SORT_OPTIONS)[number]['value']

const SortSchema = v.object({
  sort: v.optional(
    v.picklist(SORT_OPTIONS.map((o) => o.value) as readonly SortValue[]),
  ),
})

function fromSortValue(value: SortValue | undefined): {
  sortKey:
    | 'BEST_SELLING'
    | 'COLLECTION_DEFAULT'
    | 'CREATED'
    | 'PRICE'
    | 'TITLE'
  reverse: boolean
} {
  switch (value) {
    case 'PRICE_ASC':
      return { sortKey: 'PRICE', reverse: false }
    case 'PRICE_DESC':
      return { sortKey: 'PRICE', reverse: true }
    case 'TITLE':
      return { sortKey: 'TITLE', reverse: false }
    case 'CREATED':
      return { sortKey: 'CREATED', reverse: false }
    case 'BEST_SELLING':
      return { sortKey: 'BEST_SELLING', reverse: false }
    case 'COLLECTION_DEFAULT':
    case undefined:
    default:
      return { sortKey: 'COLLECTION_DEFAULT', reverse: false }
  }
}

export const Route = createFileRoute('/shop/collections/$handle')({
  validateSearch: (search) => v.parse(SortSchema, search),
  loaderDeps: ({ search }) => ({ sort: search.sort }),
  loader: async ({ params, deps }) => {
    const { sortKey, reverse } = fromSortValue(deps.sort)
    const collection = await getCollection({
      data: {
        handle: params.handle,
        first: 24,
        sortKey,
        reverse,
      },
    })
    if (!collection) throw notFound()
    return { collection }
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          {
            title:
              loaderData.collection.seo.title ?? loaderData.collection.title,
          },
          {
            name: 'description',
            content:
              loaderData.collection.seo.description ??
              loaderData.collection.description ??
              '',
          },
        ]
      : [],
  }),
  component: CollectionRoute,
})

function CollectionRoute() {
  const { collection } = Route.useLoaderData()
  const search = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })

  const activeSort: SortValue = (search.sort ?? 'COLLECTION_DEFAULT') as SortValue
  const products = collection.products.nodes

  return (
    <div className="space-y-10">
      {/* Hero */}
      <header className="space-y-6">
        {collection.image && (
          <div
            className="overflow-hidden rounded-2xl bg-[var(--storefront-line)]"
            style={{ aspectRatio: '16 / 6', maxHeight: '420px' }}
          >
            <ShopImage
              src={collection.image.url}
              alt={collection.image.altText ?? collection.title}
              width={1600}
              height={600}
              loading="eager"
              sizes="100vw"
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="space-y-3">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--storefront-fg-muted)]">
            Collection · {products.length} {products.length === 1 ? 'piece' : 'pieces'}
          </p>
          <h1 className="text-3xl font-medium tracking-tight md:text-5xl">
            {collection.title}
          </h1>
          {collection.description && (
            <p className="max-w-2xl text-base text-[var(--storefront-fg-muted)]">
              {collection.description}
            </p>
          )}
        </div>
      </header>

      {/* Toolbar */}
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--storefront-line)] pb-4">
        <p className="text-sm text-[var(--storefront-fg-muted)]">
          Showing{' '}
          <span className="font-semibold text-[var(--storefront-fg)]">
            {products.length}
          </span>{' '}
          {products.length === 1 ? 'piece' : 'pieces'}
        </p>
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
    </div>
  )
}
