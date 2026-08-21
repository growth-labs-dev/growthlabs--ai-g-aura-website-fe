export function Logo({ dark = false, className = '' }: { dark?: boolean; className?: string }) {
  return <img className={`brand-logo ${dark ? '' : 'brand-logo--ink'} ${className}`} src="/brand/Logo-Vertical-White.svg" alt="Growth Labs" />
}
