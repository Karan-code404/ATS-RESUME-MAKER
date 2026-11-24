export interface Recommendation {
  section: string;
  advice: string;
  priority?: 'High' | 'Medium' | 'Low';
}

export interface AnalysisResult {
  ats_score: number;
  strengths: string[];
  gaps: string[];
  recommendations: Recommendation[];
  verdict: string;
  metadata?: {
    keyword_match: number;
    formatting_score: number;
    experience_relevance: number;
    analyzed_at: string;
    file_name: string;
  };
}

export type ThemeMode = 'dark' | 'light';
