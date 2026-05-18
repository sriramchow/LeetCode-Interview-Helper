import { useState, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import QuerySection from './components/QuerySection'
import ResultsSection from './components/ResultsSection'
import Footer from './components/Footer'

const API = '/api'

export default function App() {
  const [results, setResults]   = useState(null)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)
  const resultsRef = useRef(null)

  const handleQuery = async ({ company, role, topK }) => {
    setLoading(true)
    setError(null)
    setResults(null)

    try {
      const res = await fetch(`${API}/query`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company, role, top_k: topK }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Query failed')
      }

      const data = await res.json()
      setResults(data)

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100">
      <Navbar />
      <Hero onStart={() => document.getElementById('query')?.scrollIntoView({ behavior: 'smooth' })} />
      <StatsBar api={API} />
      <QuerySection onQuery={handleQuery} loading={loading} api={API} />

      {error && (
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="glass-card neon-border rounded-xl p-4 text-red-400 flex items-center gap-3">
            <span className="text-xl">⚠</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      <div ref={resultsRef}>
        {results && <ResultsSection data={results} />}
      </div>

      <Footer />
    </div>
  )
}
