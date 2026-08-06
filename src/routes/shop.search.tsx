import { useState } from 'react'
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import * as v from 'valibot'

import { ProductGrid } from '#/components/shop/product-grid'
import { getCollections } from '#/server/shopify/catalog.functions'
import { searchProducts } from '#/server/shopify/catalog.functions'

/**
 * Search (/shop/search)
 * ---------------------
 * Two states:
 *   - Empty / no query — show "Popular searches" hints + a list of
 *     collections to browse as a starting point.
 *   - With results — search input + result count + product grid.
 *
 * Query is held in URL search params so deep-links preserve state.
 */

const POPULAR_QUERIES = [
  'cashmere',
  'ceramic',
  'leather',
  'wool',
  'cotton',
  'mug',
  'scarf',
] as const

const SearchSchema = v.object({
  q: v.optional(v.string(), ''),
})

export const Route = createFileRoute('/shop/search')({
  validateSearch: (search) => v.parse(SearchSchema, search),
  loaderDeps: ({ search }) => ({ q: search.q }),
  loader: async ({ deps }) => {
    if (!deps.q.trim()) {
      const collections = await getCollections()
      return {
        q: '',
        products: [] as Awaited<ReturnType<typeof searchProducts>>['products'],
        totalCount: 0,
        collections,
      }
    }
    const result = await searchProducts({
      data: { query: deps.q.trim(), first: 24 },
    })
    const collections = await getCollections()
    return {
      q: deps.q,
      products: result.products,
      totalCount: result.totalCount,
      collections,
    }
  },
  component: SearchRoute,
})

function SearchRoute() {
  const { q, products, totalCount, collections } = Route.useLoaderData()
  const navigate = useNavigate({ from: Route.fullPath })
  const [draft, setDraft] = useState(q)

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="space-y-3">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--storefront-fg-muted)]">
          Find something
        </p>
        <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
          Search
        </h1>
      </header>

      {/* Search form */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          navigate({ search: { q: draft } })
        }}
        className="flex gap-2"
      >
        <input
          type="search"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Search products (e.g. cashmere, ceramic)"
          autoFocus={!q}
          className="min-w-0 flex-1 rounded-full border border-[var(--storefront-line)] bg-transparent px-5 py-3 text-base focus:border-[var(--storefront-fg)] focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-full bg-[var(--storefront-fg)] px-6 py-3 text-sm font-medium text-[var(--storefront-bg)] transition hover:opacity-90"
        >
          Search
        </button>
      </form>

      {/* Results */}
      {q.trim() ? (
        <section className="space-y-6">
          <p className="text-sm text-[var(--storefront-fg-muted)]">
            {totalCount === 0
              ? 'No matches for'
              : `${totalCount} ${totalCount === 1 ? 'result' : 'results'} for`}{' '}
            <span className="font-semibold text-[var(--storefront-fg)]">
              “{q}”
            </span>
          </p>
          <ProductGrid products={products} />
        </section>
      ) : (
        /* Empty state — popular + collections */
        <EmptyState collections={collections} />
      )}
    </div>
  )
}

function EmptyState({
  collections,
}: {
  collections: ReadonlyArray<{
    id: string
    handle: string
    title: string
    description?: string | null
  }>
}) {
  return (
    <section className="space-y-10">
      <div>
        <h2 className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--storefront-fg-muted)]">
          Popular searches
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {POPULAR_QUERIES.map((term) => (
            <SearchSuggestion key={term} term={term} />
          ))}
        </div>
      </div>

      {collections.length > 0 && (
        <div>
          <h2 className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--storefront-fg-muted)]">
            Or browse by collection
          </h2>
          <ul className="mt-4 divide-y divide-[var(--storefront-line)] rounded-2xl border border-[var(--storefront-line)]">
            {collections.map((c) => (
              <li key={c.id}>
                <Link
                  to="/shop/collections/$handle"
                  params={{ handle: c.handle }}
                  className="flex items-center justify-between px-5 py-4 no-underline transition hover:bg-[var(--storefront-line)]/30"
                >
                  <div>
                    <p className="text-sm font-medium text-[var(--storefront-fg)]">
                      {c.title}
                    </p>
                    {c.description && (
                      <p className="mt-1 line-clamp-1 text-xs text-[var(--storefront-fg-muted)]">
                        {c.description}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-[var(--storefront-fg-muted)]">
                    Browse →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

function SearchSuggestion({ term }: { term: string }) {
  // Suggestions navigate the user to the actual /shop/search page with the
  // query preset in URL state — preserves the deep-linkable route.
  return (
    <Link
      to="/shop/search"
      search={{ q: term }}
      className="rounded-full border border-[var(--storefront-line)] px-4 py-2 text-sm no-underline text-[var(--storefront-fg)] transition hover:border-[var(--storefront-fg)] hover:bg-[var(--storefront-fg)] hover:text-[var(--storefront-bg)]"
    >
      {term}
    </Link>
  )
}
