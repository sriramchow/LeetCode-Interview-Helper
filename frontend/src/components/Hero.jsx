export default function Hero({ onStart }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">

      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-100" />

      {/* Radial hero glow */}
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full opacity-10 animate-float"
           style={{ background:'radial-gradient(circle, #06b6d4, transparent 70%)', filter:'blur(40px)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-8 animate-float"
           style={{ background:'radial-gradient(circle, #3b82f6, transparent 70%)', filter:'blur(60px)', animationDelay:'3s' }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-semibold tracking-widest uppercase"
             style={{ background:'rgba(6,182,212,0.08)', border:'1px solid rgba(6,182,212,0.25)', color:'#22d3ee' }}>
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          AI-Powered Information Retrieval
        </div>

        {/* Main heading */}
        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 leading-tight tracking-tight">
          <span className="text-gradient">LeetCode</span>
          <br />
          <span className="text-white">IR Engine</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed">
          Predict exactly which problems{' '}
          <span className="text-cyan-400 font-semibold">Google, Amazon & Meta</span>{' '}
          will ask in your interview — powered by
        </p>
        <p className="text-sm text-slate-500 mb-12 font-mono tracking-wider">
          BM25 · TF-IDF · Inverted Index · Random Forest · K-Means Clustering
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={onStart}
                  className="btn-neon px-8 py-4 rounded-xl font-bold text-white text-base tracking-wide">
            Start Analyzing →
          </button>
          <a href="#about"
             className="px-8 py-4 rounded-xl font-semibold text-slate-400 text-base border border-slate-700 hover:border-cyan-500/40 hover:text-cyan-400 transition-all duration-300">
            Learn More
          </a>
        </div>

        {/* Tech pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-16">
          {['187+ Companies','3,800+ Problems','10 Topic Clusters','BM25 Ranking','Random Forest'].map(tag => (
            <span key={tag} className="topic-chip text-xs py-1.5 px-3">{tag}</span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 text-xs">
        <span>Scroll to explore</span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent" />
      </div>
    </section>
  )
}
