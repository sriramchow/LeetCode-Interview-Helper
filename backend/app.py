import os, re, pickle, warnings
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

warnings.filterwarnings("ignore")

app = Flask(__name__)
CORS(app)

SAVE_DIR = os.path.join(os.path.dirname(__file__), 'ir_artifacts')

# ── Load dataset ─────────────────────────────────────────────────────────────
print("Loading IR system...")
df = pd.read_csv(os.path.join(SAVE_DIR, 'final_ir_dataset.csv'))

for col in ['frequency','difficulty_num','acceptance_rate','likes','dislikes','relevance_score','freq_score']:
    df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0)

df['topics']    = df['topics'].fillna('Unknown')
df['topics_list'] = df['topics'].apply(
    lambda x: [t.strip().lower() for t in str(x).split(',')
               if t.strip() and t.strip().lower() not in ('unknown','nan','')]
)
df['doc_text'] = df.apply(
    lambda r: ' '.join(r['topics_list'] + re.sub(r'[^a-z0-9 ]','',r['title'].lower()).split()),
    axis=1
)
df['tokenized'] = df['doc_text'].apply(str.split)
df['doc_id']    = df.index

# ── Load indexes & models ─────────────────────────────────────────────────────
with open(os.path.join(SAVE_DIR, 'company_index.pkl'),  'rb') as f: company_index = pickle.load(f)
with open(os.path.join(SAVE_DIR, 'topic_index.pkl'),    'rb') as f: topic_index   = pickle.load(f)
with open(os.path.join(SAVE_DIR, 'role_topics.pkl'),    'rb') as f: ROLE_TOPICS   = pickle.load(f)
with open(os.path.join(SAVE_DIR, 'cluster_labels.pkl'), 'rb') as f: cluster_labels = pickle.load(f)

try:
    from rank_bm25 import BM25Okapi
    BM25_OK = True
except ImportError:
    BM25_OK = False
    print("Warning: rank-bm25 not found, using relevance score only")

print(f"Ready — {len(df)} problems | {len(company_index)} companies")

# ── Helpers ───────────────────────────────────────────────────────────────────
def safe_val(v, default=0):
    try:
        if pd.isna(v): return default
    except: pass
    return v if v is not None else default

# ── Routes ────────────────────────────────────────────────────────────────────
@app.route('/api/health')
def health():
    return jsonify({'status': 'ok', 'problems': len(df), 'companies': len(company_index)})

@app.route('/api/companies')
def get_companies():
    return jsonify(sorted(df['company'].unique().tolist()))

@app.route('/api/roles')
def get_roles():
    return jsonify(list(ROLE_TOPICS.keys()))

@app.route('/api/stats')
def get_stats():
    all_topics = [t for row in df['topics_list'] for t in row]
    return jsonify({
        'total_problems':  int(len(df)),
        'total_companies': int(df['company'].nunique()),
        'total_topics':    int(len(set(all_topics))),
        'difficulty_dist': df['difficulty'].value_counts().to_dict(),
    })

@app.route('/api/query', methods=['POST'])
def query():
    data     = request.get_json() or {}
    company  = str(data.get('company', '')).strip()
    role     = str(data.get('role', 'software engineer')).strip()
    top_k    = min(int(data.get('top_k', 10)), 30)

    co_key   = company.lower()
    role_key = role.lower()

    # Fuzzy company match
    if co_key not in company_index:
        matches = [k for k in company_index if co_key in k]
        if not matches:
            return jsonify({'error': f"Company '{company}' not found. Try a different name."}), 404
        co_key = matches[0]

    cand_ids = company_index[co_key]
    cands    = df.loc[cand_ids].copy().reset_index(drop=True)

    query_terms = ROLE_TOPICS.get(role_key, role_key.split())

    # BM25 scoring
    if BM25_OK and len(cands) > 0:
        local_bm25  = BM25Okapi(cands['tokenized'].tolist())
        raw         = local_bm25.get_scores(query_terms)
        rng         = raw.max() - raw.min()
        norm_scores = (raw - raw.min()) / (rng + 1e-9)
    else:
        norm_scores = np.zeros(len(cands))

    cands['bm25_score']     = norm_scores
    cands['combined_score'] = (0.5 * cands['bm25_score'] + 0.5 * cands['relevance_score']).round(4)

    result  = cands.sort_values('combined_score', ascending=False).head(top_k)
    records = []
    for i, (_, row) in enumerate(result.iterrows()):
        records.append({
            'rank':            i + 1,
            'title':           str(row['title']),
            'difficulty':      str(row.get('difficulty', 'Medium')),
            'topics':          str(row.get('topics', '')),
            'frequency':       int(safe_val(row.get('frequency', 0))),
            'combined_score':  round(float(safe_val(row.get('combined_score', 0))), 4),
            'bm25_score':      round(float(safe_val(row.get('bm25_score', 0))), 4),
            'relevance_score': round(float(safe_val(row.get('relevance_score', 0))), 4),
            'acceptance_rate': round(float(safe_val(row.get('acceptance_rate', 0))), 2),
            'cluster_label':   str(row.get('cluster_label', '')),
            'url':             str(row.get('url', '')),
        })

    return jsonify({
        'company':          company,
        'role':             role,
        'total_candidates': int(len(cands)),
        'results':          records,
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')
