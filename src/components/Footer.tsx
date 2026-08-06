import { Link } from '@tanstack/react-router'

/**
 * Footer
 * ------
 * Light-weight mega footer ——
 *  - Shares the body palette + a top hairline divider
 *  - Top: 4 columns of links + an oversized brand wordmark
 *  - Bottom: hairline meta row
 * Reads as a sign-off, not an ending.
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        {/* Top — 4 columns + oversized brand wordmark */}
        <div className="site-footer__grid">
          <FooterColumn
            title="Shop"
            links={[
              { label: 'Everything', to: '/shop' },
              { label: 'Knitwear', to: '/shop/collections/knitwear' },
              { label: 'Ceramics', to: '/shop/collections/ceramics' },
              { label: 'Bags', to: '/shop/collections/bags' },
              { label: 'Gift cards', to: '/shop' },
            ]}
          />
          <FooterColumn
            title="Studio"
            links={[
              { label: 'About', to: '/about' },
              { label: 'UI Kit', to: '/components' },
              { label: 'Materials', to: '/shop/pages/materials' },
              { label: 'Journal', to: '/shop/pages/journal' },
            ]}
          />
          <FooterColumn
            title="Support"
            links={[
              { label: 'Contact', to: '/shop/pages/contact' },
              { label: 'Shipping', to: '/shop/policies/shipping-policy' },
              { label: 'Returns', to: '/shop/policies/refund-policy' },
              { label: 'FAQ', to: '/shop/pages/faq' },
            ]}
          />
          <div className="site-footer__newsletter">
            <p className="site-footer__column-title">Newsletter</p>
            <p className="site-footer__copy">
              One letter a month — new arrivals, workshop notes, occasional
              sales. No advertising, no tracking pixels.
            </p>
            <form
              className="site-footer__form"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="you@example.com"
                aria-label="Email"
                className="site-footer__input"
              />
              <button type="submit" className="site-footer__submit">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Middle — oversized brand wordmark */}
        <div className="site-footer__wordmark" aria-hidden="true">
          NORTHWIND
        </div>

        {/* Bottom — hairline meta */}
        <div className="site-footer__meta">
          <p className="m-0">© {year} Northwind Goods Co. All rights reserved.</p>
          <p className="m-0 site-footer__credit">
            Built with TanStack Start
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: ReadonlyArray<{ label: string; to: string }>
}) {
  return (
    <div className="site-footer__column">
      <p className="site-footer__column-title">{title}</p>
      <ul className="site-footer__links">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="site-footer__link">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
