import { ChatMessage } from "@/types";

export async function sendAIMessage(messages: ChatMessage[]): Promise<string> {
  const response = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    throw new Error("AI request failed");
  }

  const data = await response.json();
  return data.content?.[0]?.text || "I apologize, I could not process your request.";
}
