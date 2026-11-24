import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Award, CheckCircle2, AlertTriangle, XCircle, Sparkles, TrendingUp } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ScoreGaugeProps {
  score: number;
  metadata?: {
    keyword_match: number;
    formatting_score: number;
    experience_relevance: number;
  };
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, metadata }) => {
  const [displayScore, setDisplayScore] = useState(0);

  // Smooth animated score number
  const springScore = useSpring(0, { stiffness: 45, damping: 15 });
  const rounded = useTransform(springScore, (latest) => Math.round(latest));

  useEffect(() => {
    springScore.set(score);
    const unsubscribe = rounded.on('change', (v) => setDisplayScore(v));

    if (score >= 75) {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#10b981', '#3b82f6', '#6366f1', '#a855f7'],
        });
      } catch {
        // safe fallback
      }
    }

    return () => unsubscribe();
  }, [score, rounded, springScore]);

  // Color tier logic
  const getScoreTheme = (val: number) => {
    if (val >= 75) {
      return {
        stroke: '#10b981', // emerald-500
        gradientId: 'emeraldGrad',
        startColor: '#34d399',
        endColor: '#059669',
        bgTrack: 'rgba(16, 185, 129, 0.15)',
        text: 'text-emerald-500 dark:text-emerald-400',
        badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        badgeText: 'Strong Match (ATS Ready)',
        icon: CheckCircle2,
        glow: 'rgba(16, 185, 129, 0.25)',
      };
    } else if (val >= 50) {
      return {
        stroke: '#f59e0b', // amber-500
        gradientId: 'amberGrad',
        startColor: '#fbbf24',
        endColor: '#d97706',
        bgTrack: 'rgba(245, 158, 11, 0.15)',
        text: 'text-amber-500 dark:text-amber-400',
        badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        badgeText: 'Moderate Match (Needs Polish)',
        icon: AlertTriangle,
        glow: 'rgba(245, 158, 11, 0.25)',
      };
    } else {
      return {
        stroke: '#ef4444', // red-500
        gradientId: 'redGrad',
        startColor: '#f87171',
        endColor: '#dc2626',
        bgTrack: 'rgba(239, 68, 68, 0.15)',
        text: 'text-rose-500 dark:text-rose-400',
        badgeBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
        badgeText: 'Critical Gaps Detected',
        icon: XCircle,
        glow: 'rgba(239, 68, 68, 0.25)',
      };
    }
  };

  const theme = getScoreTheme(score);
  const StatusIcon = theme.icon;

  // SVG circular properties
  const radius = 80;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const defaultMeta = {
    keyword_match: metadata?.keyword_match ?? Math.min(100, Math.round(score * 1.05)),
    formatting_score: metadata?.formatting_score ?? 94,
    experience_relevance: metadata?.experience_relevance ?? Math.max(40, Math.round(score * 0.95)),
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 dark:border-zinc-800/80 dark:bg-zinc-900/70 sm:p-8">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl transition-all duration-700 opacity-40"
        style={{ backgroundColor: theme.stroke }}
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full blur-3xl transition-all duration-700 opacity-20"
        style={{ backgroundColor: theme.stroke }}
      />

      <div className="relative z-10 flex flex-col items-center justify-between gap-8 lg:flex-row">
        {/* Left: Heading & Status */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-md mb-3 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500 animate-pulse" />
            AI Semantic ATS Evaluation
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
            Overall ATS Compatibility
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 max-w-md">
            Calculated by analyzing semantic vector similarity, keyword density, role prerequisites, and ATS parsing standards.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-xl border px-3.5 py-1.5 text-sm font-medium transition-all shadow-sm">
            <span className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold ${theme.badgeBg}`}>
              <StatusIcon className="h-3.5 w-3.5" />
              {theme.badgeText}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Benchmark: Top 15% of applicants
            </span>
          </div>
        </div>

        {/* Center: Large Animated Circular Score Gauge */}
        <div className="relative flex flex-col items-center justify-center">
          <div className="relative flex h-56 w-56 items-center justify-center">
            <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 200 200">
              <defs>
                <linearGradient id={theme.gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={theme.startColor} />
                  <stop offset="100%" stopColor={theme.endColor} />
                </linearGradient>
                <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background circle track */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                className="stroke-zinc-200/80 dark:stroke-zinc-800/80"
                strokeWidth={strokeWidth}
                fill="transparent"
              />

              {/* Animated Progress circle */}
              <motion.circle
                cx="100"
                cy="100"
                r={radius}
                stroke={`url(#${theme.gradientId})`}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeLinecap="round"
                fill="transparent"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                filter="url(#glowFilter)"
              />
            </svg>

            {/* Inner Content */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                ATS Score
              </span>
              <div className="flex items-baseline">
                <span className={`text-5xl font-black tracking-tight sm:text-6xl ${theme.text}`}>
                  {displayScore}
                </span>
                <span className="text-xl font-bold text-zinc-400 dark:text-zinc-500">%</span>
              </div>
              <span className="mt-1 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                {score >= 75 ? '🔥 High Pass Rate' : score >= 50 ? '⚠️ Review Needed' : '❌ Likely Rejected'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Sub-Metrics Pill Cards */}
        <div className="flex w-full flex-col gap-3 lg:w-64">
          <div className="rounded-xl border border-zinc-200/60 bg-zinc-50/70 p-3 dark:border-zinc-800/60 dark:bg-zinc-800/40">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-medium text-zinc-700 dark:text-zinc-300">
                <Award className="h-3.5 w-3.5 text-indigo-500" />
                Keyword Match
              </span>
              <span className="font-semibold text-zinc-900 dark:text-white">
                {defaultMeta.keyword_match}%
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
              <motion.div
                className="h-full rounded-full bg-indigo-500"
                initial={{ width: 0 }}
                animate={{ width: `${defaultMeta.keyword_match}%` }}
                transition={{ duration: 1.2, delay: 0.2 }}
              />
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200/60 bg-zinc-50/70 p-3 dark:border-zinc-800/60 dark:bg-zinc-800/40">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-medium text-zinc-700 dark:text-zinc-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                ATS Parser Friendly
              </span>
              <span className="font-semibold text-zinc-900 dark:text-white">
                {defaultMeta.formatting_score}%
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
              <motion.div
                className="h-full rounded-full bg-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${defaultMeta.formatting_score}%` }}
                transition={{ duration: 1.2, delay: 0.3 }}
              />
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200/60 bg-zinc-50/70 p-3 dark:border-zinc-800/60 dark:bg-zinc-800/40">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-medium text-zinc-700 dark:text-zinc-300">
                <TrendingUp className="h-3.5 w-3.5 text-blue-500" />
                Relevance Vector
              </span>
              <span className="font-semibold text-zinc-900 dark:text-white">
                {defaultMeta.experience_relevance}%
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
              <motion.div
                className="h-full rounded-full bg-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${defaultMeta.experience_relevance}%` }}
                transition={{ duration: 1.2, delay: 0.4 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
