import { useEffect, useRef } from 'react'
import type { MouseEvent } from 'react'
import AgentBuilder from './components/AgentBuilder'
import Ecosystem from './components/Ecosystem'
import Hero from './components/Hero'
import LobsterEasterEgg from './components/LobsterEasterEgg'
import Navigation from './components/Navigation'
import PromptBattle from './components/PromptBattle'
import Recruitment from './components/Recruitment'
import Roadmap from './components/Roadmap'
import Ticker from './components/Ticker'
import VibePlayground from './components/VibePlayground'
export default function App() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(pointer: coarse)').matches) return
    const move = (event: globalThis.MouseEvent) => {
      const cursor = cursorRef.current
      if (!cursor) return
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
      cursor.dataset.active = 'true'
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  const hover = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement
    if (target.closest('button, a, .tech-card, .prompt-answer, .project-chip')) document.body.dataset.hover = 'true'
  }
  const leave = (event: MouseEvent<HTMLElement>) => {
    const nextTarget = event.relatedTarget as HTMLElement | null
    if (!nextTarget?.closest('button, a, .tech-card, .prompt-answer, .project-chip')) delete document.body.dataset.hover
  }

  return <main onMouseOver={hover} onMouseOut={leave}>
    <div ref={cursorRef} className="cursor-field" aria-hidden="true"><i className="cursor-glow" /><i className="cursor-dot" /></div>
    <Navigation /><Hero /><Ticker /><Ecosystem /><VibePlayground /><PromptBattle /><AgentBuilder /><Roadmap /><Recruitment /><LobsterEasterEgg />
  </main>
}
