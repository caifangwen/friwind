import type { ReactNode } from 'react'

import {
  Accordion,
  Alert,
  Badge,
  Breadcrumb,
  Button,
  ButtonGroup,
  CategoryCard,
  EmptyState,
  IconButton,
  ProductCard,
  ProductCardCompact,
  ProductCardFeatured,
  ProductCardHorizontal,
  ProductCardSkeleton,
  QuantitySelector,
  SearchBar,
  Skeleton,
  Spinner,
  Tabs,
} from '#/components/ui'
import type { ProductItem } from '#/components/ui'

import { CodeBlock, Section, Showcase, ShowcaseGrid } from './section'

/**
 * 组件展示页
 * ----------
 * 路径：/components
 * 把 UI kit 全部组件按用途分组展示。
 */

const SAMPLE_PRODUCTS: ReadonlyArray<ProductItem> = [
  {
    id: 'p1',
    handle: 'aurora-cashmere',
    title: 'Aurora 羊绒围巾',
    vendor: 'NORTHWIND',
    image: {
      src: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600&h=750&fit=crop',
      alt: 'Aurora 羊绒围巾',
    },
    hoverImage: {
      src: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&h=750&fit=crop',
      alt: 'Aurora 羊绒围巾 - 背面',
    },
    price: { amount: 1280, currencyCode: 'CNY' },
    compareAtPrice: { amount: 1580, currencyCode: 'CNY' },
    rating: 4.6,
    reviewCount: 128,
    badge: 'sale',
    swatches: ['#d6c1a0', '#3b3024', '#a8392f', '#2c4a3a'],
    showQuickAdd: true,
  },
  {
    id: 'p2',
    handle: 'tideline-tote',
    title: 'Tideline 帆布托特包',
    vendor: 'HARBOR & OAK',
    image: {
      src: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&h=750&fit=crop',
      alt: 'Tideline 帆布托特包',
    },
    price: { amount: 580, currencyCode: 'CNY' },
    rating: 4.8,
    reviewCount: 42,
    badge: 'new',
    swatches: ['#e5e1d8', '#1a1a1a'],
    showQuickAdd: true,
  },
  {
    id: 'p3',
    handle: 'kettle-ceramic',
    title: '陶土手工茶壶',
    vendor: 'STONEFIELD',
    image: {
      src: 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=600&h=750&fit=crop',
      alt: '陶土手工茶壶',
    },
    price: { amount: 360, currencyCode: 'CNY' },
    rating: 4.2,
    reviewCount: 67,
    badge: 'limited',
  },
  {
    id: 'p4',
    handle: 'cedar-tee',
    title: 'Cedar 长绒棉 T 恤',
    vendor: 'NORTHWIND',
    image: {
      src: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=750&fit=crop',
      alt: 'Cedar 长绒棉 T 恤',
    },
    price: { amount: 199, currencyCode: 'CNY' },
    rating: 4.9,
    reviewCount: 312,
    badge: 'hot',
    swatches: ['#fff', '#1a1a1a', '#a8392f', '#2c4a3a', '#cfa45f', '#1c5a7a'],
    showQuickAdd: true,
  },
  {
    id: 'p5',
    handle: 'lowtide-wool',
    title: 'Lowtide 羊毛混纺开衫',
    vendor: 'NORTHWIND',
    image: {
      src: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=750&fit=crop',
      alt: 'Lowtide 羊毛混纺开衫',
    },
    price: { amount: 0, currencyCode: 'CNY' },
    compareAtPrice: { amount: 880, currencyCode: 'CNY' },
    badge: 'soldOut',
  },
]

export function ShowcasePage(): ReactNode {
  return (
    <main className="bg-[var(--bg-base)] text-[var(--sea-ink)]">
      {/* 头部 */}
      <header className="kegani-section kegani-section--white border-b border-[var(--line)]">
        <div className="page-wrap">
          <p className="section-kicker">UI Kit</p>
          <h1 className="display-title section-title">
            组件库
          </h1>
          <p className="section-copy mt-6 max-w-2xl">
            一套为电商场景设计的 React + Tailwind CSS 组件。
            所有视觉令牌都与站点其它部分对齐 ——
            任何变量调整都会自动反映在整套组件中。
          </p>
        </div>
      </header>

      {/* Buttons */}
      <Section
        id="buttons"
        eyebrow="01 / Buttons"
        title="按钮 Buttons"
        description="统一所有按钮，6 个 variant、3 个 size，支持图标、loading、fullWidth。设计目标是低圆角、克制的 lagoon teal 强调色，与站点 hero 风格一致。"
      >
        <div className="space-y-8">
          <Showcase label="Variants">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="link">Link style →</Button>
            </div>
          </Showcase>

          <Showcase label="Sizes">
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="md" disabled>
                Disabled
              </Button>
              <Button
                size="md"
                loading
                leftIcon={
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                }
              >
                Loading
              </Button>
            </div>
          </Showcase>

          <Showcase label="With icons">
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                leftIcon={
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <path d="M6 6h15l-1.5 9H7.5L6 3H3" />
                    <circle cx="9" cy="20" r="1.4" />
                    <circle cx="18" cy="20" r="1.4" />
                  </svg>
                }
              >
                Add to cart
              </Button>
              <Button
                variant="secondary"
                rightIcon={
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                }
              >
                Continue shopping
              </Button>
              <Button
                variant="danger"
                size="sm"
                leftIcon={
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M6 6l1 14a2 2 0 002 2h6a2 2 0 002-2l1-14" />
                  </svg>
                }
              >
                Delete
              </Button>
            </div>
          </Showcase>

          <Showcase label="ButtonGroup + IconButton">
            <div className="flex flex-wrap items-center gap-6">
              <ButtonGroup attached>
                <Button variant="ghost" size="sm">
                  Grid
                </Button>
                <Button variant="ghost" size="sm">
                  List
                </Button>
                <Button variant="ghost" size="sm">
                  Map
                </Button>
              </ButtonGroup>

              <div className="flex items-center gap-2">
                <IconButton
                  aria-label="Wishlist"
                  variant="outline"
                  icon={
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path d="M12 21s-7-4.5-9.5-9C.8 8.5 3 5 6 5c2 0 3.5 1 6 4 2.5-3 4-4 6-4 3 0 5.2 3.5 3.5 7C19 16.5 12 21 12 21z" />
                    </svg>
                  }
                />
                <IconButton
                  aria-label="Share"
                  variant="outline"
                  icon={
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    >
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
                    </svg>
                  }
                />
                <IconButton
                  aria-label="Add"
                  variant="primary"
                  icon={
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  }
                />
              </div>
            </div>
          </Showcase>

          <CodeBlock>{`<Button variant="primary" leftIcon={...}>Add to cart</Button>
<Button variant="secondary" size="lg">Continue</Button>
<Button loading>Processing</Button>
<ButtonGroup attached>
  <Button>Grid</Button><Button>List</Button>
</ButtonGroup>`}</CodeBlock>
        </div>
      </Section>

      {/* Product Cards */}
      <Section
        id="product-cards"
        eyebrow="02 / Product Cards"
        title="产品卡 Product Cards"
        description="四种产品卡变体，覆盖 grid / 推荐位 / 购物车侧栏 / hero 区。共用 ProductItem 数据结构，与 Shopify 解耦。"
      >
        <div className="space-y-10">
          <Showcase label="Default — 4:5 grid card">
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
              {SAMPLE_PRODUCTS.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Showcase>

          <Showcase label="Compact — small list / cart drawer">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {SAMPLE_PRODUCTS.slice(0, 4).map((p) => (
                <ProductCardCompact key={p.id} product={p} />
              ))}
            </div>
          </Showcase>

          <Showcase label="Horizontal — search result / compare">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {SAMPLE_PRODUCTS.slice(0, 2).map((p) => (
                <ProductCardHorizontal
                  key={p.id}
                  product={p}
                  onAdd={() => {
                    /* 实际接购物车 */
                  }}
                />
              ))}
            </div>
          </Showcase>

          <Showcase label="Featured — hero / spotlight">
            <ProductCardFeatured
              product={SAMPLE_PRODUCTS[0]!}
              eyebrow="本周精选"
              onAdd={() => {
                /* 实际接购物车 */
              }}
            />
          </Showcase>

          <Showcase label="Loading — Skeleton">
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </Showcase>
        </div>
      </Section>

      {/* Badges */}
      <Section
        id="badges"
        eyebrow="03 / Badges"
        title="徽章与标签 Badges & Tags"
        description="通用 Badge + 电商专用的 ProductBadge（New / Sale / Sold Out / Limited / Hot / Pre-order）。"
      >
        <div className="space-y-6">
          <Showcase label="通用 Badge — tone">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="neutral">Neutral</Badge>
              <Badge tone="brand">Brand</Badge>
              <Badge tone="success">In stock</Badge>
              <Badge tone="warning">Backorder</Badge>
              <Badge tone="danger">Low stock</Badge>
              <Badge tone="info">Free shipping</Badge>
              <Badge tone="dark">Dark</Badge>
            </div>
          </Showcase>

          <Showcase label="形状 + 大小">
            <div className="flex flex-wrap items-center gap-3">
              <Badge shape="square" tone="brand">
                Square
              </Badge>
              <Badge shape="pill" tone="brand">
                Pill
              </Badge>
              <Badge shape="pill" tone="success">
                <svg
                  viewBox="0 0 24 24"
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                Free returns
              </Badge>
            </div>
          </Showcase>

          <Showcase label="Product badges">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="brand" shape="pill">
                New
              </Badge>
              <Badge tone="brand" shape="pill">
                Sale
              </Badge>
              <Badge tone="neutral" shape="pill">
                Sold out
              </Badge>
              <Badge tone="warning" shape="pill">
                Limited
              </Badge>
              <Badge tone="danger" shape="pill">
                Hot
              </Badge>
              <Badge tone="neutral" shape="pill">
                Pre-order
              </Badge>
            </div>
          </Showcase>
        </div>
      </Section>

      {/* Feedback */}
      <Section
        id="feedback"
        eyebrow="04 / Feedback"
        title="提示与反馈"
        description="Alert、Spinner、Skeleton、EmptyState — 反馈用户当前状态。"
      >
        <div className="space-y-6">
          <Showcase label="Alert">
            <div className="flex flex-col gap-3">
              <Alert
                tone="info"
                title="订单已提交"
                onClose={() => {
                  /* 关闭 */
                }}
              >
                我们会在 24 小时内确认订单并发货。
              </Alert>
              <Alert
                tone="success"
                title="支付成功"
                onClose={() => {
                  /* 关闭 */
                }}
              >
                您的订单 #12345 已完成支付。
              </Alert>
              <Alert
                tone="warning"
                title="库存紧张"
              >
                仅剩 3 件，先到先得。
              </Alert>
              <Alert
                tone="danger"
                title="支付失败"
                onClose={() => {
                  /* 关闭 */
                }}
              >
                请检查支付方式或联系客服。
              </Alert>
            </div>
          </Showcase>

          <Showcase label="Spinner / Skeleton / EmptyState">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center gap-3 rounded-[var(--radius-sm)] border border-[var(--line)] bg-white p-8">
                <Spinner size="lg" tone="brand" />
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--sea-ink-soft)]">
                  Loading
                </p>
              </div>
              <div className="flex flex-col gap-3 rounded-[var(--radius-sm)] border border-[var(--line)] bg-white p-8">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-2/3" />
                <Skeleton className="h-3 w-3/5" />
                <Skeleton className="mt-2 h-20 w-full" />
              </div>
              <div className="rounded-[var(--radius-sm)] border border-[var(--line)] bg-white">
                <EmptyState
                  title="没有找到商品"
                  description="试试调整筛选条件，或者清空搜索。"
                  action={
                    <Button variant="outline" size="sm">
                      清空筛选
                    </Button>
                  }
                />
              </div>
            </div>
          </Showcase>
        </div>
      </Section>

      {/* Input controls */}
      <Section
        id="inputs"
        eyebrow="05 / Input controls"
        title="输入控件"
        description="QuantitySelector + SearchBar + Breadcrumb。"
      >
        <div className="space-y-6">
          <Showcase label="QuantitySelector">
            <div className="flex flex-wrap items-center gap-6">
              <QuantitySelector size="sm" defaultValue={1} />
              <QuantitySelector size="md" defaultValue={2} />
              <QuantitySelector defaultValue={5} max={10} />
              <QuantitySelector defaultValue={99} disabled />
            </div>
          </Showcase>

          <Showcase label="SearchBar">
            <div className="flex flex-col gap-4">
              <SearchBar size="sm" />
              <SearchBar size="md" />
              <SearchBar
                size="lg"
                defaultValue="羊毛衫"
                onSearch={(q) => {
                  // 演示用
                  console.log('search:', q)
                }}
              />
            </div>
          </Showcase>

          <Showcase label="Breadcrumb">
            <Breadcrumb
              items={[
                { label: '首页', to: '/' },
                { label: '商店', to: '/shop' },
                {
                  label: '针织',
                  to: '/shop/collections/$handle',
                  params: { handle: 'knitwear' },
                },
                { label: 'Aurora 羊绒围巾' },
              ]}
            />
          </Showcase>
        </div>
      </Section>

      {/* Navigation / Layout */}
      <Section
        id="layout"
        eyebrow="06 / Navigation & Layout"
        title="导航与版块"
        description="Tabs、Accordion、CategoryCard —— 适合商品详情页与目录导航。"
      >
        <div className="space-y-6">
          <Showcase label="Tabs — 商品详情">
            <Tabs
              items={[
                {
                  value: 'desc',
                  label: '商品描述',
                  content: (
                    <p className="max-w-2xl text-[var(--sea-ink-soft)]">
                      采用优质内蒙古羊绒，手工精梳而成。纤维细腻柔软，
                      保暖透气，适合秋冬日常搭配。
                    </p>
                  ),
                },
                {
                  value: 'spec',
                  label: '规格参数',
                  content: (
                    <ul className="m-0 grid grid-cols-2 gap-2 text-sm text-[var(--sea-ink-soft)]">
                      <li>材质：100% 羊绒</li>
                      <li>尺寸：200 × 70 cm</li>
                      <li>重量：280 g</li>
                      <li>产地：中国内蒙古</li>
                    </ul>
                  ),
                },
                {
                  value: 'shipping',
                  label: '配送 & 退换',
                  content: (
                    <p className="max-w-2xl text-[var(--sea-ink-soft)]">
                      满 199 元包邮，48 小时内发货。7 天无理由退换。
                    </p>
                  ),
                },
                {
                  value: 'reviews',
                  label: '用户评价',
                  badge: 128,
                  content: (
                    <p className="max-w-2xl text-[var(--sea-ink-soft)]">
                      共 128 条评价，平均 4.6 / 5 星。
                    </p>
                  ),
                },
              ]}
            />
          </Showcase>

          <Showcase label="Tabs — pill variant">
            <Tabs
              variant="pill"
              items={[
                { value: 'all', label: '全部', content: <p>全部商品</p> },
                { value: 'new', label: '新品', content: <p>新品上架</p> },
                { value: 'sale', label: '促销', content: <p>促销商品</p> },
              ]}
            />
          </Showcase>

          <Showcase label="Accordion — FAQ">
            <Accordion
              multiple
              defaultOpenIds={['shipping']}
              items={[
                {
                  id: 'shipping',
                  title: '多久能收到货？',
                  content: (
                    <p>
                      工作日 14:00 前下单当天发货，江浙沪 1-2 天到达，其他地区 2-4 天。
                    </p>
                  ),
                },
                {
                  id: 'return',
                  title: '支持 7 天无理由退换吗？',
                  content: (
                    <p>
                      支持。商品未拆封、不影响二次销售的情况下，签收 7 天内可申请退货。
                    </p>
                  ),
                },
                {
                  id: 'warranty',
                  title: '羊绒起球怎么办？',
                  content: (
                    <p>
                      建议使用专业羊绒梳定期梳理，避免与粗糙表面摩擦即可减少起球。
                    </p>
                  ),
                },
                {
                  id: 'gift',
                  title: '可以提供礼品包装吗？',
                  content: (
                    <p>
                      结算时勾选 "礼品包装" 选项即可，精美礼盒 + 手写贺卡。
                    </p>
                  ),
                },
              ]}
            />
          </Showcase>

          <Showcase label="CategoryCard">
            <ShowcaseGrid>
              <CategoryCard
                title="针织系列"
                subtitle="Knitwear"
                image={{
                  src: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=600&fit=crop',
                  alt: '针织系列',
                }}
                productCount={42}
                href="/shop/collections/knitwear"
              />
              <CategoryCard
                title="家居陶器"
                subtitle="Ceramics"
                image={{
                  src: 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=600&h=600&fit=crop',
                  alt: '家居陶器',
                }}
                productCount={18}
                href="/shop/collections/ceramics"
              />
              <CategoryCard
                title="包袋"
                subtitle="Bags"
                image={{
                  src: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&h=600&fit=crop',
                  alt: '包袋',
                }}
                productCount={26}
                href="/shop/collections/bags"
              />
            </ShowcaseGrid>
          </Showcase>
        </div>
      </Section>

      <footer className="border-t border-[var(--line)] py-10 text-center text-sm text-[var(--sea-ink-soft)]">
        <p className="page-wrap">
          所有组件源码位于 <code>src/components/ui/</code>。
        </p>
      </footer>
    </main>
  )
}
