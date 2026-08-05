import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

/**
 * CategoryCard
 * ------------
 * 分类入口卡。1:1 比例图 + 名字 + 商品数。
 * 用在首页"按品类逛"、侧边栏 nav、推荐位等。
 */

export type CategoryCardProps = {
  title: string
  /** 副标题 / 描述 */
  subtitle?: string
  image: { src: string; alt: string }
  productCount?: number
  /** 接受完整 URL 字符串（也支持 TanStack Router 的路由模板） */
  href: string
  /** TanStack Router params，配合 href 为路由模板时使用 */
  params?: Record<string, string>
  /** 显示形态：square 默认 1:1，wide 16:9 */
  shape?: 'square' | 'wide'
  className?: string
}

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(' ')
}

export function CategoryCard({
  title,
  subtitle,
  image,
  productCount,
  href,
  params,
  shape = 'square',
  className,
}: CategoryCardProps): ReactNode {
  // 判断是否带 $param 模板：有就用 Link 走 SPA，否则用普通 anchor
  const hasTemplate = href.includes('$')

  const Inner = (
    <>
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent"
      />
      <span className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5">
        {subtitle && (
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/70">
            {subtitle}
          </span>
        )}
        <span className="font-display text-2xl font-extrabold leading-tight tracking-[-0.025em]">
          {title}
        </span>
        {typeof productCount === 'number' && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-white/85">
            Shop now
            <svg
              viewBox="0 0 24 24"
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
            <span className="ml-1 text-white/55">
              {productCount} products
            </span>
          </span>
        )}
      </span>
    </>
  )

  const cardClass = cx(
    'group relative block overflow-hidden bg-[#e9ebe7] no-underline text-white',
    className,
  )
  const cardStyle = {
    aspectRatio: shape === 'wide' ? '16 / 9' : '1 / 1',
    borderRadius: 'var(--radius-sm)',
  }

  if (hasTemplate) {
    return (
      <Link
        to={href}
        params={params}
        className={cardClass}
        style={cardStyle}
      >
        {Inner}
      </Link>
    )
  }

  return (
    <a href={href} className={cardClass} style={cardStyle}>
      {Inner}
    </a>
  )
}

