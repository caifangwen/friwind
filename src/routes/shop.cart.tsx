import { createFileRoute } from '@tanstack/react-router'

import { CartLineItem } from '#/components/shop/cart-line-item'
import { CartSummary } from '#/components/shop/cart-summary'
import { EmptyState } from '#/components/shop/empty-state'
import { CART_QUERY_KEY, useCart } from '#/hooks/use-cart'
import { getCart } from '#/server/shopify/cart.functions'

export const Route = createFileRoute('/shop/cart')({
  // QueryClient is always in context — the Shopify add-on depends on tanstack-query.
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({
      queryKey: CART_QUERY_KEY,
      queryFn: () => getCart(),
    }),
  component: CartRoute,
})

function CartRoute() {
  const { cart } = useCart()

  if (!cart || cart.lines.nodes.length === 0) {
    return (
      <div className="space-y-8">
        <header>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--storefront-fg-muted)]">
            Your bag
          </p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight md:text-4xl">
            Your cart is empty
          </h1>
        </header>
        <EmptyState
          title="Nothing here yet"
          description="Looks like you haven't added anything yet. Browse the shop to find something you'll love."
          cta={{ label: 'Browse the shop', to: '/shop' }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <header>
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--storefront-fg-muted)]">
          Your bag · {cart.totalQuantity}{' '}
          {cart.totalQuantity === 1 ? 'piece' : 'pieces'}
        </p>
        <h1 className="mt-2 text-3xl font-medium tracking-tight md:text-4xl">
          Cart
        </h1>
      </header>
      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <section>
          <ul className="border-t border-[var(--storefront-line)]">
            {cart.lines.nodes.map((line) => (
              <CartLineItem key={line.id} line={line} />
            ))}
          </ul>
        </section>
        <CartSummary cart={cart} />
      </div>
    </div>
  )
}
