# AI Resume Matcher & ATS Checker (SaaS Edition)

A modern, high-converting, YC-startup tier web interface for an **AI Resume Matcher & ATS Checker**. Built with React 19, TypeScript, Tailwind CSS v4, Framer Motion, and Lucide React.

---

## 🚀 Key Features

1. **Clean SaaS Layout**:
   - Light and Dark mode toggle (persisted to localStorage & respects system preference).
   - Glassmorphic top navigation bar with brand badge, YC Grade engine pill, and action links.
   - Interactive testing controls to switch between score tiers:
     - 🟢 **82% (Strong Match / Green)** (Default mock data)
     - 🟡 **64% (Moderate Match / Amber)**
     - 🔴 **42% (Critical Gaps / Red)**

2. **Input Section**:
   - **PDF Drag-and-Drop Dropzone**: Dashed border with dynamic drag-over feedback, file type and size validation (up to 10MB), file stats preview, remove button, and a quick **"Use Sample Resume"** loader.
   - **Job Description Textarea**: Auto word and character counter, clear action, and **"Paste Sample JD"** button.
   - **"Analyze Match" Button**: Gradient glow, hover micro-interactions, and a multi-step **cinematic scanning modal** simulating semantic vector embeddings and ATS heuristic evaluation.

3. **Results Section**:
   - **Animated Circular Score Gauge**: Color-coded (<50 red, 50-75 amber/yellow, >75 emerald/green), radial ambient glow, smooth count-up spring animation, status pill badge, and confetti celebration on high scores!
   - **Sub-Metrics Breakdown**: Keyword Match %, ATS Parser Friendly %, and Relevance Vector %.
   - **Side-by-Side Cards**:
     - **✅ Identified Strengths** (emerald theme, checkmark badges, count badge)
     - **❌ Missing Keywords & Gaps** (rose theme, cross badges, count badge)
   - **Section-wise Recommendations**: Bordered cards with section badges (`Skills`, `Experience`, `Projects`, etc.), priority markers, and one-click "Copy Advice" action.
   - **Executive Verdict Alert Box**: Gradient border with highlight pill, key takeaway quote, and "Apply Fixes" action.
   - **Report Actions**: "Print Report" / Export to PDF, and "Re-run Scan".

---

## 🛠️ Tech Stack

- **React 19** + **TypeScript**
- **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Framer Motion** (Spring counters, entrance animations, and SVG stroke animations)
- **Lucide React** (Modern, clean icon set)
- **Canvas Confetti** (Celebration particle effect for strong matches)

---

## 🏃 Running the Application

### 1. Frontend Development Server
```bash
cd frontend
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Production Build
```bash
cd frontend
npm run build
npm run preview
```

### 3. Optional: Running with the Python Backend API
If you want to run the real Groq + ChromaDB backend:
```bash
# In the root workspace:
.\venv\Scripts\python api_server.py
```
This runs the API at `http://localhost:8000`. The frontend will automatically detect and query `http://localhost:8000/api/analyze` when available, falling back gracefully to mock mode if offline.
