export default function Footer() {
  return (
    <footer id="about" className="border-t border-cyan-500/10 py-16 px-6 mt-12">
      <div className="max-w-6xl mx-auto">

        {/* About section */}
        <div className="glass-card rounded-2xl p-8 mb-10">
          <h3 className="text-2xl font-bold text-gradient mb-6">About This IR System</h3>
          <div className="grid md:grid-cols-3 gap-8 text-sm text-slate-400 leading-relaxed">
            <div>
              <h4 className="text-cyan-400 font-semibold mb-2 uppercase tracking-wider text-xs">Retrieval Layer</h4>
              <p>Inverted indexes map companies and topics to problem IDs for O(1) candidate retrieval across 187 companies.</p>
            </div>
            <div>
              <h4 className="text-cyan-400 font-semibold mb-2 uppercase tracking-wider text-xs">Ranking Layer</h4>
              <p>BM25Okapi ranks problems against job-role topic queries. Combined with historical relevance scores for final ranking.</p>
            </div>
            <div>
              <h4 className="text-cyan-400 font-semibold mb-2 uppercase tracking-wider text-xs">Prediction Layer</h4>
              <p>Random Forest classifier trained on frequency, difficulty, and TF-IDF cluster features to predict interview likelihood.</p>
            </div>
          </div>
        </div>

        {/* Tech stack pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {['Python','Flask','Pandas','rank-bm25','scikit-learn','TF-IDF','K-Means','React','Vite','Tailwind CSS'].map(t => (
            <span key={t} className="topic-chip text-xs py-1.5 px-3">{t}</span>
          ))}
        </div>

        <div className="text-center text-slate-600 text-sm">
          <p>LeetCode IR Engine · Information Retrieval System Project</p>
          <p className="mt-1 text-xs">Built with BM25 · TF-IDF · Inverted Index · Random Forest</p>
        </div>
      </div>
    </footer>
  )
}
