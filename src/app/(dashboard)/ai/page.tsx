"use client";

import { useState, useRef, useEffect } from "react";
import { sendAIMessage } from "@/services/ai";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types";

const SUGGESTED = [
  "What's the status of my recent orders?",
  "Show me current pricing for FireGuard FR-18",
  "Which invoices are overdue?",
  "Explain LEED certification requirements for chipboard",
  "What offers are available this week?",
];

export default function AIPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text?: string) => {
    const content = text || input.trim();
    if (!content || loading) return;

    const userMsg: ChatMessage = { role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const allMessages = [...messages, userMsg];
      const reply = await sendAIMessage(allMessages);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm unable to connect to the AI service right now. Please ensure your ANTHROPIC_API_KEY is configured.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto animate-fade-slide-up">
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <div className="w-16 h-16 bg-gold/10 border border-gold/20 rounded-2xl flex items-center justify-center text-3xl">
            ✦
          </div>
          <div className="text-center">
            <h2 className="font-serif text-2xl font-bold mb-2">
              AI Assistant
            </h2>
            <p className="text-muted text-sm max-w-sm">
              Ask about orders, pricing, documents, compliance, or anything
              related to SteelWood products and your account.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 w-full max-w-md">
            {SUGGESTED.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="text-left text-sm px-4 py-3 bg-surface2 border border-border rounded-lg hover:border-gold/40 hover:bg-gold/5 transition-all text-muted hover:text-text"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-auto space-y-4 pb-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex gap-3",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-sm flex-shrink-0 mt-1">
                  ✦
                </div>
              )}
              <div
                className={cn(
                  "max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed",
                  msg.role === "user"
                    ? "bg-gold text-black font-medium"
                    : "bg-card border border-border text-text"
                )}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-sm flex-shrink-0">
                ✦
              </div>
              <div className="bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}

      {/* Input */}
      <div className="flex gap-3 pt-4 border-t border-border mt-auto">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
          placeholder="Ask about orders, products, documents…"
          className="flex-1"
          disabled={loading}
        />
        <Button
          variant="primary"
          onClick={() => send()}
          disabled={loading || !input.trim()}
          className="px-5"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
          ) : (
            "Send"
          )}
        </Button>
      </div>
    </div>
  );
}
