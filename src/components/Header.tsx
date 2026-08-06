import { Link } from '@tanstack/react-router'
import ShopifyHeaderCart from '../integrations/shopify/header-cart.tsx'
import ThemeToggle from './ThemeToggle'

/**
 * Header
 * ------
 * Minimal site chrome ——
 *  - Full-bleed, sits in the same document flow as the content (no boxed shell)
 *  - No backdrop-blur, no border, no shadow
 *  - On scroll, a 1px hairline fades in below to anchor position (CSS scroll detection)
 *  - Logo is oversized plain wordmark; nav is small + spacious;
 *  - Right-side actions are sparse small icons (no boxed buttons)
 */
export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        {/* Logo — oversized plain wordmark, no border, no radius */}
        <Link to="/" className="site-logo" aria-label="Back to homepage">
          <span className="site-logo__mark">▲</span>
          <span className="site-logo__word">Northwind</span>
        </Link>

        {/* Primary nav — spacious small labels */}
        <nav className="site-nav" aria-label="Primary navigation">
          <Link
            to="/shop"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            Shop
          </Link>
          <Link
            to="/about"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            About
          </Link>
          <Link
            to="/components"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            UI Kit
          </Link>
          <a
            href="https://tanstack.com/start/latest/docs/framework/react/overview"
            className="nav-link"
            target="_blank"
            rel="noreferrer"
          >
            Docs
          </a>
        </nav>

        {/* Right-side actions — sparse, no boxed backgrounds */}
        <div className="site-actions">
          <a
            href="https://github.com/TanStack"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="site-icon"
          >
            <svg viewBox="0 0 16 16" aria-hidden="true" width="20" height="20">
              <path
                fill="currentColor"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
          </a>
          <ShopifyHeaderCart />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
