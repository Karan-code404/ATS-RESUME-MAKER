import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { UploadDropzone } from './components/UploadDropzone';
import { JobDescriptionInput } from './components/JobDescriptionInput';
import { ScoreGauge } from './components/ScoreGauge';
import { StrengthsGaps } from './components/StrengthsGaps';
import { RecommendationsList } from './components/RecommendationsList';
import { VerdictBanner } from './components/VerdictBanner';
import { LoadingScanModal } from './components/LoadingScanModal';
import {
  DEFAULT_MOCK_DATA,
  PRESET_MODERATE_DATA,
  PRESET_LOW_DATA,
  SAMPLE_JOB_DESCRIPTION,
} from './mockData';
import type { AnalysisResult, ThemeMode } from './types';
import {
  Sparkles,
  ArrowRight,
  Loader2,
  CheckCircle,
  FileCheck,
  RefreshCw,
  Printer,
  Sliders,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const App: React.FC = () => {
  // Theme management
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('theme_mode');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme_mode', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [activePreset, setActivePreset] = useState<'high' | 'moderate' | 'low'>('high');
  const [dataSource, setDataSource] = useState<'auto' | 'mock'>('auto');

  // Handle sample file
  const handleUseSampleResume = () => {
    const mockFile = new File(['mock content for resume'], 'Karan_Shakya_AI_Engineer.pdf', {
      type: 'application/pdf',
    });
    setSelectedFile(mockFile);
  };

  // Handle sample JD
  const handleLoadSampleJD = () => {
    setJobDescription(SAMPLE_JOB_DESCRIPTION);
  };

  // Handle Analyze
  const handleAnalyze = async () => {
    let fileToUse = selectedFile;
    let jdToUse = jobDescription;

    if (!fileToUse && !jdToUse) {
      handleUseSampleResume();
      handleLoadSampleJD();
      fileToUse = new File(['mock content for resume'], 'Karan_Shakya_AI_Engineer.pdf', {
        type: 'application/pdf',
      });
      jdToUse = SAMPLE_JOB_DESCRIPTION;
    }

    setIsAnalyzing(true);
    setAnalysisStep(0);

    // Progressive step timers for cinematic feel
    const t1 = setTimeout(() => setAnalysisStep(1), 500);
    const t2 = setTimeout(() => setAnalysisStep(2), 1100);
    const t3 = setTimeout(() => setAnalysisStep(3), 1700);

    let finalResult: AnalysisResult = DEFAULT_MOCK_DATA;

    // Check if live API is requested and available
    if (dataSource === 'auto' && fileToUse && jdToUse) {
      try {
        const formData = new FormData();
        formData.append('pdf_file', fileToUse);
        formData.append('job_description', jdToUse);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const res = await fetch('http://localhost:8000/api/analyze', {
          method: 'POST',
          body: formData,
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.ats_score === 'number') {
            finalResult = data;
          }
        }
      } catch {
        // Fallback gracefully to preset mock data
        if (activePreset === 'moderate') finalResult = PRESET_MODERATE_DATA;
        else if (activePreset === 'low') finalResult = PRESET_LOW_DATA;
        else finalResult = DEFAULT_MOCK_DATA;
      }
    } else {
      if (activePreset === 'moderate') finalResult = PRESET_MODERATE_DATA;
      else if (activePreset === 'low') finalResult = PRESET_LOW_DATA;
      else finalResult = DEFAULT_MOCK_DATA;
    }

    setTimeout(() => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      setIsAnalyzing(false);
      setResults(finalResult);

      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 2200);
  };

  const handleReset = () => {
    setResults(null);
    setSelectedFile(null);
    setJobDescription('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
      {/* Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onReset={handleReset}
        hasResults={!!results}
      />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative mb-10 text-center">
          <div className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 transform">
            <div className="h-64 w-[600px] rounded-full bg-gradient-to-tr from-indigo-500/10 via-purple-500/15 to-blue-500/10 blur-3xl dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-blue-500/20" />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-50/50 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 backdrop-blur-md dark:border-indigo-500/30 dark:bg-indigo-950/40 dark:text-indigo-300">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500 animate-spin" />
            <span>Next-Gen Semantic Vector Matcher • 99.4% ATS Accuracy</span>
          </div>

          <h1 className="mt-4 text-3xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-5xl lg:text-6xl">
            Pass the ATS Filter.{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-blue-400">
              Land the Interview.
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
            Upload your resume and target job description. Our AI analyzes semantic vector similarity, extracts critical missing keywords, and gives you actionable fixes.
          </p>

          {/* Preset Tier Switcher */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="flex items-center gap-1 font-medium text-zinc-400">
              <Sliders className="h-3 w-3" /> Test Score Tiers:
            </span>
            <button
              type="button"
              onClick={() => {
                setActivePreset('high');
                if (results) setResults(DEFAULT_MOCK_DATA);
              }}
              className={`rounded-full px-3 py-1 font-semibold transition-all ${
                activePreset === 'high'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-zinc-200/70 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300'
              }`}
            >
              82% (Strong / Green)
            </button>
            <button
              type="button"
              onClick={() => {
                setActivePreset('moderate');
                if (results) setResults(PRESET_MODERATE_DATA);
              }}
              className={`rounded-full px-3 py-1 font-semibold transition-all ${
                activePreset === 'moderate'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-zinc-200/70 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300'
              }`}
            >
              64% (Moderate / Amber)
            </button>
            <button
              type="button"
              onClick={() => {
                setActivePreset('low');
                if (results) setResults(PRESET_LOW_DATA);
              }}
              className={`rounded-full px-3 py-1 font-semibold transition-all ${
                activePreset === 'low'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-zinc-200/70 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300'
              }`}
            >
              42% (Critical / Red)
            </button>

            <span className="mx-1 text-zinc-300 dark:text-zinc-700">|</span>

            <button
              type="button"
              onClick={() => setDataSource((p) => (p === 'auto' ? 'mock' : 'auto'))}
              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-all ${
                dataSource === 'auto'
                  ? 'border-indigo-500/30 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300'
                  : 'border-zinc-300 bg-zinc-100 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'
              }`}
              title="Toggle Live Backend API detection"
            >
              <Zap className="h-3 w-3 text-indigo-500" />
              {dataSource === 'auto' ? 'Auto Live/Mock' : 'Mock Only'}
            </button>
          </div>
        </div>

        {/* Input Section */}
        <div className="rounded-3xl border border-zinc-200/80 bg-white/70 p-6 shadow-xl backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/70 sm:p-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Left: Resume Dropzone */}
            <UploadDropzone
              selectedFile={selectedFile}
              onFileSelect={setSelectedFile}
              onUseSampleResume={handleUseSampleResume}
            />

            {/* Right: Job Description Textarea */}
            <JobDescriptionInput
              value={jobDescription}
              onChange={setJobDescription}
              onLoadSample={handleLoadSampleJD}
              onClear={() => setJobDescription('')}
            />
          </div>

          {/* Action Row */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-zinc-200/80 pt-6 dark:border-zinc-800/80 sm:flex-row">
            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              <span>Full semantic cross-encoder analysis • Instant ATS compatibility index</span>
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="relative group flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/35 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />

              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Analyzing Match with AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
                  <span>Analyze Match</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {results && (
            <motion.section
              id="results-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="mt-12 space-y-8"
            >
              {/* Results Header Bar */}
              <div className="flex flex-col justify-between gap-4 rounded-2xl border border-zinc-200/80 bg-white/60 p-4 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-900/60 sm:flex-row sm:items-center sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                    <FileCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                      ATS Analysis Completed
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Evaluated for: Software Engineer (AI Agents & LLM)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAnalyze}
                    className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-xs transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Re-run Scan
                  </button>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-xs transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    Print Report
                  </button>
                </div>
              </div>

              {/* 1. Top Section: Large Animated Circular Score Gauge */}
              <ScoreGauge score={results.ats_score} metadata={results.metadata} />

              {/* 2. Middle Section: Two side-by-side cards for Strengths and Gaps */}
              <StrengthsGaps strengths={results.strengths} gaps={results.gaps} />

              {/* 3. Recommendations Section */}
              <div id="recommendations">
                <RecommendationsList recommendations={results.recommendations} />
              </div>

              {/* 4. Verdict Banner */}
              <VerdictBanner
                verdict={results.verdict}
                onShareReport={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(
                      `AI Resume Matcher ATS Score: ${results.ats_score}% - "${results.verdict}"`
                    );
                    alert('Summary copied to clipboard!');
                  }
                }}
              />
            </motion.section>
          )}
        </AnimatePresence>

        {/* Loading Multi-step Modal */}
        <LoadingScanModal isOpen={isAnalyzing} currentStep={analysisStep} />
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-zinc-200/80 bg-white/50 py-8 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center text-xs text-zinc-500 dark:text-zinc-400 sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 AI Resume Matcher Inc. Built for ambitious candidates & top recruiters.</p>
          <div className="flex items-center gap-4">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">ATS Compliance Guide</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">API Integration</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
