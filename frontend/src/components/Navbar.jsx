export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-cyan-500/10"
         style={{ background: 'rgba(5,5,16,0.85)' }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg btn-neon flex items-center justify-center text-white font-bold text-sm">
            IR
          </div>
          <span className="font-bold text-lg tracking-tight">
            <span className="text-gradient-cyan">LeetCode</span>
            <span className="text-slate-400"> IR Engine</span>
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          {['Home','Query','About'].map(link => (
            <a key={link}
               href={link === 'Home' ? '#' : link === 'Query' ? '#query' : '#about'}
               className="text-slate-400 hover:text-cyan-400 transition-colors duration-200 hover:neon-text">
              {link}
            </a>
          ))}
        </div>

        {/* Badge */}
        <div className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full"
             style={{ background:'rgba(6,182,212,0.08)', border:'1px solid rgba(6,182,212,0.2)', color:'#22d3ee' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          IR System Live
        </div>
      </div>
    </nav>
  )
}
