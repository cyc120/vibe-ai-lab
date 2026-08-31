import { useState } from 'react'
import type { DragEvent } from 'react'
import { Check, GripVertical, RotateCcw, Sparkles } from 'lucide-react'

const workflow = ['LLM', 'PLAN', 'TOOLS', 'ACTION', 'OBSERVATION']
const descriptions: Record<string, string> = { LLM: '理解你的目标', PLAN: '拆解下一步', TOOLS: '调用浏览器、代码或数据', ACTION: '真正执行任务', OBSERVATION: '看看结果，再决定下一步' }

export default function AgentBuilder() {
  const [built, setBuilt] = useState<string[]>([]); const [dragged, setDragged] = useState<string | null>(null); const [message, setMessage] = useState('把模块按工作顺序拖进这个 Agent。')
  const complete = built.length === workflow.length
  const addBlock = (block: string) => { if (complete || built.includes(block)) return; const expected = workflow[built.length]; if (block !== expected) { setMessage(`先想想 Agent 需要如何从「${expected}」开始。`); return }; const next = [...built, block]; setBuilt(next); setMessage(next.length === workflow.length ? 'AGENT ONLINE. 现在它可以为你完成一件事。' : `${block}: ${descriptions[block]}`) }
  const drop = (event: DragEvent<HTMLDivElement>) => { event.preventDefault(); if (dragged) addBlock(dragged); setDragged(null) }
  const reset = () => { setBuilt([]); setMessage('把模块按工作顺序拖进这个 Agent。') }
  return <section className="agent-section" aria-labelledby="agent-title"><div className="agent-heading"><p className="section-kicker">PLAYGROUND 03 <span>/</span> SYSTEM DESIGN</p><h2 id="agent-title">一个 Agent<br /><em>是怎么工作的？</em></h2><p>ChatGPT 回答你的问题。Agent，帮你完成任务。</p></div><div className="agent-builder"><div className="agent-canvas" onDragOver={event => event.preventDefault()} onDrop={drop}><div className="agent-canvas-top"><span>WORKFLOW.EXE</span><button type="button" onClick={reset}><RotateCcw size={14} /> RESET</button></div><div className="agent-flow"><div className="flow-node user-node">USER</div>{built.map((block, index) => <div className="flow-piece" key={block}><i /><div className={`flow-node ${block.toLowerCase()}`}>{block}<small>{descriptions[block]}</small></div>{index === built.length - 1 && !complete && <div className="flow-drop">DROP NEXT BLOCK</div>}</div>)}{built.length === 0 && <div className="flow-drop empty">DROP FIRST BLOCK</div>}</div>{complete && <div className="agent-online"><Check size={17} /> AGENT ONLINE <span>✓</span></div>}<p className="agent-message">&gt; {message}<span className="blink-cursor">_</span></p></div><div className="agent-palette"><p>AVAILABLE BLOCKS</p><div>{workflow.map(block => <button key={block} draggable={!built.includes(block)} onDragStart={() => setDragged(block)} onClick={() => addBlock(block)} className={`block-${block.toLowerCase()} ${built.includes(block) ? 'used' : ''}`} type="button"><GripVertical size={15} /><span>{block}</span><small>{descriptions[block]}</small></button>)}</div><footer><Sparkles size={15} /> Drag on desktop, tap on mobile.</footer></div></div><div className="agent-names"><span>CLAUDE CODE</span><span>CODEX</span><span>OPENCLAW</span><span>DEEPSEEK HARNESS</span></div></section>
}
