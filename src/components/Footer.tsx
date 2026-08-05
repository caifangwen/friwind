import { Link } from '@tanstack/react-router'

/**
 * Footer
 * ------
 * 浅色 mega footer ——
 *  - 跟 body 同色系背景 + 顶部分隔线，不形成"硬边界"
 *  - 顶上是 4 列链接 + 巨字号品牌字
 *  - 底部是细线条 meta
 *  整体像文档落款，不是页面结束。
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        {/* 顶部：4 列 + 巨大品牌字 */}
        <div className="site-footer__grid">
          <FooterColumn
            title="Shop"
            links={[
              { label: '全部商品', to: '/shop' },
              { label: '针织', to: '/shop/collections/knitwear' },
              { label: '陶器', to: '/shop/collections/ceramics' },
              { label: '包袋', to: '/shop/collections/bags' },
              { label: '礼品卡', to: '/shop' },
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
              每月一封信 ——
              新品上架、工坊笔记、限时活动。无广告。
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

        {/* 中部：巨字号品牌字 */}
        <div className="site-footer__wordmark" aria-hidden="true">
          NORTHWIND
        </div>

        {/* 底部：细线条 meta */}
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
