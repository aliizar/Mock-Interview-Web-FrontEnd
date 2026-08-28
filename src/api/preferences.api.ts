import { useAuthStore } from "../stores/auth.store";

export interface InterviewPreferences {
  id: number;
  userId: number;
  role: string;
  difficulty: string;
  interviewType: string;
  duration: number;
  rememberHistory: boolean;
  recommendations: boolean;
  createdAt: string;
  updatedAt: string;
}

const API_URL = "http://localhost:5000/api/preferences/v1";

export const getPreferences = async (): Promise<InterviewPreferences> => {
  const token = useAuthStore.getState().token;

  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch interview preferences");
  }
  return data.preferences;
};

export const updatePreferences = async (
  preferences: Omit<
    InterviewPreferences,
    "id" | "userId" | "createdAt" | "updatedAt"
  >,
): Promise<InterviewPreferences> => {
  const token = useAuthStore.getState().token;

  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(preferences),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update interview preferences");
  }

  return data.preferences;
};
