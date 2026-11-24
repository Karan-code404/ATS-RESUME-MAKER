import type { AnalysisResult } from './types';

export const DEFAULT_MOCK_DATA: AnalysisResult = {
  ats_score: 82,
  strengths: [
    'Strong Python backend skills',
    'Experience with LLMs and RAG',
    'Good understanding of APIs',
  ],
  gaps: [
    'No mention of Docker',
    'Lacks SQL experience',
  ],
  recommendations: [
    {
      section: 'Skills',
      advice: 'Add Docker and Kubernetes to your skills section.',
      priority: 'High',
    },
    {
      section: 'Experience',
      advice: "Quantify your achievements like 'Improved query speed by 20%'.",
      priority: 'High',
    },
    {
      section: 'Projects',
      advice: 'Include links to deployed demos or GitHub repositories to prove end-to-end execution.',
      priority: 'Medium',
    },
  ],
  verdict: 'Strong candidate for the role, but needs to showcase containerization skills.',
  metadata: {
    keyword_match: 86,
    formatting_score: 95,
    experience_relevance: 79,
    analyzed_at: 'Just now',
    file_name: 'resume.pdf',
  },
};

export const PRESET_MODERATE_DATA: AnalysisResult = {
  ats_score: 64,
  strengths: [
    'Familiarity with Python syntax and standard libraries',
    'Has built academic AI projects',
    'Clear formatting and clean contact information',
  ],
  gaps: [
    'Lacks production cloud deployment experience (AWS/GCP)',
    'Missing vector database mentions (Pinecone/ChromaDB/Qdrant)',
    'No quantitative impact metrics in work experience',
  ],
  recommendations: [
    {
      section: 'Skills',
      advice: 'Add Vector Databases (ChromaDB, Pinecone) and FastAPI to align with modern AI engineering stack.',
      priority: 'High',
    },
    {
      section: 'Experience',
      advice: 'Restructure bullet points using the Google XYZ formula: Accomplished [X] as measured by [Y] by doing [Z].',
      priority: 'High',
    },
    {
      section: 'Education',
      advice: 'Highlight relevant coursework in Distributed Systems or Natural Language Processing.',
      priority: 'Medium',
    },
  ],
  verdict: 'Moderate match with foundational skills, but requires modern AI stack keywords and metric-driven achievements.',
  metadata: {
    keyword_match: 61,
    formatting_score: 90,
    experience_relevance: 58,
    analyzed_at: 'Just now',
    file_name: 'resume_v2.pdf',
  },
};

export const PRESET_LOW_DATA: AnalysisResult = {
  ats_score: 42,
  strengths: [
    'General computer science coursework',
    'Basic knowledge of Git and version control',
  ],
  gaps: [
    'Zero mentions of LLMs, Prompt Engineering, or RAG',
    'No backend framework experience (FastAPI, Django, Flask)',
    'Missing database architecture or SQL query optimization',
    'Resume uses multi-column tables which degrade ATS parsing',
  ],
  recommendations: [
    {
      section: 'Formatting',
      advice: 'Switch to a single-column ATS-friendly layout. Remove complex graphics and tables.',
      priority: 'High',
    },
    {
      section: 'Skills',
      advice: 'Dedicate a section to Core Technical Stack: Python, REST APIs, SQL, and LLM orchestration.',
      priority: 'High',
    },
    {
      section: 'Projects',
      advice: 'Build and link at least one end-to-end fullstack AI agent project with a public repo.',
      priority: 'High',
    },
  ],
  verdict: 'High risk of automatic ATS rejection. Overhaul layout and incorporate essential role-specific technical competencies.',
  metadata: {
    keyword_match: 38,
    formatting_score: 45,
    experience_relevance: 41,
    analyzed_at: 'Just now',
    file_name: 'draft_resume.pdf',
  },
};

export const SAMPLE_JOB_DESCRIPTION = `Job Title: Software Engineer (AI Agents & LLM)
Company: Elip (YC W25 Startup)
Location: Remote / Hybrid

About the Role:
Join Elip and build an AI career agent used by thousands of job seekers. You will work directly on building agents, recommendations, and semantic search powering our AI career product.

What You'd Do:
- Build LLM-powered agents that use tools and remember context.
- Match people to jobs through retrieval, ranking, and personalization.
- Run semantic search over a large, constantly changing jobs index.
- Evaluate and improve LLM output quality.
- Ship backend features to production and keep them reliable.

Requirements (Must Have):
- Hands-on LLM work with prompting, tool use, and structured outputs.
- Strong Python backend development skills (FastAPI, asyncio).
- Experience with SQL and APIs.
- Understanding of Embeddings, Vector Databases, and RAG pipelines.

Good to Have:
- Experience deploying with Docker, Kubernetes, or cloud infrastructure.
- Have a side project live and used by real people.`;
