import { ArrowDown, ArrowUpRight } from 'lucide-react'

export default function Hero() {
  return (
    <section id="top" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-microcopy top-left">VIBE AI LAB / 2026<br /><span>HUMAN <b>x</b> AI</span></div>
      <div className="hero-microcopy status-box"><span className="status-dot" /> SYSTEM STATUS<br /><strong>AI LAB ONLINE</strong><small>NEW MEMBER&nbsp; 0 -&gt; INF</small></div>
      <div className="hero-copy">
        <p className="eyebrow"><span className="live-dot" /> AGENT ONLINE <i>///</i> SYSTEM READY</p>
        <h1 id="hero-title"><span className="zh-line">别只用 <em>AI</em></span><span className="build-line">BUILD</span><span className="with-line">WITH AI<span className="blink-cursor">_</span></span></h1>
        <span className="hero-wordmark" aria-hidden="true">VIBE<br />AI LAB<br />2026</span>
        <p className="hero-description">从 Vibe Coding 开始，认识 Claude Code、Codex、Agent、MCP、RAG<br className="desktop-break" /> 和下一代 AI 开发方式。</p>
        <div className="hero-actions">
          <a className="button button-primary magnetic" href="#play">START YOUR FIRST VIBE <ArrowUpRight size={19} /></a>
          <a className="button button-ghost" href="#about">SCROLL TO EXPLORE <ArrowDown size={18} /></a>
        </div>
      </div>
      <div className="hero-index">[ 01 ]<br />VIBE<br />AI DEPARTMENT</div>
      <div className="hero-bottom-line"><span>CLAUDE CODE · CODEX · AGENT · MCP · RAG · OPENCLAW</span><span>SCROLL TO IGNITE <ArrowDown size={14} /></span></div>
    </section>
  )
}
