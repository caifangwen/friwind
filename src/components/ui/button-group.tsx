import type { HTMLAttributes, ReactNode } from 'react'

/**
 * ButtonGroup
 * ----------
 * 把若干按钮水平排成一行。等宽、可堆叠。常用于排序 / 视图切换 / 分页。
 */

export type ButtonGroupProps = {
  attached?: boolean
  children: ReactNode
} & HTMLAttributes<HTMLDivElement>

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(' ')
}

export function ButtonGroup({
  attached = false,
  className,
  children,
  ...rest
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      className={cx(
        'inline-flex flex-wrap items-center gap-2',
        attached &&
          'gap-0 rounded-[var(--radius-sm)] border border-[var(--line)] bg-white p-1',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
