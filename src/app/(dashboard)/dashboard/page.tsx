"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";

/* ─── Types ─── */
interface Message { role: "user" | "ai"; text: string; }

/* ─── Chat flow for guided product recommendation ─── */
const CHAT_FLOW = [
  {
    q: "To recommend the right product, I have a few quick questions.\n\nWhat's the **application** for this project?",
    chips: [
      { l: "🔥 Fire-Rated Zone",      hi: true  },
      { l: "💧 Wet Area / Kitchen",   hi: false },
      { l: "🏗 Commercial Fit-Out",   hi: false },
      { l: "🏠 Residential",          hi: false },
      { l: "🌿 LEED Project",         hi: true  },
    ],
  },
  {
    q: "Got it. How many **sheets** are you looking at? This determines your volume tier pricing.",
    chips: [
      { l: "50–100 sheets",   hi: false },
      { l: "100–200 sheets",  hi: false },
      { l: "200–500 sheets",  hi: true  },
      { l: "500+ sheets",     hi: true  },
    ],
  },
  {
    q: "And the **delivery destination**? I'll calculate VAT and estimated lead time.",
    chips: [
      { l: "📍 Dubai, UAE",        hi: false },
      { l: "📍 Abu Dhabi, UAE",    hi: false },
      { l: "📍 Riyadh, KSA",      hi: false },
      { l: "📍 Doha, Qatar",      hi: false },
      { l: "Other GCC",            hi: false },
    ],
  },
];

const AI_REPLIES: Record<string, string> = {
  order:    "You have **2 active orders**:\n• ORD-2024-001 — FireGuard FR-18, 200 sheets — Dispatched · ETA 14 Mar, Dubai\n• ORD-2024-002 — MoistureSeal Plus, 150 sheets — Processing · ETA 18 Mar, Abu Dhabi\n\nWould you like to open the tracking view?",
  price:    "Your **Gold tier** pricing is active. Current best prices:\n• FireGuard FR-18: **AED 369/sheet** (500+ sheets)\n• MoistureSeal Plus: **AED 335/sheet** (500+ sheets)\n• FSC Chipboard: **AED 285/sheet** (300+ sheets)\n\nYou're 68% to Platinum — at Platinum you'd unlock an additional 3% rebate.",
  fireguard:"FireGuard FR-18 TDS:\n• **Class 1 / BS EN 312** fire-rated chipboard\n• Density: 700 kg/m³ · 18mm · 2440×1220mm\n• Lead time: 3 days from Jebel Ali\n• Stock: 1,240 sheets available\n\nI can trigger a TDS download — want that?",
  leed:     "For LEED projects, I recommend **FSC Chipboard 18mm** (SKU: CB-18-2440).\nIt carries FSC + LEED + E1 certifications, qualifying under MR 7 and MR 8 credits.\n\nCurrent LEED pricing: **AED 42/sheet** with code **LEED10**.",
  deliver:  "Delivery to Dubai (your default):\n• Standard: 3–5 days\n• Express: 1–2 days (+AED 850 surcharge)\n• **Free delivery** on orders above AED 15,000\n\nYour current cart qualifies for free delivery ✓",
};

function getAIReply(q: string): string {
  const ql = q.toLowerCase();
  if (ql.includes("order") || ql.includes("track")) return AI_REPLIES.order;
  if (ql.includes("price") || ql.includes("pricing")) return AI_REPLIES.price;
  if (ql.includes("fireguard") || ql.includes("tds")) return AI_REPLIES.fireguard;
  if (ql.includes("leed")) return AI_REPLIES.leed;
  if (ql.includes("deliver") || ql.includes("shipping")) return AI_REPLIES.deliver;
  return "Got it — let me check that for you. Based on your account context and the Steelwood catalogue, I can help with product recommendations, order tracking, pricing, certifications, and delivery details.\n\nCould you give me a bit more detail on what you need?";
}

/* ─── Render markdown-ish text ─── */
function RenderText({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <span>
      {lines.map((line, i) => {
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          <span key={i}>
            {parts.map((part, j) =>
              part.startsWith("**") && part.endsWith("**")
                ? <strong key={j} style={{ fontWeight: 700, color: "#1a1612" }}>{part.slice(2, -2)}</strong>
                : <span key={j}>{part}</span>
            )}
            {i < lines.length - 1 && <br />}
          </span>
        );
      })}
    </span>
  );
}

/* ─── Typing dots ─── */
function TypingDots() {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 3, padding: "2px 0" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 5, height: 5, borderRadius: "50%", background: "#7a7268", display: "inline-block",
            animation: `tdot 1.1s ease-in-out ${i * 0.14}s infinite`,
          }}
        />
      ))}
      <style>{`@keyframes tdot{0%,60%,100%{transform:translateY(0);opacity:.3}30%{transform:translateY(-5px);opacity:1}}`}</style>
    </span>
  );
}


export default function DashboardPage() {
  const { data: session }     = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput]     = useState("");
  const [typing, setTyping]   = useState(false);
  const [chatStep, setChatStep] = useState(0);
  const [isOpen, setIsOpen]   = useState(false);
  const threadRef             = useRef<HTMLDivElement>(null);
  const taRef                 = useRef<HTMLTextAreaElement>(null);
  const [time, setTime]       = useState("");

  // Greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const firstName = session?.user?.name?.split(" ")[0] || "SR";

  // Clock
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-AE", { hour: "2-digit", minute: "2-digit", hour12: true }));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (threadRef.current)
      requestAnimationFrame(() => { if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight; });
  }, [messages, typing]);

  // Textarea auto-resize
  const autoResize = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 110) + "px";
  };

  const appendMsg = (msg: Message) => setMessages((m) => [...m, msg]);

  const showTypingThenMsg = (reply: string, delay = 1100) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      appendMsg({ role: "ai", text: reply });
    }, delay);
  };

  const showChatStep = (idx: number) => {
    if (idx >= CHAT_FLOW.length) {
      // Recommendation
      showTypingThenMsg(
        "Based on your requirements, here's my top recommendation:\n\n**FireGuard FR-18 · AED 390/sheet**\nBS EN 312 · Class 1 · 700 kg/m³\n200-sheet tier · Lead 3d · Dubai ETA 14 Mar\n\nReady to add to cart or download TDS?",
        1300
      );
      return;
    }
    const step = CHAT_FLOW[idx];
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      appendMsg({ role: "ai", text: step.q + "\n__chips__" + JSON.stringify(step.chips) + "__/chips__" + "__step__" + idx + "__/step__" });
    }, 1100);
  };

  const send = () => {
    const txt = input.trim();
    if (!txt) return;
    if (!isOpen) { setIsOpen(true); }
    appendMsg({ role: "user", text: txt });
    setInput("");
    if (taRef.current) { taRef.current.style.height = "auto"; }

    // Flow vs free reply
    if (chatStep < 3) {
      setTimeout(() => showChatStep(chatStep), 950);
      setChatStep((s) => s + 1);
    } else {
      showTypingThenMsg(getAIReply(txt));
    }
  };

  const chipClick = (chip: string, stepIdx: number) => {
    appendMsg({ role: "user", text: chip });
    const next = stepIdx + 1;
    if (next < CHAT_FLOW.length) {
      setTimeout(() => showChatStep(next), 950);
      setChatStep(next);
    } else {
      setChatStep(CHAT_FLOW.length);
      setTimeout(() => showChatStep(CHAT_FLOW.length), 950);
    }
  };

  const resetChat = () => {
    setMessages([]); setChatStep(0); setIsOpen(false); setInput("");
  };

  /* ─── Render a message (with chip support) ─── */
  const renderMsg = (msg: Message, i: number) => {
    // Parse chips from AI messages
    let text = msg.text;
    let chips: { l: string; hi: boolean }[] | null = null;
    let stepIdx = -1;
    if (msg.role === "ai") {
      const chipMatch = text.match(/__chips__(.+?)__\/chips__/s);
      const stepMatch = text.match(/__step__(\d+)__\/step__/);
      if (chipMatch) { chips = JSON.parse(chipMatch[1]); stepIdx = stepMatch ? parseInt(stepMatch[1]) : -1; }
      text = text.replace(/__chips__.*?__\/chips__/s, "").replace(/__step__.*?__\/step__/s, "").trim();
    }

    const isUser = msg.role === "user";
    return (
      <div
        key={i}
        className="animate-msg-in"
        style={{
          display: "flex", gap: 8, padding: "13px 16px 0", justifyContent: isUser ? "flex-end" : "flex-start",
          animationDelay: `${i * 0.02}s`,
        }}
      >
        {!isUser && (
          <div style={{ width: 26, height: 26, borderRadius: 7, flexShrink: 0, marginTop: 2, background: "#c45e38", color: "#fff", fontSize: 9, fontWeight: 700, fontFamily: "var(--font-dm-mono),monospace", display: "flex", alignItems: "center", justifyContent: "center" }}>
            SW
          </div>
        )}
        <div style={{ maxWidth: "87%" }}>
          <div className="chat-bubble" style={{ background: isUser ? "#1a1612" : "#f0ece4", borderRadius: isUser ? "13px 4px 13px 13px" : "4px 13px 13px 13px", color: isUser ? "#f0ece4" : "#1a1612" }}>
            <RenderText text={text} />
          </div>
          {chips && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 9 }}>
              {chips.map((c, ci) => (
                <button
                  key={ci}
                  onClick={() => chipClick(c.l, stepIdx)}
                  style={{
                    padding: "4px 11px", borderRadius: 20, border: "1px solid",
                    borderColor: c.hi ? "rgba(184,146,74,.4)" : "#ece6dd",
                    background: c.hi ? "rgba(184,146,74,.09)" : "#fff",
                    color: c.hi ? "#b8924a" : "#3e3830", fontSize: 12, fontWeight: 500, cursor: "pointer", transition: "all .13s", whiteSpace: "nowrap",
                  }}
                >
                  {c.l}
                </button>
              ))}
            </div>
          )}
        </div>
        {isUser && (
          <div style={{ width: 26, height: 26, borderRadius: 7, flexShrink: 0, marginTop: 2, background: "#1a1612", color: "#f0ece4", fontSize: 9, fontWeight: 700, fontFamily: "var(--font-dm-mono),monospace", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {firstName.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="flex-1 overflow-y-auto flex flex-col items-center justify-center relative"
      style={{ padding: "0 24px 52px" }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute", width: 560, height: 360, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(184,146,74,.07) 0%, transparent 68%)",
          top: "46%", left: "50%", transform: "translate(-50%,-60%)", pointerEvents: "none",
        }}
      />

      {/* Greeting row */}
      <div className="flex items-center gap-[14px] mb-[30px] animate-hero-in" style={{ animationDelay: "0s" }}>
        <span className="animate-rot-slow select-none" style={{ fontSize: 42, lineHeight: 1, color: "#c45e38", fontWeight: 300 }}>✳</span>
        <h1
          className="font-display"
          style={{ fontSize: "clamp(28px,3.6vw,48px)", fontWeight: 600, letterSpacing: "-.025em", color: "#1a1612", lineHeight: 1.1 }}
        >
          {greeting}, {firstName}
        </h1>
      </div>

      {/* Agent card */}
      <div
        className="w-full"
        style={{
          maxWidth: 660,
          background: "#fff",
          border: "1px solid #e0d9cf",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(26,22,18,.13), 0 2px 8px rgba(26,22,18,.06)",
          transition: "box-shadow .18s, border-color .18s",
          animationName: "hero-in", animationDuration: ".5s", animationTimingFunction: "cubic-bezier(.2,0,0,1)", animationFillMode: "both", animationDelay: ".07s",
        }}
      >
        {/* Thread (expandable) */}
        {isOpen && messages.length > 0 && (
          <div
            ref={threadRef}
            style={{ maxHeight: 340, overflowY: "auto" }}
          >
            {messages.map((m, i) => renderMsg(m, i))}
            {typing && (
              <div style={{ display: "flex", gap: 8, padding: "13px 16px 0" }}>
                <div style={{ width: 26, height: 26, borderRadius: 7, background: "#c45e38", color: "#fff", fontSize: 9, fontWeight: 700, fontFamily: "var(--font-dm-mono),monospace", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>SW</div>
                <div className="chat-bubble" style={{ background: "#f0ece4", borderRadius: "4px 13px 13px 13px" }}><TypingDots /></div>
              </div>
            )}
            <div style={{ height: 13 }} />
          </div>
        )}

        {/* Placeholder */}
        {!isOpen && (
          <div style={{ padding: "18px 18px 0" }}>
            <p style={{ fontSize: 14, color: "#d4cec6" }}>How can I help you today?</p>
          </div>
        )}

        {/* Input row */}
        <div
          style={{
            display: "flex", alignItems: "flex-end", gap: 8,
            padding: "12px 14px", borderTop: isOpen ? "1px solid #ece6dd" : "none",
          }}
        >
          {/* Attach */}
          <button
            style={{
              width: 28, height: 28, borderRadius: 7, border: "1.5px solid #ece6dd",
              color: "#b0a898", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .13s",
            }}
            onMouseEnter={(e) => Object.assign((e.currentTarget as HTMLElement).style, { background: "#f0ece4", color: "#3e3830" })}
            onMouseLeave={(e) => Object.assign((e.currentTarget as HTMLElement).style, { background: "transparent", color: "#b0a898" })}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
            </svg>
          </button>

          {/* Textarea */}
          <textarea
            ref={taRef}
            value={input}
            onChange={(e) => { setInput(e.target.value); autoResize(e.target); }}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="How can I help you today?"
            rows={1}
            style={{
              flex: 1, border: "none", outline: "none", resize: "none",
              background: "transparent", fontSize: 14, color: "#1a1612",
              lineHeight: 1.5, minHeight: 22, maxHeight: 110, overflowY: "auto",
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
          />

          {/* Send */}
          <button
            onClick={send}
            style={{
              width: 32, height: 32, borderRadius: 9, background: "#c45e38", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .14s",
              boxShadow: "0 2px 8px rgba(196,94,56,.3)",
            }}
            onMouseEnter={(e) => Object.assign((e.currentTarget as HTMLElement).style, { background: "#da7450", transform: "scale(1.04)" })}
            onMouseLeave={(e) => Object.assign((e.currentTarget as HTMLElement).style, { background: "#c45e38", transform: "scale(1)" })}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>

        {/* Meta row */}
        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "8px 14px 13px",
          }}
        >
          <div />
          <div style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 10.5, color: "#b0a898", fontFamily: "var(--font-dm-mono), monospace" }}>
            <span>Gold tier</span>
            <span style={{ width: 1, height: 11, background: "#e0d9cf", display: "inline-block" }} />
            <span>Dubai, UAE</span>
            <span style={{ width: 1, height: 11, background: "#e0d9cf", display: "inline-block" }} />
            <span>{time}</span>
            {isOpen && (
              <>
                <span style={{ width: 1, height: 11, background: "#e0d9cf", display: "inline-block" }} />
                <button onClick={resetChat} style={{ color: "#b8924a", fontSize: 10.5, textDecoration: "underline" }}>
                  Clear
                </button>
              </>
            )}
          </div>
        </div>
      </div>


      {/* Context strip */}
      <div
        className="absolute bottom-[14px] left-1/2 -translate-x-1/2 animate-hero-in"
        style={{ animationDelay: ".28s", display: "flex", alignItems: "center", gap: 14, fontSize: 10.5, color: "#b0a898", fontFamily: "var(--font-dm-mono), monospace", whiteSpace: "nowrap" }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span className="animate-ctx-pulse" style={{ width: 5, height: 5, borderRadius: "50%", background: "#3d7a52", display: "inline-block" }} />
          Agent online · Sonnet 4.6
        </span>
        <span>·</span>
        <span>2 active orders</span>
        <span>·</span>
        <span>Gold · 68% to Platinum</span>
        <span>·</span>
        <span>{time}</span>
      </div>
    </div>
  );
}
