const DIFF_STYLES = {
  Easy:   { bg:'rgba(34,197,94,0.1)',  border:'rgba(34,197,94,0.4)',  text:'#4ade80' },
  Medium: { bg:'rgba(245,158,11,0.1)', border:'rgba(245,158,11,0.4)', text:'#fbbf24' },
  Hard:   { bg:'rgba(239,68,68,0.1)',  border:'rgba(239,68,68,0.4)',  text:'#f87171' },
}

function ResultCard({ item, idx }) {
  const diff   = DIFF_STYLES[item.difficulty] || DIFF_STYLES.Medium
  const topics = item.topics.split(',').map(t => t.trim()).filter(Boolean).slice(0, 5)
  const score  = Math.round(item.combined_score * 100)

  return (
    <div
      className="glass-card rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01] opacity-0 animate-slide-up"
      style={{ animationDelay: `${idx * 60}ms`, animationFillMode:'forwards' }}>

      {/* Header row */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Rank */}
          <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-sm font-mono"
               style={{ background:'rgba(6,182,212,0.1)', border:'1px solid rgba(6,182,212,0.3)', color:'#22d3ee' }}>
            #{item.rank}
          </div>

          {/* Title */}
          <a href={item.url || '#'} target="_blank" rel="noopener noreferrer"
             className="text-base font-semibold text-slate-100 hover:text-cyan-400 transition-colors duration-200 truncate leading-tight">
            {item.title}
          </a>
        </div>

        {/* Difficulty badge */}
        <span className="flex-shrink-0 text-xs font-bold px-3 py-1 rounded-full"
              style={{ background:diff.bg, border:`1px solid ${diff.border}`, color:diff.text }}>
          {item.difficulty}
        </span>
      </div>

      {/* Topics */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {topics.map(t => <span key={t} className="topic-chip">{t}</span>)}
      </div>

      {/* Score bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-500 mb-1.5">
          <span>IR Combined Score</span>
          <span className="text-cyan-400 font-mono font-semibold">{item.combined_score.toFixed(4)}</span>
        </div>
        <div className="w-full h-1.5 rounded-full" style={{ background:'rgba(30,41,59,0.8)' }}>
          <div className="score-bar" style={{ width: `${Math.min(score * 1.5, 100)}%` }} />
        </div>
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-5 text-xs text-slate-500 flex-wrap">
        <span className="flex items-center gap-1.5">
          <span className="text-cyan-500">⟳</span>
          <span className="text-slate-400 font-medium">{item.frequency}×</span> asked
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-cyan-500">✓</span>
          <span className="text-slate-400 font-medium">{item.acceptance_rate}%</span> acceptance
        </span>
        {item.cluster_label && (
          <span className="flex items-center gap-1.5">
            <span className="text-cyan-500">◈</span>
            <span className="text-slate-400 font-medium capitalize">{item.cluster_label}</span> cluster
          </span>
        )}
        <a href={item.url || '#'} target="_blank" rel="noopener noreferrer"
           className="ml-auto flex items-center gap-1 text-cyan-500 hover:text-cyan-300 transition-colors">
          Open →
        </a>
      </div>
    </div>
  )
}

export default function ResultsSection({ data }) {
  const { company, role, total_candidates, results } = data

  const diffCounts = results.reduce((acc, r) => {
    acc[r.difficulty] = (acc[r.difficulty] || 0) + 1; return acc
  }, {})

  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Results header */}
        <div className="glass-card rounded-2xl p-6 mb-8"
             style={{ borderColor:'rgba(6,182,212,0.25)', boxShadow:'0 0 30px rgba(6,182,212,0.06)' }}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <h3 className="text-xl font-bold text-white">
                  {results.length} Results for{' '}
                  <span className="text-cyan-400">{company}</span>
                  {' '}·{' '}
                  <span className="text-blue-400 capitalize">{role}</span>
                </h3>
              </div>
              <p className="text-slate-500 text-sm">
                Ranked from {total_candidates} candidate problems using BM25 + Relevance Score
              </p>
            </div>

            {/* Difficulty distribution pills */}
            <div className="flex gap-2">
              {['Easy','Medium','Hard'].map(d => diffCounts[d] ? (
                <span key={d} className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background:DIFF_STYLES[d].bg, border:`1px solid ${DIFF_STYLES[d].border}`, color:DIFF_STYLES[d].text }}>
                  {diffCounts[d]} {d}
                </span>
              ) : null)}
            </div>
          </div>
        </div>

        {/* Result cards */}
        <div className="space-y-4">
          {results.map((item, i) => <ResultCard key={i} item={item} idx={i} />)}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-slate-600 mt-10">
          Ranked by combined score = 0.5 × BM25(role topics) + 0.5 × Relevance Score (frequency + difficulty)
        </p>
      </div>
    </section>
  )
}
