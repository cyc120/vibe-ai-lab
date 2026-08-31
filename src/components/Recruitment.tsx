import { useEffect, useRef, useState } from 'react'
import { Copy, ExternalLink, QrCode, X } from 'lucide-react'
import { site } from '../config/site'
import ColorField from './ColorField'

type CopyableContact = 'email' | 'qq' | 'wechat'
type QrCodeKey = 'group' | 'wechat'

const isPending = (value: string) => !value.trim() || value.trim() === '待填写'
const displayValue = (value: string) => isPending(value) ? (import.meta.env.DEV ? 'PENDING CONFIG' : '—') : value
const publicAsset = (fileName: string) => `${import.meta.env.BASE_URL}${fileName}`
const displayGroup = (value: string) => isPending(value) ? 'RECRUITMENT GROUP' : value

function copyWithFallback(value: string) {
  const field = document.createElement('textarea')
  field.value = value
  field.style.position = 'fixed'
  field.style.opacity = '0'
  document.body.append(field)
  field.select()
  const copied = document.execCommand('copy')
  field.remove()
  return copied
}

export default function Recruitment() {
  const [copied, setCopied] = useState<CopyableContact | null>(null)
  const [zoomedQr, setZoomedQr] = useState<QrCodeKey | null>(null)
  const copiedTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setZoomedQr(null)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      window.clearTimeout(copiedTimer.current)
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  const copyContact = async (key: CopyableContact, value: string) => {
    if (isPending(value)) return

    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(value)
      else if (!copyWithFallback(value)) return

      setCopied(key)
      window.clearTimeout(copiedTimer.current)
      copiedTimer.current = window.setTimeout(() => setCopied(null), 1800)
    } catch {
      if (!copyWithFallback(value)) return
      setCopied(key)
      window.clearTimeout(copiedTimer.current)
      copiedTimer.current = window.setTimeout(() => setCopied(null), 1800)
    }
  }

  const canOpenGithub = !isPending(site.githubUrl)
  const fields: Array<{ key: CopyableContact; label: string; value: string }> = [
    { key: 'email', label: 'EMAIL', value: site.contact.email },
    { key: 'qq', label: 'QQ', value: site.contact.qq },
    { key: 'wechat', label: 'WECHAT', value: site.contact.wechat },
  ]

  return (
    <section id="join" className="contact-section" aria-labelledby="join-title">
      <ColorField className="contact-color-field" colors="rgba(114, 243, 229, .28), rgba(215, 255, 63, .26)" />
      <div className="contact-grid">
        <div className="contact-copy">
          <p className="section-kicker">MOOC AI LAB <span>/</span> CONTACT + JOIN US</p>
          <h2 id="join-title">LET&apos;S<br />BUILD<br />SOMETHING<br /><em>COOL.</em></h2>
          <p className="contact-lede">下一位 AI Builder，也许就是你。</p>
          <p className="contact-subcopy">零基础也欢迎。<br />只要你愿意学习、折腾、Build。</p>
        </div>

        <div className="contact-terminal" aria-label="AI Lab contact details">
          <div className="contact-terminal-bar">
            <span><i className="window-dot red" /><i className="window-dot amber" /><i className="window-dot green" /> contact.terminal</span>
            <span>SECURE CHANNEL</span>
          </div>
          <div className="contact-terminal-content">
            <p className="contact-command"><span>$</span> contact --ai-lab</p>
            <div className="contact-list">
              <div className="contact-detail">
                <span className="contact-label">ROLE</span>
                <strong>{displayValue(site.contact.leaderTitle)}</strong>
              </div>
              <div className="contact-detail">
                <span className="contact-label">NAME</span>
                <strong>{displayValue(site.contact.leaderName)}</strong>
              </div>
              {fields.map(field => (
                <div className="contact-detail" key={field.key}>
                  <span className="contact-label">{field.label}</span>
                  <button
                    className="contact-copy-button magnetic"
                    type="button"
                    onClick={() => copyContact(field.key, field.value)}
                    disabled={isPending(field.value)}
                    aria-label={`Copy ${field.label}`}
                  >
                    <span className={isPending(field.value) ? 'is-placeholder' : ''}>{displayValue(field.value)}</span>
                    <span className="contact-action">{copied === field.key ? 'COPIED ✓' : <><Copy size={14} /> COPY</>}</span>
                  </button>
                </div>
              ))}
              <div className="contact-detail contact-github">
                <span className="contact-label">GITHUB</span>
                {canOpenGithub ? (
                  <a className="contact-copy-button magnetic" href={site.githubUrl} target="_blank" rel="noreferrer" aria-label="Open GitHub in a new tab">
                    <span>{site.githubUrl}</span><span className="contact-action"><ExternalLink size={14} /> OPEN</span>
                  </a>
                ) : (
                  <span className="contact-unavailable is-placeholder">{displayValue(site.githubUrl)}</span>
                )}
              </div>
              <div className="contact-detail contact-status">
                <span className="contact-label">STATUS</span>
                <strong>{displayValue(site.recruitmentStatus)} <i className="recruiting-dot" /></strong>
              </div>
            </div>
            <p className="contact-prompt">$ <span className="blink-cursor">_</span></p>
            <div className="join-qr-area">
              <div className="join-qr-grid">
                <div className="join-qr-card">
                  <button className="join-qr magnetic" type="button" onClick={() => setZoomedQr('group')} aria-label="Enlarge recruitment group QR code">
                    <img src={publicAsset('join-qr.jpg')} alt="Recruitment group QR code" />
                  </button>
                  <span className="join-qr-copy"><strong>GROUP QR</strong><span>SCAN TO JOIN</span><small>{displayGroup(site.qqGroup)}</small></span>
                </div>
                <div className="join-qr-card">
                  <button className="join-qr magnetic" type="button" onClick={() => setZoomedQr('wechat')} aria-label="Enlarge personal WeChat QR code">
                    <img src={publicAsset('wechat-qr.jpg')} alt="Personal WeChat QR code" />
                  </button>
                  <span className="join-qr-copy"><strong>WECHAT QR</strong><span>SCAN TO CONNECT</span><small>{displayValue(site.contact.wechat)}</small></span>
                </div>
              </div>
              <QrCode size={24} aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      <footer className="contact-footer">
        <p>MOOC AI LAB<br />2026 RECRUITMENT</p>
        <div>
          <span>SYSTEM STATUS</span>
          <strong>RECRUITMENT: OPEN</strong>
          <small>NEW MEMBERS: WELCOME</small>
        </div>
      </footer>
      {zoomedQr && (
        <div className="qr-lightbox" role="dialog" aria-modal="true" aria-labelledby="qr-lightbox-title" onClick={() => setZoomedQr(null)}>
          <div className="qr-lightbox-panel" onClick={event => event.stopPropagation()}>
            <div className="qr-lightbox-head">
              <p id="qr-lightbox-title">{zoomedQr === 'group' ? 'RECRUITMENT GROUP QR' : 'PERSONAL WECHAT QR'}</p>
              <button className="qr-lightbox-close magnetic" type="button" onClick={() => setZoomedQr(null)} aria-label="Close QR code preview"><X size={20} /></button>
            </div>
            <img src={publicAsset(zoomedQr === 'group' ? 'join-qr.jpg' : 'wechat-qr.jpg')} alt={zoomedQr === 'group' ? 'Enlarged recruitment group QR code' : 'Enlarged personal WeChat QR code'} />
            <span>CLICK OUTSIDE OR PRESS ESC TO CLOSE</span>
          </div>
        </div>
      )}
    </section>
  )
}
