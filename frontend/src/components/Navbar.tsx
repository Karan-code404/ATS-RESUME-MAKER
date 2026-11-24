import React from 'react';
import { Sun, Moon, FileCheck2, Sparkles, ExternalLink } from 'lucide-react';
import type { ThemeMode } from '../types';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onReset: () => void;
  hasResults: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  onReset,
  hasResults,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-blue-600 text-white shadow-md shadow-indigo-500/20">
            <FileCheck2 className="h-5 w-5 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-lg">
                AI Resume Matcher
              </span>
              <span className="hidden rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 sm:inline-block">
                ATS Engine v2.4
              </span>
            </div>
            <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
              Y Combinator Batch Grade Semantic Screener
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {hasResults && (
            <button
              type="button"
              onClick={onReset}
              className="hidden items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 sm:flex"
            >
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              New Analysis
            </button>
          )}

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-zinc-600" />
            )}
          </button>

          {/* GitHub / Source link */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            title="Documentation & GitHub"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
};
