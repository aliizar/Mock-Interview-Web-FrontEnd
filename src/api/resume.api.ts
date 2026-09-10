import { useAuthStore } from "../stores/auth.store";

const API_URL = "http://localhost:5000/api/resume/v1";

export interface ResumeAnalysis {
  atsScore: number;
  grammarScore: number;
  missingSkillsCount: number;
  keywordCount: number;
  formattingSuggestions: string[];
  grammarReview: string[];
  missingSkills: string[];
  recommendedKeywords: string[];
  projects: {
    name: string;
    rating: string;
    feedback: string;
  }[];
  recommendation: string;
}

interface ResumeAnalysisResponse {
  message: string;
  resume: {
    filename: string;
    pages: number;
    analysis: ResumeAnalysis;
  };
}

export async function analyzeResume(
  file: File,
  targetRole: string,
): Promise<ResumeAnalysis> {
  const token = useAuthStore.getState().token;

  const formData = new FormData();

  formData.append("file", file);
  formData.append("targetRole", targetRole);

  const response = await fetch(`${API_URL}/analyze`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data: ResumeAnalysisResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to analyze resume");
  }

  return data.resume.analysis;
}
