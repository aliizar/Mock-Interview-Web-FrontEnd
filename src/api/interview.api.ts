import { useAuthStore } from "../stores/auth.store";

const API_URL = "http://localhost:5000/api/interviews/v1";

export interface InterviewHistoryItem {
  id: number;
  role: string;
  difficulty: string;
  interviewType: string;
  duration: number;
  startedAt: string;
  endedAt: string | null;
  status: "ACTIVE" | "COMPLETED" | "CANCELLED";
  overallScore: number | null;
}

export async function getInterviewHistory(): Promise<InterviewHistoryItem[]> {
  const token = useAuthStore.getState().token;

  const response = await fetch(`${API_URL}/history`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch interview history");
  }

  return data.interviews;
}

export interface InterviewQuestion {
  id: number;
  questionNumber: number;
  question: string;
  type: string;
  answer: string | null;
  score: number | null;
  feedback: string | null;
  createdAt: string;
}

export interface InterviewFeedback {
  technicalScore: number | null;
  communicationScore: number | null;
  problemSolvingScore: number | null;
  strengths: string[];
  weaknesses: string[];
  feedback: string;
  recommendations: string[];
}

export interface InterviewDetails {
  id: number;
  userId: number;
  role: string;
  difficulty: string;
  interviewType: string;
  duration: number;
  startedAt: string;
  endedAt: string | null;
  status: "ACTIVE" | "COMPLETED" | "CANCELLED";
  overallScore: number | null;
  feedback: InterviewFeedback | null;
  createdAt: string;
  updatedAt: string;
  questions: InterviewQuestion[];
}

export async function getInterviewDetails(
  interviewId: number,
): Promise<InterviewDetails> {
  const token = useAuthStore.getState().token;

  const response = await fetch(`${API_URL}/${interviewId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch interview details");
  }

  return data.interview;
}

function getAuthHeaders() {
  const token = useAuthStore.getState().token;

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export interface StartInterviewData {
  role: string;
  difficulty: string;
  interviewType: string;
  duration: number;
}

export interface InterviewQuestion {
  id: number;
  questionNumber: number;
  question: string;
  type: string;
}

export interface StartInterviewResponse {
  message: string;
  interview: {
    id: number;
    role: string;
    difficulty: string;
    interviewType: string;
    duration: number;
    startedAt: string;
    status: string;
  };
  question: InterviewQuestion;
}

export interface SubmitAnswerResponse {
  message: string;
  interviewEnded?: boolean;
  interview?: {
    id: number;
    status: string;
    endedAt: string;
  };
  question?: InterviewQuestion;
}

export async function startInterview(
  data: StartInterviewData,
): Promise<StartInterviewResponse> {
  const response = await fetch(`${API_URL}/start`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to start interview");
  }

  return result;
}

export async function submitInterviewAnswer(
  interviewId: number,
  answer: string,
): Promise<SubmitAnswerResponse> {
  const response = await fetch(`${API_URL}/${interviewId}/answer`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ answer }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to submit answer");
  }

  return result;
}

export async function evaluateInterview(interviewId: number) {
  const response = await fetch(`${API_URL}/${interviewId}/evaluate`, {
    method: "POST",
    headers: getAuthHeaders(),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to evaluate interview");
  }

  return result;
}
