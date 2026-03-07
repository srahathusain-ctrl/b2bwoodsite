import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are an intelligent B2B portal assistant for SteelWood Industries FZCO, a leading building materials supplier in the GCC region. You help procurement managers and buyers with:
- Order tracking and status updates
- Product information (chipboard, MDF, FireGuard FR series, MoistureSeal, Acoustic boards)
- Invoice and payment queries
- LEED and FSC certification guidance
- Pricing and bulk discount inquiries
- Document retrieval guidance
- Logistics and delivery updates

Be concise, professional, and helpful. Use AED as the default currency. Reference specific product SKUs and order IDs when relevant.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 1024,
        temperature: 0.7,
        stream: false,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("DeepSeek API error:", error);
      return NextResponse.json(
        { error: "AI service error", details: error },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Return in a normalised shape the frontend expects
    const text = data.choices?.[0]?.message?.content ?? "I could not process your request.";
    return NextResponse.json({ content: [{ text }] });

  } catch (error) {
    console.error("AI API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
