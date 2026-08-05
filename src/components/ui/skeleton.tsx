import type { HTMLAttributes } from 'react'

/**
 * Skeleton
 * --------
 * 骨架屏。纯 CSS 动画，没有 JS 闪烁。
 * 用法：<Skeleton className="h-4 w-32" />
 */

export type SkeletonProps = HTMLAttributes<HTMLDivElement>

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(' ')
}

export function Skeleton({ className, ...rest }: SkeletonProps) {
  return (
    <div
      className={cx(
        'relative isolate overflow-hidden bg-[#e9ebe7]/70',
        'after:absolute after:inset-0 after:-translate-x-full after:bg-gradient-to-r',
        'after:from-transparent after:via-white/60 after:to-transparent',
        'after:animate-[skeleton-shimmer_1.6s_infinite]',
        className,
      )}
      {...rest}
    />
  )
}

/** 组合好的产品卡骨架。匹配 ProductCard 的视觉占比。 */
export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton
        className="aspect-[4/5] w-full"
        style={{ borderRadius: 'var(--radius-sm)' }}
      />
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  )
}
