const words = ['VIBE CODING', 'CLAUDE CODE', 'CODEX', 'DEEPSEEK', 'OPENCLAW', 'AGENT', 'MCP', 'RAG', 'BUILD SOMETHING COOL']

export default function Ticker() {
  const line = [...words, ...words]
  return (
    <div className="ticker" aria-label="AI technology topics">
      <div className="ticker-track">
        {line.map((word, index) => <span key={`${word}-${index}`}>{word}<i>/</i></span>)}
      </div>
    </div>
  )
}
