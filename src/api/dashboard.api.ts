import { useAuthStore } from "../stores/auth.store";

const API_URL = "http://localhost:5000/api/dashboard/v1";

export interface DashboardStats {
  overallScore: {
    value: number | null;
    improvement: number | null;
  };
  lastInterview: {
    id: number;
    score: number | null;
    role: string;
    startedAt: string;
  } | null;
  interviewStreak: number;
  practiceGoal: {
    completed: number;
    target: number;
  };
}

export interface WeeklyProgress {
  day: string;
  score: number | null;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const token = useAuthStore.getState().token;

  const response = await fetch(`${API_URL}/stats`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch dashboard stats");
  }

  return data.stats;
}
export async function getWeeklyProgress(): Promise<WeeklyProgress[]> {
  const token = useAuthStore.getState().token;

  const response = await fetch(`${API_URL}/progress`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch weekly progress");
  }

  return data.progress;
}
