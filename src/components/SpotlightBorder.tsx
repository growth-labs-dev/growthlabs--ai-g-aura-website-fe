import { useRef, type PointerEvent, type ReactNode } from 'react'

export function SpotlightBorder({ children, featured = false }: { children: ReactNode; featured?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const move = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    ref.current?.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
    ref.current?.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
  }
  return <div ref={ref} onPointerMove={move} className={`spotlight-border ${featured ? 'is-featured' : ''}`}>{children}</div>
}
