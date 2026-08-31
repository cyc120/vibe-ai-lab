import { ArrowUpRight } from 'lucide-react'
import { site } from '../config/site'

export default function Navigation() {
  return (
    <header className="navigation">
      <a className="brand" href="#top" aria-label="MOOC AI LAB home"><span className="brand-mark">&gt;_</span> MOOC AI LAB</a>
      <nav aria-label="Main navigation">
        <a href="#about">01 / ABOUT</a>
        <a href="#play">02 / PLAY</a>
        <a href="#roadmap">03 / ROADMAP</a>
        <a href="#join">04 / JOIN</a>
      </nav>
      <a className="nav-join" href={site.joinUrl}>JOIN US <ArrowUpRight size={17} strokeWidth={1.8} /></a>
    </header>
  )
}
