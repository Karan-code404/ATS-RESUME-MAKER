import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, Check, Trash2, Sparkles, AlertCircle } from 'lucide-react';

interface UploadDropzoneProps {
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
  onUseSampleResume?: () => void;
}

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({
  selectedFile,
  onFileSelect,
  onUseSampleResume,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const validateAndSetFile = (file: File) => {
    setErrorMsg(null);
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setErrorMsg('Please upload a PDF file. Other formats may fail ATS formatting rules.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('File size exceeds 10MB limit.');
      return;
    }
    onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect(null);
    setErrorMsg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-2.5 flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <FileText className="h-4 w-4 text-indigo-500" />
          Upload Resume (PDF)
        </label>
        {onUseSampleResume && (
          <button
            type="button"
            onClick={onUseSampleResume}
            className="group flex items-center gap-1 text-xs font-medium text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            <Sparkles className="h-3 w-3 transition-transform group-hover:rotate-12" />
            Use Sample Resume
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={handleFileInputChange}
      />

      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`group relative flex min-h-[220px] flex-1 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all duration-300 ${
          isDragging
            ? 'border-indigo-500 bg-indigo-50/60 dark:border-indigo-400 dark:bg-indigo-950/20 scale-[0.99]'
            : selectedFile
            ? 'border-emerald-500/50 bg-emerald-50/20 dark:border-emerald-500/30 dark:bg-emerald-950/10'
            : 'border-zinc-300 hover:border-indigo-400 bg-zinc-50/50 hover:bg-zinc-100/60 dark:border-zinc-700/80 dark:bg-zinc-900/40 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/40'
        }`}
      >
        {selectedFile ? (
          <div className="flex w-full flex-col items-center">
            <div className="relative mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-sm dark:bg-emerald-950/60 dark:text-emerald-400">
              <FileText className="h-8 w-8" />
              <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow">
                <Check className="h-3.5 w-3.5 stroke-[3]" />
              </div>
            </div>

            <p className="max-w-[240px] truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100 sm:max-w-[300px]">
              {selectedFile.name}
            </p>
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
              {formatFileSize(selectedFile.size)} • PDF Ready for Parsing
            </p>

            <div className="mt-4 flex items-center gap-3">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                Ready to Analyze
              </span>
              <button
                type="button"
                onClick={handleRemove}
                className="flex items-center gap-1 rounded-full border border-zinc-200 px-2.5 py-1 text-xs font-medium text-rose-600 transition-colors hover:bg-rose-50 dark:border-zinc-700 dark:text-rose-400 dark:hover:bg-rose-950/30"
              >
                <Trash2 className="h-3 w-3" />
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 shadow-sm transition-transform duration-300 group-hover:scale-110 dark:bg-indigo-950/60 dark:text-indigo-400">
              <UploadCloud className="h-7 w-7" />
            </div>

            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              <span className="text-indigo-600 dark:text-indigo-400">Click to upload</span> or drag and drop
            </p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Supports ATS-parsable PDF up to 10MB
            </p>

            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] font-medium text-zinc-600 shadow-xs dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
              100% Client-Side Privacy Guaranteed
            </div>
          </div>
        )}
      </div>

      {errorMsg && (
        <div className="mt-2 flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
};
