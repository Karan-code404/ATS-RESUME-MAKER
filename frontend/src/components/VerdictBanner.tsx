import React from 'react';
import { motion } from 'framer-motion';
import { Zap, CheckCheck, ArrowRight, Share2 } from 'lucide-react';

interface VerdictBannerProps {
  verdict: string;
  onShareReport?: () => void;
}

export const VerdictBanner: React.FC<VerdictBannerProps> = ({ verdict, onShareReport }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl border border-indigo-500/40 bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-blue-950/40 p-6 shadow-xl backdrop-blur-xl dark:border-indigo-500/30 sm:p-7"
    >
      {/* Decorative gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-indigo-500/10 via-transparent to-transparent" />

      <div className="relative z-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25">
            <Zap className="h-6 w-6 stroke-[2.5]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Executive AI Verdict
              </span>
              <span className="flex items-center gap-1 rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300">
                <CheckCheck className="h-3 w-3" /> Ready for Recruiter Review
              </span>
            </div>
            <p className="mt-1.5 text-base font-semibold leading-relaxed text-zinc-900 dark:text-zinc-100 sm:text-lg">
              "{verdict}"
            </p>
          </div>
        </div>

        <div className="flex w-full items-center gap-3 sm:w-auto">
          {onShareReport && (
            <button
              type="button"
              onClick={onShareReport}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white/80 px-4 py-2.5 text-xs font-semibold text-zinc-800 shadow-xs transition-all hover:bg-white hover:shadow dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-200 dark:hover:bg-zinc-800 sm:flex-initial"
            >
              <Share2 className="h-3.5 w-3.5" />
              Share
            </button>
          )}

          <a
            href="#recommendations"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 transition-all hover:from-indigo-500 hover:to-blue-500 hover:shadow-lg hover:shadow-indigo-500/30 sm:flex-initial"
          >
            Apply Fixes Now
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};
