import { useAuthStore } from "../stores/auth.store";

const API_URL = "http://localhost:5000/api/chatbot/v1";

export interface ChatMessage {
  id: number;
  conversationId: number;
  role: "USER" | "ASSISTANT";
  content: string;
  createdAt: string;
}

export interface ChatConversation {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    messages: number;
  };
}

interface ChatResponse {
  message: string;
  conversationId: number;
  reply: string;
}

interface ChatHistoryResponse {
  conversations: ChatConversation[];
}

interface ConversationResponse {
  conversation: {
    id: number;
    userId: number;
    title: string;
    createdAt: string;
    updatedAt: string;
    messages: ChatMessage[];
  };
}

export async function sendMessage(
  message: string,
  conversationId?: number,
): Promise<ChatResponse> {
  const token = useAuthStore.getState().token;

  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      message,
      ...(conversationId && { conversationId }),
    }),
  });

  const data: ChatResponse | { message: string } = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to send message");
  }

  return data as ChatResponse;
}

export async function getChatHistory(): Promise<ChatConversation[]> {
  const token = useAuthStore.getState().token;

  const response = await fetch(`${API_URL}/history`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: ChatHistoryResponse | { message: string } = await response.json();

  if (!response.ok) {
    throw new Error(
      (data as { message: string }).message || "Failed to fetch chat history",
    );
  }

  return (data as ChatHistoryResponse).conversations;
}

export async function getConversation(
  conversationId: number,
): Promise<ConversationResponse["conversation"]> {
  const token = useAuthStore.getState().token;

  const response = await fetch(`${API_URL}/history/${conversationId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: ConversationResponse | { message: string } =
    await response.json();

  if (!response.ok) {
    throw new Error(
      (data as { message: string }).message || "Failed to fetch conversation",
    );
  }

  return (data as ConversationResponse).conversation;
}

export async function deleteConversation(
  conversationId: number,
): Promise<void> {
  const token = useAuthStore.getState().token;

  const response = await fetch(`${API_URL}/history/${conversationId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: { message: string } = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete conversation");
  }
}
