import { useEffect, useRef, useState } from 'react'

function CompanySearch({ companies, value, onChange }) {
  const [search, setSearch]   = useState(value)
  const [open, setOpen]       = useState(false)
  const [selected, setSelected] = useState(!!value)
  const wrapRef = useRef(null)

  const filtered = companies
    .filter(c => c.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 12)

  useEffect(() => {
    const handler = e => { if (!wrapRef.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const pick = c => { setSearch(c); onChange(c); setSelected(true); setOpen(false) }

  return (
    <div ref={wrapRef} className="relative">
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
        Target Company
      </label>
      <div className="relative">
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); setOpen(true); setSelected(false); onChange('') }}
          onFocus={() => setOpen(true)}
          placeholder="Search company (e.g. Google)..."
          className="w-full rounded-xl px-4 py-3.5 text-white placeholder-slate-600 text-sm outline-none transition-all duration-200"
          style={{
            background: 'rgba(13,17,23,0.9)',
            border: selected ? '1px solid rgba(6,182,212,0.5)' : '1px solid rgba(6,182,212,0.15)',
            boxShadow: selected ? '0 0 15px rgba(6,182,212,0.15)' : 'none',
          }}
        />
        {selected && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400 text-lg">✓</span>
        )}
      </div>

      {open && filtered.length > 0 && (
        <div className="absolute z-50 w-full mt-2 rounded-xl overflow-hidden"
             style={{ background:'rgba(10,10,26,0.98)', border:'1px solid rgba(6,182,212,0.2)', boxShadow:'0 20px 40px rgba(0,0,0,0.6)' }}>
          <div className="max-h-56 overflow-y-auto">
            {filtered.map(c => (
              <div key={c}
                   onMouseDown={() => pick(c)}
                   className="px-4 py-2.5 cursor-pointer text-sm text-slate-300 hover:text-cyan-400 transition-colors duration-150"
                   style={{ borderBottom:'1px solid rgba(255,255,255,0.03)' }}>
                {c}
              </div>
            ))}
          </div>
          <div className="px-4 py-2 text-xs text-slate-600 border-t border-white/5">
            {companies.length} companies available
          </div>
        </div>
      )}
    </div>
  )
}

export default function QuerySection({ onQuery, loading, api }) {
  const [companies, setCompanies] = useState([])
  const [roles, setRoles]         = useState([])
  const [company, setCompany]     = useState('')
  const [role, setRole]           = useState('software engineer')
  const [topK, setTopK]           = useState(10)

  useEffect(() => {
    fetch(`${api}/companies`).then(r => r.json()).then(setCompanies).catch(() => {})
    fetch(`${api}/roles`).then(r => r.json()).then(setRoles).catch(() => {})
  }, [api])

  const handleSubmit = e => {
    e.preventDefault()
    if (!company) return
    onQuery({ company, role, topK })
  }

  return (
    <section id="query" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-gradient">Find Your Problems</span>
          </h2>
          <p className="text-slate-400">
            Select a company and job role — the IR engine ranks problems by interview likelihood.
          </p>
        </div>

        {/* Query card */}
        <form onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-8 space-y-6"
              style={{ boxShadow:'0 0 40px rgba(6,182,212,0.08)' }}>

          {/* Company + Role row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CompanySearch companies={companies} value={company} onChange={setCompany} />

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                Job Role
              </label>
              <select
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full rounded-xl px-4 py-3.5 text-white text-sm outline-none cursor-pointer transition-all duration-200"
                style={{
                  background: 'rgba(13,17,23,0.9)',
                  border: '1px solid rgba(6,182,212,0.15)',
                  appearance: 'none',
                }}>
                {roles.map(r => (
                  <option key={r} value={r} style={{ background:'#0d1117' }}>
                    {r.replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Top-K slider */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Top Results
              </label>
              <span className="text-cyan-400 font-bold text-lg font-mono">{topK}</span>
            </div>
            <input
              type="range" min={5} max={25} value={topK}
              onChange={e => setTopK(Number(e.target.value))}
              className="w-full h-1.5 rounded-full cursor-pointer outline-none"
              style={{ accentColor:'#06b6d4', background:`linear-gradient(90deg, #06b6d4 ${((topK-5)/20)*100}%, rgba(30,41,59,0.8) ${((topK-5)/20)*100}%)` }}
            />
            <div className="flex justify-between text-xs text-slate-600 mt-1">
              <span>5</span><span>25</span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !company}
            className="w-full py-4 rounded-xl font-bold text-white text-base tracking-wide transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
            style={company && !loading ? {
              background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
              boxShadow: '0 0 25px rgba(6,182,212,0.4)'
            } : { background:'rgba(30,41,59,0.8)' }}>
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing with IR Engine...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Find Problems  →
              </span>
            )}
          </button>

          {!company && (
            <p className="text-center text-xs text-slate-600">
              Please search and select a company above
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
