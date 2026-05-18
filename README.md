# LeetCode Interview Helper

An Information Retrieval system that helps you find the most relevant LeetCode problems for your target company and role. Built with a Python/Flask backend using BM25 + TF-IDF retrieval and a React frontend.

---

## Features

- Query by company and job role (e.g. "Google SWE")
- BM25 + TF-IDF hybrid retrieval ranked by relevance
- KMeans topic clustering to surface problem patterns
- Random Forest difficulty/relevance scoring
- Clean React UI with instant results

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Python, Flask, Flask-CORS |
| IR | BM25 (`rank-bm25`), TF-IDF (`scikit-learn`) |
| ML | KMeans, PCA, Random Forest (`scikit-learn`) |
| Data | Pandas, NumPy, PyArrow |

---

## Project Structure

```
├── backend/
│   ├── app.py                  # Flask API server
│   ├── requirements.txt
│   └── ir_artifacts/           # Pre-built indexes & models
│       ├── final_ir_dataset.csv
│       ├── bm25_index.pkl
│       ├── tfidf_vectorizer.pkl
│       ├── tfidf_matrix.npz
│       ├── kmeans_model.pkl
│       ├── rf_model.pkl
│       └── ...
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── components/
│   │       ├── Hero.jsx
│   │       ├── Navbar.jsx
│   │       ├── QuerySection.jsx
│   │       ├── ResultsSection.jsx
│   │       ├── StatsBar.jsx
│   │       └── Footer.jsx
│   ├── package.json
│   └── vite.config.js
├── ir_system.ipynb             # IR pipeline notebook
└── leetcode_ir_project.ipynb  # Project analysis notebook
```

---

## Getting Started

### Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
# Runs on http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

---

## Author

**SriRam** — [GitHub](https://github.com/sriramchow)
