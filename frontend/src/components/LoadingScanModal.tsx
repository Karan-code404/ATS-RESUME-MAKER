import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

interface LoadingScanModalProps {
  isOpen: boolean;
  currentStep: number;
}

const STEPS = [
  'Extracting text layers & parsing PDF structure...',
  'Computing 384-dim semantic embeddings...',
  'Evaluating against ATS keyword densities & filters...',
  'Running LLM heuristic validation & gap synthesis...',
];

export const LoadingScanModal: React.FC<LoadingScanModalProps> = ({ isOpen, currentStep }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 sm:p-8"
          >
            {/* Ambient animated glow */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Radar pulse icon */}
              <div className="relative mb-5 flex h-20 w-20 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping" />
                <div className="absolute inset-2 rounded-full bg-indigo-500/30 animate-pulse" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-500/30">
                  <Cpu className="h-7 w-7 animate-bounce" />
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 mb-2">
                <Sparkles className="h-3 w-3" />
                Deep ATS Scanner Active
              </div>

              <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Analyzing Match & Scoring
              </h3>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Applying semantic cross-attention between resume vectors and job prerequisites
              </p>

              {/* Progress steps */}
              <div className="mt-6 w-full space-y-3 text-left">
                {STEPS.map((stepText, idx) => {
                  const isDone = currentStep > idx;
                  const isCurrent = currentStep === idx;

                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 rounded-xl border p-2.5 text-xs transition-all ${
                        isDone
                          ? 'border-emerald-500/30 bg-emerald-50/50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-950/20 dark:text-emerald-300'
                          : isCurrent
                          ? 'border-indigo-500/40 bg-indigo-50/50 font-semibold text-indigo-700 shadow-xs dark:border-indigo-500/30 dark:bg-indigo-950/20 dark:text-indigo-300'
                          : 'border-zinc-200/60 bg-zinc-50/40 text-zinc-400 dark:border-zinc-800 dark:bg-zinc-800/30 dark:text-zinc-600'
                      }`}
                    >
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                        {isDone ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        ) : isCurrent ? (
                          <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />
                        ) : (
                          <div className="h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                        )}
                      </div>
                      <span className="truncate">{stepText}</span>
                    </div>
                  );
                })}
              </div>

              {/* Progress Bar */}
              <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-500"
                  initial={{ width: '0%' }}
                  animate={{ width: `${Math.min(100, (currentStep + 1) * 25)}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
