import React, { useState } from 'react'
export default function AIHelper({ address }){
  const [query, setQuery] = useState('')
  const [answer, setAnswer] = useState(null)
  const ask = async () => {
    setAnswer('Loading... (connect to your AI backend endpoint that queries price feeds & historical data)')
    // integrate API call to backend here
  }
  return (
    <div className="bg-white/3 p-3 rounded">
      <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ask AI about this market e.g. 'probability of maize price > $100 by Dec'" className="w-full p-2 mb-2 rounded bg-darkBg/60" />
      <div className="flex gap-2">
        <button onClick={ask} className="bg-apmGold px-3 py-1 rounded text-darkBg">Ask AI</button>
      </div>
      {answer && <pre className="mt-3 text-sm text-white/70">{answer}</pre>}
    </div>
  )
}
