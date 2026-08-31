import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  tone: string
}

type InteractiveParticlesProps = {
  className?: string
  count?: number
}

const tones = ['215, 255, 63', '114, 243, 229', '242, 240, 232']

export default function InteractiveParticles({ className = '', count = 24 }: InteractiveParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) return

    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    const context = canvas?.getContext('2d')
    if (!canvas || !parent || !context) return

    let width = 0
    let height = 0
    let frame = 0
    let particles: Particle[] = []
    const pointer = { x: 0, y: 0, active: false }

    const createParticle = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.24,
      vy: (Math.random() - 0.5) * 0.24,
      radius: Math.random() * 1.8 + 0.65,
      tone: tones[Math.floor(Math.random() * tones.length)],
    })

    const resize = () => {
      const rect = parent.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.round(width * ratio))
      canvas.height = Math.max(1, Math.round(height * ratio))
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      particles = Array.from({ length: count }, createParticle)
      pointer.x = width * 0.68
      pointer.y = height * 0.42
    }

    const move = (event: PointerEvent) => {
      const rect = parent.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.active = true
    }

    const leave = () => { pointer.active = false }

    const render = () => {
      context.clearRect(0, 0, width, height)

      particles.forEach((particle, index) => {
        if (pointer.active) {
          const dx = particle.x - pointer.x
          const dy = particle.y - pointer.y
          const distance = Math.hypot(dx, dy)
          if (distance > 0 && distance < 138) {
            const force = (138 - distance) / 138
            particle.vx += (dx / distance) * force * 0.055
            particle.vy += (dy / distance) * force * 0.055
          }
        }

        particle.vx *= 0.988
        particle.vy *= 0.988
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < -12 || particle.x > width + 12) particle.vx *= -1
        if (particle.y < -12 || particle.y > height + 12) particle.vy *= -1

        context.beginPath()
        context.fillStyle = `rgba(${particle.tone}, ${index % 5 === 0 ? 0.72 : 0.42})`
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fill()
      })

      frame = window.requestAnimationFrame(render)
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(parent)
    parent.addEventListener('pointermove', move, { passive: true })
    parent.addEventListener('pointerleave', leave)
    frame = window.requestAnimationFrame(render)

    return () => {
      observer.disconnect()
      parent.removeEventListener('pointermove', move)
      parent.removeEventListener('pointerleave', leave)
      window.cancelAnimationFrame(frame)
    }
  }, [count])

  return <canvas ref={canvasRef} className={`interactive-particles ${className}`} aria-hidden="true" />
}
