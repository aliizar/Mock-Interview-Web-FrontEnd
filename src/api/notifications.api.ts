import { useAuthStore } from "../stores/auth.store";

const API_URL = "http://localhost:5000/api/notifications/v1";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "SUCCESS" | "ERROR" | "REMINDER";
  createdAt: string;
}

interface NotificationsResponse {
  message: string;
  notifications: Notification[];
}

export async function getNotifications(): Promise<Notification[]> {
  const token = useAuthStore.getState().token;

  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: NotificationsResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch notifications");
  }

  return data.notifications;
}
