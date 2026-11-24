import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ShieldCheck, AlertCircle } from 'lucide-react';

interface StrengthsGapsProps {
  strengths: string[];
  gaps: string[];
}

export const StrengthsGaps: React.FC<StrengthsGapsProps> = ({ strengths, gaps }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Strengths Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-emerald-500/30 bg-emerald-50/20 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-emerald-500/50 hover:shadow-md dark:border-emerald-500/20 dark:bg-emerald-950/10"
      >
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-500/10 blur-2xl transition-all group-hover:bg-emerald-500/20" />

        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 shadow-xs dark:bg-emerald-500/20 dark:text-emerald-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Identified Strengths
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Direct matches found against core requirements
                </p>
              </div>
            </div>
            <span className="flex h-7 items-center justify-center rounded-full bg-emerald-500/10 px-3 text-xs font-bold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300">
              {strengths.length} Found
            </span>
          </div>

          <ul className="mt-5 space-y-3">
            {strengths.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + idx * 0.08 }}
                className="flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-white/80 p-3.5 shadow-xs transition-colors hover:border-emerald-500/40 dark:border-emerald-500/10 dark:bg-zinc-900/60"
              >
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/60 dark:text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5 stroke-[2.5]" />
                </div>
                <span className="text-sm font-medium leading-snug text-zinc-800 dark:text-zinc-200">
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="mt-5 border-t border-emerald-500/20 pt-3 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
          💡 Highlight these key qualifications prominently in your professional summary.
        </div>
      </motion.div>

      {/* Gaps Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-rose-500/30 bg-rose-50/20 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-rose-500/50 hover:shadow-md dark:border-rose-500/20 dark:bg-rose-950/10"
      >
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-rose-500/10 blur-2xl transition-all group-hover:bg-rose-500/20" />

        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 shadow-xs dark:bg-rose-500/20 dark:text-rose-400">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Missing Keywords & Gaps
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Crucial criteria omitted or insufficiently highlighted
                </p>
              </div>
            </div>
            <span className="flex h-7 items-center justify-center rounded-full bg-rose-500/10 px-3 text-xs font-bold text-rose-600 dark:bg-rose-500/20 dark:text-rose-300">
              {gaps.length} Gaps
            </span>
          </div>

          <ul className="mt-5 space-y-3">
            {gaps.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + idx * 0.08 }}
                className="flex items-start gap-3 rounded-xl border border-rose-500/20 bg-white/80 p-3.5 shadow-xs transition-colors hover:border-rose-500/40 dark:border-rose-500/10 dark:bg-zinc-900/60"
              >
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900/60 dark:text-rose-400">
                  <XCircle className="h-3.5 w-3.5 stroke-[2.5]" />
                </div>
                <span className="text-sm font-medium leading-snug text-zinc-800 dark:text-zinc-200">
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="mt-5 border-t border-rose-500/20 pt-3 text-[11px] font-medium text-rose-700 dark:text-rose-400">
          ⚠️ Addressing these gaps will dramatically increase your interview invitation probability.
        </div>
      </motion.div>
    </div>
  );
};
