import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>
const common = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }

export const ArrowUpRight = (props: IconProps) => <svg {...common} {...props}><path d="M7 17 17 7M7 7h10v10" /></svg>
export const ArrowRight = (props: IconProps) => <svg {...common} {...props}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
export const Check = (props: IconProps) => <svg {...common} {...props}><path d="m5 12 4 4L19 6" /></svg>
export const MenuIcon = (props: IconProps) => <svg {...common} {...props}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
export const CloseIcon = (props: IconProps) => <svg {...common} {...props}><path d="m6 6 12 12M18 6 6 18" /></svg>
export const SearchIcon = (props: IconProps) => <svg {...common} {...props}><circle cx="11" cy="11" r="7" /><path d="m16 16 4 4" /></svg>
export const CopyIcon = (props: IconProps) => <svg {...common} {...props}><rect x="8" y="8" width="11" height="11" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></svg>
