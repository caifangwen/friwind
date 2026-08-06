import { createFileRoute, Link } from '@tanstack/react-router'

import { CategoryCard, ProductCard } from '#/components/ui'
import type { ProductItem } from '#/components/ui/product/types'

/**
 * Homepage
 * ---------
 * Editorial full-viewport hero as the first screen, followed by:
 *   - Featured products strip
 *   - Process (Discover → Source → Make → Deliver)
 *   - Shop by category
 *   - A note from the studio + CTA
 * Design language stays consistent with the existing
 * `kegani-*` + UI kit tokens (--sea-ink / --lagoon / --sand).
 */

export const Route = createFileRoute('/')({ component: Home })

/** Unsplash editorial placeholder for the hero — swap with real assets later. */
const HERO_IMAGE = {
  src: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&h=1900&fit=crop&q=80',
  alt: 'Yarn-dyed cashmere, folded on a workshop table',
}

/** Featured product strip — reuses the showcase-page sample for visual continuity. */
const FEATURED: ReadonlyArray<ProductItem> = [
  {
    id: 'f1',
    handle: 'aurora-cashmere',
    title: 'Aurora Cashmere Scarf',
    vendor: 'NORTHWIND',
    image: {
      src: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=900&h=1125&fit=crop',
      alt: 'Aurora Cashmere Scarf',
    },
    price: { amount: 1280, currencyCode: 'CNY' },
    compareAtPrice: { amount: 1580, currencyCode: 'CNY' },
    rating: 4.6,
    reviewCount: 128,
    badge: 'sale',
    swatches: ['#d6c1a0', '#3b3024', '#a8392f', '#2c4a3a'],
  },
  {
    id: 'f2',
    handle: 'tideline-tote',
    title: 'Tideline Canvas Tote',
    vendor: 'HARBOR & OAK',
    image: {
      src: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=900&h=1125&fit=crop',
      alt: 'Tideline Canvas Tote',
    },
    price: { amount: 580, currencyCode: 'CNY' },
    rating: 4.8,
    reviewCount: 42,
    badge: 'new',
    swatches: ['#e5e1d8', '#1a1a1a'],
  },
  {
    id: 'f3',
    handle: 'kettle-ceramic',
    title: 'Handthrown Ceramic Teapot',
    vendor: 'STONEFIELD',
    image: {
      src: 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=900&h=1125&fit=crop',
      alt: 'Handthrown Ceramic Teapot',
    },
    price: { amount: 360, currencyCode: 'CNY' },
    rating: 4.2,
    reviewCount: 67,
    badge: 'limited',
  },
  {
    id: 'f4',
    handle: 'cedar-tee',
    title: 'Cedar Long-Staple Cotton Tee',
    vendor: 'NORTHWIND',
    image: {
      src: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&h=1125&fit=crop',
      alt: 'Cedar Long-Staple Cotton Tee',
    },
    price: { amount: 199, currencyCode: 'CNY' },
    rating: 4.9,
    reviewCount: 312,
    badge: 'hot',
    swatches: ['#fff', '#1a1a1a', '#a8392f', '#2c4a3a', '#cfa45f', '#1c5a7a'],
  },
]

const CATEGORIES = [
  {
    title: 'Knitwear',
    subtitle: 'Wool · Cashmere · Cotton',
    image: {
      src: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&h=1200&fit=crop',
      alt: 'Knitwear',
    },
    href: '/shop/collections/knitwear',
    productCount: 24,
  },
  {
    title: 'Ceramics',
    subtitle: 'Stoneware · Porcelain',
    image: {
      src: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=1200&fit=crop',
      alt: 'Ceramics',
    },
    href: '/shop/collections/ceramics',
    productCount: 18,
  },
  {
    title: 'Bags',
    subtitle: 'Canvas · Leather',
    image: {
      src: 'https://images.unsplash.com/photo-1559563458-527698bf5295?w=1200&h=1200&fit=crop',
      alt: 'Bags',
    },
    href: '/shop/collections/bags',
    productCount: 32,
  },
]

const PROCESS = [
  {
    n: '01',
    title: 'Discover',
    copy: 'Two-week in-studio visit. We sketch, take fabric swatches, and lock the brief with you.',
  },
  {
    n: '02',
    title: 'Source',
    copy: 'Raw materials from independent mills we have worked with for years. Every swatch signed off.',
  },
  {
    n: '03',
    title: 'Make',
    copy: 'Small-batch production with vetted partner workshops in Japan, Portugal, and Inner Mongolia.',
  },
  {
    n: '04',
    title: 'Deliver',
    copy: 'Hand-finished, individually inspected, packed in our own boxes. Photographed before shipment.',
  },
]

function Home() {
  return (
    <>
      <ScreenHero />
      <FeaturedSection products={FEATURED} />
      <ProcessSection steps={PROCESS} />
      <CategoriesSection categories={CATEGORIES} />
      <EditorialNote />
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*  Full-viewport hero (first screen)                                          */
/* -------------------------------------------------------------------------- */

function ScreenHero() {
  return (
    <section className="screen-hero" aria-label="Homepage hero">
      <span className="screen-hero__index" aria-hidden="true">
        Northwind — Index / 2026
      </span>

      <div className="screen-hero__inner">
        <div className="screen-hero__content rise-in">
          <p className="screen-hero__eyebrow">Spring Drop — 2026</p>
          <h1 className="screen-hero__title">
            Built to <em>last</em>,<br />
            sold to be loved.
          </h1>
          <p className="screen-hero__copy">
            Northwind is a small studio building everyday objects from honest
            materials — wool, clay, leather, cotton — sourced from independent
            makers across Japan, Portugal, and Inner Mongolia.
          </p>
          <div className="screen-hero__actions">
            <Link to="/shop" className="button-primary">
              Shop the collection
            </Link>
            <Link to="/about" className="button-secondary">
              Visit the workshop
            </Link>
          </div>
        </div>

        <div className="screen-hero__media">
          <img src={HERO_IMAGE.src} alt={HERO_IMAGE.alt} loading="eager" />
          <div className="screen-hero__caption">
            <span className="screen-hero__caption-num">01</span>
            <span className="screen-hero__caption-meta">
              Yarn-Dyed Cashmere
              <span>Inner Mongolia · Spring 2026</span>
            </span>
          </div>
        </div>
      </div>

      <div className="screen-hero__strip">
        <div className="screen-hero__strip-inner">
          <div className="screen-hero__kpis">
            <span>
              <b>12</b>Collections
            </span>
            <span>
              <b>4</b>Partner workshops
            </span>
            <span>
              <b>1,200+</b>Pieces in stock
            </span>
          </div>
          <Link
            to="/shop"
            hash="featured"
            className="screen-hero__scroll"
            aria-label="Scroll down to explore"
          >
            Scroll to explore
            <span className="screen-hero__scroll-line" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Featured products — 4-column grid                                          */
/* -------------------------------------------------------------------------- */

function FeaturedSection({ products }: { products: ReadonlyArray<ProductItem> }) {
  return (
    <section
      id="featured"
      className="kegani-section kegani-section--white"
      aria-labelledby="featured-heading"
    >
      <div className="page-wrap">
        <header className="kegani-section__head mb-12">
          <div>
            <p className="section-kicker">Featured — 04 hand-picked pieces</p>
            <h2 id="featured-heading" className="section-title mt-3">
              A few good things<br />
              to wear this season.
            </h2>
          </div>
          <p className="section-copy">
            A small monthly drop. Every piece is hand-finished by our partner
            workshops — limited runs, no restocks.
          </p>
        </header>

        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link to="/shop" className="button-secondary">
            See all 1,200+ pieces
          </Link>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Process — reuses the existing `.process-list` block styling                */
/* -------------------------------------------------------------------------- */

function ProcessSection({
  steps,
}: {
  steps: ReadonlyArray<{ n: string; title: string; copy: string }>
}) {
  return (
    <section className="kegani-section" aria-labelledby="process-heading">
      <div className="page-wrap">
        <header className="kegani-section__head mb-10">
          <div>
            <p className="section-kicker">Our Process — From sketch to parcel</p>
            <h2 id="process-heading" className="section-title mt-3">
              One object,<br />
              from idea to parcel.
            </h2>
          </div>
          <p className="section-copy">
            We don't do mass production, we don't do speculative stock.
            Time goes into material, fit, and feel — so each piece is worth
            keeping for years.
          </p>
        </header>

        <ol className="process-list m-0 list-none p-0">
          {steps.map((s) => (
            <li className="process-item" key={s.n}>
              <span className="process-item__number">{s.n}</span>
              <h3 className="process-item__title">{s.title}</h3>
              <p className="process-item__copy">{s.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Shop by category — service-grid + CategoryCard                             */
/* -------------------------------------------------------------------------- */

function CategoriesSection({
  categories,
}: {
  categories: ReadonlyArray<{
    title: string
    subtitle: string
    image: { src: string; alt: string }
    href: string
    productCount: number
  }>
}) {
  return (
    <section
      className="kegani-section kegani-section--white"
      aria-labelledby="categories-heading"
    >
      <div className="page-wrap">
        <header className="kegani-section__head mb-10">
          <div>
            <p className="section-kicker">Shop by category</p>
            <h2 id="categories-heading" className="section-title mt-3">
              Three product lines,<br />
              built to last.
            </h2>
          </div>
          <p className="section-copy">
            Each category has been made by the same workshop for more than
            three years — consistent craft, consistent materials,
            consistent responsibility.
          </p>
        </header>

        <div className="service-grid">
          {categories.map((c) => (
            <CategoryCard
              key={c.title}
              title={c.title}
              subtitle={c.subtitle}
              image={c.image}
              href={c.href}
              productCount={c.productCount}
              shape="square"
              className="service-card"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Editorial closer — studio note + double CTA                                */
/* -------------------------------------------------------------------------- */

function EditorialNote() {
  return (
    <section
      className="kegani-section"
      style={{ background: 'var(--sand)' }}
      aria-labelledby="editorial-heading"
    >
      <div className="page-wrap grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="section-kicker">A note from the studio</p>
          <h2
            id="editorial-heading"
            className="section-title mt-3"
            style={{ maxWidth: '18ch' }}
          >
            “We don't sell fast, we sell well.”
          </h2>
          <p className="section-copy mt-6">
            Since founding in 2017, we have done only three things: source
            honest materials, work with the right partners, and make each
            piece good enough that we'd keep one ourselves. There is more
            to come next season — but the pace won't change.
          </p>
        </div>

        <div className="flex flex-col gap-3 lg:items-end">
          <Link to="/about" className="button-primary">
            Visit the workshop
          </Link>
          <Link to="/components" className="button-secondary">
            Browse the UI kit
          </Link>
        </div>
      </div>
    </section>
  )
}
