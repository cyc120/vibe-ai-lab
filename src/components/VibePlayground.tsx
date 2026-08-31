import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowUpRight, RotateCcw, Send, Sparkles, TerminalSquare } from 'lucide-react'
import ColorField from './ColorField'
import InteractiveParticles from './InteractiveParticles'

type Mode = 'clean' | 'tech' | 'rebuild'
type Modification = { label: string; log: string[]; mode?: Mode; animation?: boolean; button?: boolean }
type LogKind = 'output' | 'command' | 'done'
type TerminalLog = { id: number; time: string; message: string; kind: LogKind }

const prompts: Modification[] = [
  { label: '更有科技感', mode: 'tech', log: ['Analyzing interface...', 'Updating visual system...', 'Adding neon energy...', 'Refactoring components...'] },
  { label: '加一点动画', animation: true, log: ['Reading component state...', 'Adding motion physics...', 'Optimizing at 60fps...', 'Animation loop online.'] },
  { label: '太丑了，重做', mode: 'rebuild', log: ['Removing boring defaults...', 'Rebuilding composition...', 'Balancing type and space...', 'Fresh interface generated.'] },
  { label: '加一个AI按钮', button: true, log: ['Mapping interaction point...', 'Creating action button...', 'Binding a tiny spark...', 'Button mounted.'] },
]

function selectModification(value: string) {
  const normalized = value.toLowerCase()
  if (normalized.includes('科技') || normalized.includes('tech')) return prompts[0]
  if (normalized.includes('动画') || normalized.includes('motion')) return prompts[1]
  if (normalized.includes('丑') || normalized.includes('重做') || normalized.includes('redo')) return prompts[2]
  if (normalized.includes('按钮') || normalized.includes('button')) return prompts[3]
  return prompts[0]
}

function formatTerminalTime(date = new Date()) {
  return [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map(value => String(value).padStart(2, '0'))
    .join(':')
}

export default function VibePlayground() {
  const [mode, setMode] = useState<Mode>('clean')
  const [animated, setAnimated] = useState(false)
  const [hasButton, setHasButton] = useState(false)
  const [input, setInput] = useState('')
  const logId = useRef(1)
  const timers = useRef<number[]>([])
  const operationId = useRef(0)
  const [logs, setLogs] = useState<TerminalLog[]>(() => {
    const time = formatTerminalTime()
    return [
      { id: 0, time, message: 'initializing VIBE CODEX...', kind: 'output' },
      { id: 1, time, message: 'waiting for your imagination_', kind: 'output' },
    ]
  })
  const [changes, setChanges] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentTime, setCurrentTime] = useState(() => formatTerminalTime())

  const isComplete = changes >= 3
  const previewLabel = useMemo(() => mode === 'clean' ? 'static / default' : mode === 'tech' ? 'neon / online' : 'rebuilt / fresh', [mode])

  const clearTimers = useCallback(() => {
    timers.current.forEach(timer => window.clearTimeout(timer))
    timers.current = []
  }, [])

  const addLog = useCallback((message: string, kind: LogKind = 'output') => {
    const entry = { id: ++logId.current, time: formatTerminalTime(), message, kind }
    setLogs(current => [...current, entry].slice(-7))
  }, [])

  useEffect(() => {
    const clock = window.setInterval(() => setCurrentTime(formatTerminalTime()), 1000)
    return () => window.clearInterval(clock)
  }, [])

  useEffect(() => clearTimers, [clearTimers])

  const apply = (change: Modification) => {
    if (isProcessing) return

    if (change.mode) setMode(change.mode)
    if (change.animation) setAnimated(true)
    if (change.button) setHasButton(true)
    setChanges(count => count + 1)
    setIsProcessing(true)
    addLog(`> ${change.label}`, 'command')

    const currentOperation = ++operationId.current
    change.log.forEach((line, index) => {
      const timer = window.setTimeout(() => {
        if (operationId.current === currentOperation) addLog(line)
      }, (index + 1) * 550)
      timers.current.push(timer)
    })

    const completionTimer = window.setTimeout(() => {
      if (operationId.current !== currentOperation) return
      addLog('Done. Your idea is alive.', 'done')
      setIsProcessing(false)
      timers.current = []
    }, (change.log.length + 1) * 550)
    timers.current.push(completionTimer)
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!input.trim()) return
    apply(selectModification(input))
    setInput('')
  }

  const reset = () => {
    operationId.current += 1
    clearTimers()
    setMode('clean'); setAnimated(false); setHasButton(false); setChanges(0)
    setIsProcessing(false)
    const time = formatTerminalTime()
    setLogs([
      { id: ++logId.current, time, message: 'reset complete.', kind: 'output' },
      { id: ++logId.current, time, message: 'blank canvas ready_', kind: 'output' },
    ])
  }

  return (
    <section id="play" className="play-section" aria-labelledby="play-title">
      <ColorField className="play-color-field" colors="rgba(114, 243, 229, .48), rgba(215, 255, 63, .38)" />
      <div className="section-heading">
        <p className="section-kicker">PLAYGROUND 01 <span>/</span> NO CODE REQUIRED</p>
        <h2 id="play-title"><span className="play-title-zh">30 秒体验一次</span><br /><em>VIBE CODING</em><span className="blink-cursor">_</span></h2>
        <p className="section-intro">不会写代码？没关系。告诉 AI 你想要什么，剩下的交给它。</p>
      </div>
      <div className={`code-lab ${isComplete ? 'is-complete' : ''}`}>
        <div className="lab-topbar"><span><i className="window-dot red" /><i className="window-dot amber" /><i className="window-dot green" /> playground.html</span><span>CREATIVE SESSION / {previewLabel}</span></div>
        <div className="lab-workspace">
          <div className="preview-pane">
            <div className="pane-label"><span>LIVE PREVIEW</span><span className="pulse">LIVE</span></div>
            <div className={`site-preview ${mode} ${animated ? 'is-floating' : ''}`}>
              <InteractiveParticles className="playground-particles" count={16} />
              <div className="stage-orbit" aria-hidden="true" /><span className="stage-number" aria-hidden="true">01</span><span className="stage-axis" aria-hidden="true">X / IMAGINE<br />Y / SHIP</span>
              <div className="mock-browser"><div className="mock-nav"><b>{mode === 'clean' ? 'my website' : 'future.exe'}</b><span>about&nbsp;&nbsp;work&nbsp;&nbsp;hello</span></div><main><p>{mode === 'clean' ? 'WELCOME TO MY PAGE' : 'INVENT THE NEXT THING'}</p><h3>{mode === 'clean' ? 'HELLO WORLD' : mode === 'tech' ? 'HELLO, FUTURE.' : 'MAKE IT WEIRD.'}</h3><small>{mode === 'clean' ? 'a very ordinary internet card' : 'built from a sentence and a little nerve'}</small>{hasButton && <button type="button" className="mock-ai-button"><Sparkles size={14} /> ASK THE VOID</button>}</main><div className="mock-footer"><span>2026</span><span>made with ideas</span></div></div>
            </div>
            {isComplete && <div className="congrats"><Sparkles size={20} /> <div><b>CONGRATULATIONS!</b><span>YOU JUST DID VIBE CODING.</span></div><a href="#battle">NEXT LEVEL <ArrowUpRight size={16} /></a></div>}
          </div>
          <div className="terminal-pane">
            <div className="pane-label"><span><TerminalSquare size={14} /> VIBE CODEX</span><span className="terminal-status">{isProcessing ? 'PROCESSING' : 'CONNECTED'} / {currentTime}</span></div>
            <div className="terminal-output" aria-live="polite">{logs.map(log => <p key={log.id} className={log.kind}><time dateTime={log.time}>[{log.time}]</time> {log.message}</p>)}<span className="terminal-caret">_</span></div>
            <div className="quick-prompts">{prompts.map(prompt => <button key={prompt.label} type="button" onClick={() => apply(prompt)} disabled={isProcessing}>{prompt.label}</button>)}</div>
            <form className="terminal-input" onSubmit={submit}><span>&gt;</span><input value={input} onChange={event => setInput(event.target.value)} placeholder="告诉 AI，你想怎么修改这个网页..." aria-label="Describe a webpage change" disabled={isProcessing} /><button aria-label="Send prompt" type="submit" disabled={isProcessing}><Send size={18} /></button></form>
            <div className="lab-progress"><span><b>{Math.min(changes, 3)}</b> / 3 MODIFICATIONS</span><button onClick={reset} type="button" aria-label="Reset playground"><RotateCcw size={15} /> RESET</button></div>
          </div>
        </div>
      </div>
      <p className="vibe-formula"><span>描述想法</span><i>→</i><span>AI 修改</span><i>→</i><span>查看结果</span><i>→</i><span>继续提出要求</span><i>→</i><strong>完成作品</strong></p>
    </section>
  )
}
