import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Recommendation } from '../types';
import { Sparkles, Copy, Check, ChevronRight, Layers, Briefcase, GraduationCap, Code } from 'lucide-react';

interface RecommendationsListProps {
  recommendations: Recommendation[];
}

export const RecommendationsList: React.FC<RecommendationsListProps> = ({ recommendations }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const getSectionBadgeStyle = (section: string) => {
    const s = section.toLowerCase();
    if (s.includes('skill')) {
      return {
        icon: Code,
        style: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
        gradient: 'from-indigo-500 to-blue-500',
      };
    }
    if (s.includes('exp')) {
      return {
        icon: Briefcase,
        style: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
        gradient: 'from-purple-500 to-pink-500',
      };
    }
    if (s.includes('edu')) {
      return {
        icon: GraduationCap,
        style: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
        gradient: 'from-amber-500 to-orange-500',
      };
    }
    return {
      icon: Layers,
      style: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
      gradient: 'from-blue-500 to-cyan-500',
    };
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/70 sm:p-8">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <Sparkles className="h-3.5 w-3.5" />
            Tailored ATS Action Plan
          </div>
          <h3 className="mt-1 text-xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-2xl">
            Section-wise Recommendations
          </h3>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Step-by-step improvements to maximize keyword relevance and recruiter appeal.
          </p>
        </div>

        <span className="self-start rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 sm:self-auto">
          {recommendations.length} Action Items
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {recommendations.map((rec, index) => {
          const badge = getSectionBadgeStyle(rec.section);
          const SectionIcon = badge.icon;
          const isCopied = copiedIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl border border-zinc-200/80 bg-white p-5 shadow-xs transition-all duration-300 hover:border-indigo-400 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/90 dark:hover:border-indigo-500/50"
            >
              {/* Left subtle indicator bar */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${badge.gradient} opacity-80 group-hover:w-1.5 transition-all`}
              />

              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start pl-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${badge.style}`}
                    >
                      <SectionIcon className="h-3.5 w-3.5" />
                      {rec.section}
                    </span>
                    <span className="text-[11px] font-medium text-indigo-500 dark:text-indigo-400">
                      Recommendation #{index + 1}
                    </span>
                  </div>

                  <p className="text-sm font-medium leading-relaxed text-zinc-800 dark:text-zinc-200">
                    {rec.advice}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleCopy(rec.advice, index)}
                    className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white"
                    title="Copy advice to clipboard"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                  <div className="hidden text-zinc-400 transition-transform group-hover:translate-x-0.5 dark:text-zinc-600 sm:block">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
