import { NextResponse } from "next/server";
import OpenAI from "openai";
import { vikiSystemPrompt } from "@/lib/vikiSystemPrompt";

export const dynamic = "force-dynamic";

// Глобальная переменная для клиента (чтобы не пересоздавать при каждом запросе в рантайме)
let openai: OpenAI | null = null;

export async function POST(request: Request) {
  const requestId = `req-${Date.now()}`;
  console.log(`[AI Chat] [${requestId}] New Request`);

  try {
    // 1. Ленивая инициализация (безопасно для build time)
    if (!openai) {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            throw new Error("OPENAI_API_KEY is not set in environment");
        }
        openai = new OpenAI({ apiKey });
    }

    // 2. Получаем данные
    const body = await request.json();
    const { message, conversationHistory } = body;

    if (!message) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    // 3. Формируем историю
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: vikiSystemPrompt || "Ты полезный ассистент." },
    ];

    if (Array.isArray(conversationHistory)) {
      const historySlice = conversationHistory.slice(-10);
      historySlice.forEach((msg: any) => {
        if (msg.role && msg.content) {
            messages.push({
                role: msg.role === 'user' ? 'user' : 'assistant',
                content: msg.content
            });
        }
      });
    }

    messages.push({ role: "user", content: message });
    console.log(`[AI Chat] [${requestId}] Sending to OpenAI (${messages.length} msgs)`);

    // 4. Запрос к OpenAI
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    const reply = completion.choices[0]?.message?.content || "Извините, я задумалась.";
    console.log(`[AI Chat] [${requestId}] Success`);

    return NextResponse.json({
      response: reply,
      conversationId: `chat-${Date.now()}`,
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error(`[AI Chat] [${requestId}] Error:`, error.message);
    return NextResponse.json(
      { error: "Internal Error", details: error.message },
      { status: 500 }
    );
  }
}