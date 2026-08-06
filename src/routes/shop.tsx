import { Link, Outlet, createFileRoute, useRouterState } from '@tanstack/react-router'

import '#/components/shop/shop.css'
import { getCollections } from '#/server/shopify/catalog.functions'

/**
 * Shop layout
 * -----------
 * Slim breadcrumb header + responsive sidebar navigation.
 * The global header already exposes Shop / Cart / Theme — so we
 * intentionally do not duplicate them here.
 *
 * Mobile: sidebar collapses into a horizontally-scrollable pill strip.
 * Desktop (>= lg): sticky sidebar nav with active collection highlighted.
 */

export const Route = createFileRoute('/shop')({
  loader: () => getCollections(),
  component: ShopLayout,
})

function ShopLayout() {
  const collections = Route.useLoaderData()
  const matchPathname = useRouterState({
    select: (s) => s.location.pathname,
  })
  // Detect if we are *inside* a collection so we can highlight its sidebar entry.
  const activeHandle = matchCollectionHandle(matchPathname)

  return (
    <div className="shop-root min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        {/* Top — slim breadcrumb + secondary actions */}
        <ShopBreadcrumb />

        <div className="mt-6 grid gap-10 lg:mt-10 lg:grid-cols-[220px_1fr] lg:gap-12">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <ShopSidebar
              collections={collections}
              activeHandle={activeHandle}
            />
          </aside>

          {/* Mobile — horizontal pill strip */}
          <ShopCollectionPills
            collections={collections}
            activeHandle={activeHandle}
          />

          <main className="min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Breadcrumb                                                                  */
/* -------------------------------------------------------------------------- */

function ShopBreadcrumb() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  // Map pathname -> [{label, to}]. Decide path based on where we are.
  const trail = useShopTrail(pathname)

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--storefront-line)] pb-4"
    >
      <ol className="flex items-center gap-1.5 text-sm">
        <li>
          <Link
            to="/"
            className="text-[var(--storefront-fg-muted)] no-underline hover:text-[var(--storefront-fg)]"
          >
            Home
          </Link>
        </li>
        {trail.map((crumb, i) => (
          <li key={crumb.to} className="flex items-center gap-1.5">
            <span aria-hidden="true" className="text-[var(--storefront-fg-muted)]">
              /
            </span>
            {i === trail.length - 1 ? (
              <span className="font-medium text-[var(--storefront-fg)]">
                {crumb.label}
              </span>
            ) : (
              <Link
                to={crumb.to}
                className="text-[var(--storefront-fg-muted)] no-underline hover:text-[var(--storefront-fg)]"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>

      <div className="flex items-center gap-4 text-sm">
        <Link
          to="/shop/search"
          search={{ q: '' }}
          className="text-[var(--storefront-fg-muted)] no-underline hover:text-[var(--storefront-fg)]"
        >
          Search
        </Link>
      </div>
    </nav>
  )
}

function useShopTrail(pathname: string) {
  const trail: Array<{ label: string; to: string }> = []
  if (pathname === '/shop') {
    trail.push({ label: 'Shop', to: '/shop' })
  } else if (pathname.startsWith('/shop/collections/')) {
    trail.push({ label: 'Shop', to: '/shop' })
    const handle = pathname.split('/shop/collections/')[1]?.split('/')[0] ?? ''
    trail.push({
      label: toTitleCase(handle),
      to: `/shop/collections/${handle}` as '/shop/collections/$handle',
    })
  } else if (pathname.startsWith('/shop/products/')) {
    trail.push({ label: 'Shop', to: '/shop' })
    trail.push({ label: 'Product', to: pathname as never })
  } else if (pathname === '/shop/cart') {
    trail.push({ label: 'Shop', to: '/shop' })
    trail.push({ label: 'Cart', to: '/shop/cart' })
  } else if (pathname === '/shop/search') {
    trail.push({ label: 'Shop', to: '/shop' })
    trail.push({ label: 'Search', to: '/shop/search' })
  } else if (pathname.startsWith('/shop/pages/')) {
    trail.push({ label: 'Shop', to: '/shop' })
    const handle = pathname.split('/shop/pages/')[1]?.split('/')[0] ?? ''
    trail.push({
      label: toTitleCase(handle),
      to: pathname as never,
    })
  } else if (pathname.startsWith('/shop/policies/')) {
    trail.push({ label: 'Shop', to: '/shop' })
    const handle = pathname.split('/shop/policies/')[1]?.split('/')[0] ?? ''
    trail.push({
      label: toTitleCase(handle),
      to: pathname as never,
    })
  }
  return trail
}

function matchCollectionHandle(pathname: string): string | null {
  const m = pathname.match(/^\/shop\/collections\/([^/]+)/)
  return m ? (m[1] ?? null) : null
}

function toTitleCase(slug: string): string {
  return slug
    .split('-')
    .map((s) => (s ? s[0]!.toUpperCase() + s.slice(1) : s))
    .join(' ')
}

/* -------------------------------------------------------------------------- */
/*  Desktop sidebar — refined collection list                                   */
/* -------------------------------------------------------------------------- */

type CollectionSummary = {
  id: string
  handle: string
  title: string
  description?: string | null
  image?: { url: string; altText?: string | null } | null
}

function ShopSidebar({
  collections,
  activeHandle,
}: {
  collections: ReadonlyArray<CollectionSummary>
  activeHandle: string | null
}) {
  return (
    <div className="sticky top-6 flex flex-col gap-6">
      <div>
        <p className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--storefront-fg-muted)]">
          Browse
        </p>
        <nav className="flex flex-col">
          <SidebarLink to="/shop" exact label="Everything" />
          <div className="my-3 h-px bg-[var(--storefront-line)]" />
          <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--storefront-fg-muted)]">
            Collections
          </p>
          {collections.map((collection) => (
            <SidebarLink
              key={collection.id}
              to="/shop/collections/$handle"
              params={{ handle: collection.handle }}
              label={collection.title}
              isActive={activeHandle === collection.handle}
            />
          ))}
        </nav>
      </div>

      <div
        className="rounded-2xl border border-[var(--storefront-line)] p-4"
        style={{ background: 'var(--storefront-bg)' }}
      >
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--storefront-fg-muted)]">
          Help
        </p>
        <p className="mt-2 text-sm text-[var(--storefront-fg)]">
          Need a hand? Our studio replies within a day.
        </p>
        <Link
          to="/shop/pages/$handle"
          params={{ handle: 'contact' }}
          className="mt-3 inline-block text-sm font-medium text-[var(--storefront-fg)] underline underline-offset-4"
        >
          Contact us →
        </Link>
      </div>
    </div>
  )
}

function SidebarLink(props: {
  to: '/shop' | '/shop/collections/$handle'
  params?: { handle: string }
  label: string
  isActive?: boolean
  exact?: boolean
}) {
  const linkClass =
    'flex items-center justify-between rounded-md px-3 py-2 text-sm no-underline transition-colors'
  const activeClass = 'bg-[var(--storefront-fg)] text-[var(--storefront-bg)] font-medium'
  const idleClass =
    'text-[var(--storefront-fg-muted)] hover:bg-[var(--storefront-line)]/40 hover:text-[var(--storefront-fg)]'

  return (
    <Link
      to={props.to}
      params={props.params}
      activeOptions={
        props.exact
          ? { exact: true }
          : props.to === '/shop/collections/$handle'
            ? { exact: false }
            : { exact: true }
      }
      activeProps={{ className: `${linkClass} ${activeClass}` }}
      className={`${linkClass} ${idleClass}`}
    >
      <span>{props.label}</span>
    </Link>
  )
}

/* -------------------------------------------------------------------------- */
/*  Mobile — horizontally scrollable collection pills                          */
/* -------------------------------------------------------------------------- */

function ShopCollectionPills({
  collections,
  activeHandle,
}: {
  collections: ReadonlyArray<CollectionSummary>
  activeHandle: string | null
}) {
  return (
    <nav
      aria-label="Collections"
      className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      <PillLink to="/shop" exact label="All" />
      {collections.map((c) => (
        <PillLink
          key={c.id}
          to="/shop/collections/$handle"
          params={{ handle: c.handle }}
          label={c.title}
          isActive={activeHandle === c.handle}
        />
      ))}
    </nav>
  )
}

function PillLink(props: {
  to: '/shop' | '/shop/collections/$handle'
  params?: { handle: string }
  label: string
  isActive?: boolean
  exact?: boolean
}) {
  const base =
    'inline-flex flex-shrink-0 items-center rounded-full border px-4 py-2 text-sm font-medium no-underline transition-colors'
  return (
    <Link
      to={props.to}
      params={props.params}
      activeOptions={{ exact: props.exact ?? false }}
      activeProps={{
        className: `${base} border-[var(--storefront-fg)] bg-[var(--storefront-fg)] text-[var(--storefront-bg)]`,
      }}
      className={`${base} border-[var(--storefront-line)] bg-[var(--storefront-bg)] text-[var(--storefront-fg)]`}
    >
      {props.label}
    </Link>
  )
}
