import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, X } from 'lucide-react'
import { promptQuestions } from '../data/prompts'

export default function PromptBattle() {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const question = promptQuestions[questionIndex]
  const choose = (index: number) => { if (selected === null) { setSelected(index); if (index === question.correct) setScore(value => value + 1) } }
  const next = () => { if (questionIndex === promptQuestions.length - 1) { setFinished(true); return }; setQuestionIndex(index => index + 1); setSelected(null) }
  const reset = () => { setQuestionIndex(0); setSelected(null); setScore(0); setFinished(false) }

  return <section id="battle" className="battle-section" aria-labelledby="battle-title">
    <div className="battle-intro"><p className="section-kicker">PLAYGROUND 02 <span>/</span> CHOOSE WISELY</p><h2 id="battle-title">你真的会<br /><em>和 AI 说话吗？</em></h2><p>同一个任务，不同的描述方式，会把 AI 带往完全不同的方向。</p><div className="battle-score"><span>MISSION {String(questionIndex + 1).padStart(2, '0')}</span><div>{promptQuestions.map((_, index) => <i className={index < questionIndex || (finished && index < score) ? 'passed' : index === questionIndex ? 'active' : ''} key={index} />)}</div><span>{score} / 3</span></div></div>
    <div className="battle-board">{!finished ? <><div className="mission-header"><span>{question.title}</span><span>INPUT QUALITY TEST</span></div><h3>{question.task}</h3><div className="answer-grid">{question.answers.map((answer, index) => { const isChosen = selected === index; const isCorrect = index === question.correct; return <button className={`prompt-answer ${selected !== null ? (isCorrect ? 'correct' : isChosen ? 'wrong' : 'muted') : ''}`} onClick={() => choose(index)} type="button" key={answer}><b>{index === 0 ? 'A' : 'B'}</b><span>{answer}</span>{selected !== null && isCorrect && <Check size={19} />}{selected !== null && isChosen && !isCorrect && <X size={19} />}</button> })}</div>{selected !== null && <div className={`prompt-feedback ${selected === question.correct ? 'good' : 'retry'}`}><div>{selected === question.correct ? <Check size={22} /> : <X size={22} />}<span><b>{selected === question.correct ? 'GOOD PROMPT' : 'NOT QUITE'}</b>{question.lesson}</span></div><button type="button" onClick={next}>{questionIndex === 2 ? 'VIEW RESULT' : 'NEXT MISSION'} <ArrowRight size={16} /></button></div>}</> : <div className="battle-result"><p>ASSESSMENT COMPLETE / 2026</p><b>{score === 3 ? 'VIBE CODER' : score === 2 ? 'PROMPT PLAYER' : 'AI USER'}</b><strong>{score === 3 ? 'UNLOCKED.' : `LEVEL ${score + 1} UNLOCKED.`}</strong><span>{score === 3 ? '你已经知道如何给想法加上方向感。下一步，让 AI 为你行动。' : '方向、上下文和约束，是让 AI 真正理解你的起点。'}</span><button type="button" onClick={reset}><RotateCcw size={16} /> PLAY AGAIN</button></div>}</div>
  </section>
}
