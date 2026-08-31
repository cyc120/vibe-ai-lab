import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'

type ColorFieldProps = {
  className?: string
  colors?: string
}

/** A soft, cursor-led color wash for selected full-bleed color sections. */
export default function ColorField({ className = '', colors = 'rgba(114, 243, 229, .42), rgba(215, 255, 63, .3)' }: ColorFieldProps) {
  const fieldRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(pointer: coarse)').matches) return

    const field = fieldRef.current
    if (!field) return
    const parent = field.parentElement
    if (!parent) return

    const move = (event: MouseEvent) => {
      const rect = parent.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        field.style.opacity = '0'
        return
      }
      field.style.setProperty('--field-x', `${x}px`)
      field.style.setProperty('--field-y', `${y}px`)
      field.style.opacity = '1'
    }
    const leave = () => { field.style.opacity = '0' }

    window.addEventListener('mousemove', move, { passive: true })
    parent.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      parent.removeEventListener('mouseleave', leave)
    }
  }, [])

  return <div ref={fieldRef} className={`color-field ${className}`} style={{ '--field-colors': colors } as CSSProperties} aria-hidden="true" />
}
