/**
 * 通用产品数据类型。
 * ProductCard 系列都基于这个最小结构，与 Shopify 解耦。
 * Shopify 适配在 src/components/shop/ 中做。
 */

export type ProductImage = {
  src: string
  alt: string
}

export type ProductItem = {
  id: string
  handle: string
  title: string
  vendor?: string
  image: ProductImage
  /** 第二张图（hover 时切换）。可选 */
  hoverImage?: ProductImage | null
  price: { amount: string | number; currencyCode?: string }
  compareAtPrice?: { amount: string | number; currencyCode?: string } | null
  /** 价格区间 - 用来展示 X ~ Y */
  maxPrice?: { amount: string | number; currencyCode?: string } | null
  /** 评分 0–5 */
  rating?: number
  reviewCount?: number
  /** 商品状态徽章 */
  badge?: 'sale' | 'soldOut' | 'new' | 'limited' | 'hot' | 'preorder'
  /** 调色板 swatch - 颜色名数组 */
  swatches?: ReadonlyArray<string>
  /** 是否显示 "Quick add" 按钮 */
  showQuickAdd?: boolean
}
