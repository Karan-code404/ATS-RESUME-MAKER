import React from 'react';
import { Briefcase, Sparkles, X, AlignLeft } from 'lucide-react';

interface JobDescriptionInputProps {
  value: string;
  onChange: (val: string) => void;
  onLoadSample: () => void;
  onClear: () => void;
}

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  value,
  onChange,
  onLoadSample,
  onClear,
}) => {
  const characterCount = value.length;
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div className="flex h-full flex-col">
      <div className="mb-2.5 flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <Briefcase className="h-4 w-4 text-indigo-500" />
          Job Description
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onLoadSample}
            className="group flex items-center gap-1 text-xs font-medium text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            <Sparkles className="h-3 w-3 transition-transform group-hover:rotate-12" />
            Paste Sample JD
          </button>
          {value && (
            <button
              type="button"
              onClick={onClear}
              className="flex items-center gap-1 text-xs font-medium text-zinc-400 transition-colors hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X className="h-3 w-3" />
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="relative flex flex-1 flex-col">
        <textarea
          rows={8}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Paste the target job description here...\n\nExample:\n- 3+ years experience with Python, FastAPI, and Postgres\n- Proven knowledge of LLM frameworks (LangChain, LlamaIndex)\n- Experience deploying services with Docker and Kubernetes\n- Strong API design and testing best practices`}
          className="w-full flex-1 resize-none rounded-2xl border border-zinc-300 bg-zinc-50/50 p-4 text-sm leading-relaxed text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all dark:border-zinc-700/80 dark:bg-zinc-900/40 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-indigo-400 dark:focus:bg-zinc-900 dark:focus:ring-indigo-400/10"
        />

        {/* Bottom stats footer */}
        <div className="mt-2 flex items-center justify-between px-1 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1.5">
            <AlignLeft className="h-3.5 w-3.5" />
            {wordCount} words • {characterCount} chars
          </span>
          <span>
            {wordCount < 40 ? (
              <span className="text-amber-500">Provide more details for higher accuracy</span>
            ) : (
              <span className="text-emerald-500">Optimal length for semantic scan</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
