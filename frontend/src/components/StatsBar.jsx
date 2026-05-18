import { useEffect, useState } from 'react'

function AnimatedCount({ target, suffix = '' }) {
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!target) return
    setVal(0)
    let current = 0
    const step  = target / 50
    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        setVal(target)
        clearInterval(timer)
      } else {
        setVal(Math.floor(current))
      }
    }, 30)
    return () => clearInterval(timer)
  }, [target])

  return <>{val.toLocaleString()}{suffix}</>
}

const STAT_ICONS = {
  'Problems':  '📋',
  'Companies': '🏢',
  'Topics':    '🏷️',
  'Accuracy':  '🎯',
}

export default function StatsBar({ api }) {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetch(`${api}/stats`)
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(d => setStats(d))
      .catch(() => {
        // Fallback values when backend is not yet reachable
        setStats({ total_problems: 3833, total_companies: 187, total_topics: 62 })
      })
  }, [api])

  const items = stats ? [
    { label: 'Problems',  value: stats.total_problems,  suffix: '+' },
    { label: 'Companies', value: stats.total_companies, suffix: '' },
    { label: 'Topics',    value: stats.total_topics,    suffix: '' },
    { label: 'Accuracy',  value: 84,                    suffix: '%' },
  ] : []

  if (!stats) return null

  return (
    <section className="relative py-16 border-y border-cyan-500/10">
      <div className="absolute inset-0" style={{ background:'rgba(6,182,212,0.02)' }} />
      <div className="relative z-10 max-w-6xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map(({ label, value, suffix }) => (
            <div key={label}
                 className="glass-card rounded-2xl p-6 text-center group hover:animate-glow-pulse transition-all duration-300">
              <div className="text-3xl mb-2">{STAT_ICONS[label]}</div>
              <div className="text-3xl md:text-4xl font-extrabold text-gradient-cyan mb-1">
                <AnimatedCount target={value} suffix={suffix} />
              </div>
              <div className="text-slate-500 text-sm font-medium uppercase tracking-wider">{label}</div>
              <div className="mt-3 h-px w-12 mx-auto"
                   style={{ background:'linear-gradient(90deg, transparent, #06b6d4, transparent)' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
