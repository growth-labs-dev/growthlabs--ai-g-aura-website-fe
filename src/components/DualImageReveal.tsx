import { useEffect, useRef } from 'react'

const BG1 = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260802_074534_f0d9d476-3f86-4c67-9b12-dfc63d99da41.png&w=1920&q=85'
const BG2 = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260802_075145_1b557479-775b-43af-8270-f45d79d97d5a.png&w=1920&q=85'

export function DualImageReveal({ alt }: { alt: string }) {
  const frameRef = useRef<HTMLDivElement>(null)
  const revealRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const frame = frameRef.current
    const reveal = revealRef.current
    const grid = gridRef.current
    if (!frame || !reveal || !grid || window.matchMedia('(max-width: 767px)').matches) return

    const mask = document.createElement('canvas')
    const maskContext = mask.getContext('2d')
    const gridContext = grid.getContext('2d')
    if (!maskContext || !gridContext) return

    let rawX = frame.clientWidth * .68
    let rawY = frame.clientHeight * .5
    let smoothX = rawX
    let smoothY = rawY
    let parallaxX = 0
    let parallaxY = 0
    let targetParallaxX = 0
    let targetParallaxY = 0
    let animation = 0
    let active = true

    const size = () => {
      const rect = frame.getBoundingClientRect()
      mask.width = Math.max(1, Math.round(rect.width))
      mask.height = Math.max(1, Math.round(rect.height))
      grid.width = mask.width
      grid.height = mask.height
      const cell = Math.round(Math.min(64, Math.max(36, window.innerWidth * .028)))
      gridContext.clearRect(0, 0, grid.width, grid.height)
      gridContext.globalAlpha = .10
      gridContext.strokeStyle = '#64748b'
      gridContext.lineWidth = .6
      for (let x = 0; x <= grid.width; x += cell) { gridContext.beginPath(); gridContext.moveTo(x, 0); gridContext.lineTo(x, grid.height); gridContext.stroke() }
      for (let y = 0; y <= grid.height; y += cell) { gridContext.beginPath(); gridContext.moveTo(0, y); gridContext.lineTo(grid.width, y); gridContext.stroke() }
    }

    const move = (event: PointerEvent) => {
      const rect = frame.getBoundingClientRect()
      rawX = Math.min(rect.width, Math.max(0, event.clientX - rect.left))
      rawY = Math.min(rect.height, Math.max(0, event.clientY - rect.top))
      targetParallaxX = ((rawX / rect.width) - .5) * 16
      targetParallaxY = ((rawY / rect.height) - .5) * 16
    }

    const draw = () => {
      if (!active) return
      smoothX += (rawX - smoothX) * .1
      smoothY += (rawY - smoothY) * .1
      parallaxX += (targetParallaxX - parallaxX) * .06
      parallaxY += (targetParallaxY - parallaxY) * .06
      const radius = Math.round(Math.min(420, Math.max(160, window.innerWidth * .16)))
      maskContext.clearRect(0, 0, mask.width, mask.height)
      const gradient = maskContext.createRadialGradient(smoothX, smoothY, 0, smoothX, smoothY, radius)
      gradient.addColorStop(0, 'rgba(0,0,0,1)')
      gradient.addColorStop(.4, 'rgba(0,0,0,1)')
      gradient.addColorStop(.6, 'rgba(0,0,0,.75)')
      gradient.addColorStop(.75, 'rgba(0,0,0,.4)')
      gradient.addColorStop(.88, 'rgba(0,0,0,.12)')
      gradient.addColorStop(1, 'rgba(0,0,0,0)')
      maskContext.fillStyle = gradient
      maskContext.fillRect(0, 0, mask.width, mask.height)
      const maskUrl = `url(${mask.toDataURL()})`
      reveal.style.maskImage = maskUrl
      reveal.style.webkitMaskImage = maskUrl
      reveal.style.maskSize = '100% 100%'
      reveal.style.webkitMaskSize = '100% 100%'
      grid.style.transform = `translate3d(${parallaxX}px, ${parallaxY}px, 0)`
      animation = requestAnimationFrame(draw)
    }

    size()
    window.addEventListener('resize', size)
    frame.addEventListener('pointermove', move)
    animation = requestAnimationFrame(draw)
    return () => { active = false; cancelAnimationFrame(animation); window.removeEventListener('resize', size); frame.removeEventListener('pointermove', move) }
  }, [])

  return (
    <div ref={frameRef} className="reveal-frame" role="img" aria-label={alt}>
      <div className="reveal-image reveal-image--base" style={{ backgroundImage: `url("${BG2}")` }} />
      <div ref={revealRef} className="reveal-image reveal-image--cyber" style={{ backgroundImage: `url("${BG1}")` }} />
      <canvas ref={gridRef} className="reveal-grid" aria-hidden="true" />
      <span className="reveal-hint">Move to reveal</span>
    </div>
  )
}
