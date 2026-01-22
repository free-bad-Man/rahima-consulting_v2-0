export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
import { NextResponse } from "next/server";

async function safeFetch(url: string, opts: any = {}) {
  const start = Date.now();
  try {
    const resp = await fetch(url, opts);
    const text = await resp.text();
    return {
      ok: resp.ok,
      status: resp.status,
      headers: Object.fromEntries(Array.from(resp.headers.entries())),
      body: text,
      durationMs: Date.now() - start,
    };
  } catch (e: any) {
    return { ok: false, status: 0, headers: {}, body: String(e.message || e), durationMs: Date.now() - start };
  }
}

export async function POST(req: Request) {
  const t0 = Date.now();
  const ENV = process.env;
  const OPENAI_API_KEY = ENV.OPENAI_API_KEY;
  const ASSISTANT_ID = ENV.ASSISTANT_ID;
  if (!OPENAI_API_KEY) return NextResponse.json({ error: "OPENAI_API_KEY not set" }, { status: 500 });
  if (!ASSISTANT_ID) return NextResponse.json({ error: "ASSISTANT_ID not set" }, { status: 500 });

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_API_KEY}`,
    "OpenAI-Beta": "assistants=v2",
  } as any;
  if (ENV.OPENAI_ORGANIZATION) headers["OpenAI-Organization"] = ENV.OPENAI_ORGANIZATION;

  const out: any = { steps: [], env: { assistant_id: ASSISTANT_ID } };

  // Step 1: create thread (without assistant field)
  const createBody = { messages: [{ role: "user", content: "ping create thread (debug)" }] };
  const create = await safeFetch("https://api.openai.com/v1/threads", { method: "POST", headers, body: JSON.stringify(createBody) });
  out.steps.push({ name: "create_thread", req: createBody, resp: create });

  // try to extract thread id from body JSON
  let threadId = undefined;
  try {
    const j = JSON.parse(create.body || "{}");
    threadId = j?.id || j?.thread?.id || j?.result?.id;
  } catch (e) {}

  // Step 2: if no threadId, fail early
  if (!threadId) {
    return NextResponse.json({ error: "no_thread_id", create, message: "Thread creation did not return id" }, { status: 500 });
  }
  out.thread_id = threadId;

  // Step 3: start run with assistant in body
  const runBody = { assistant_id: ASSISTANT_ID };
  const run = await safeFetch(`https://api.openai.com/v1/threads/${encodeURIComponent(threadId)}/runs`, {
    method: "POST",
    headers,
    body: JSON.stringify(runBody),
  });
  out.steps.push({ name: "start_run", req: runBody, resp: run });

  let runId = undefined;
  try {
    const rj = JSON.parse(run.body || "{}");
    runId = rj?.id || rj?.run?.id || rj?.result?.id;
  } catch (e) {}

  // Polling: if runId present poll run, otherwise fallback to single messages fetch
  out.poll = [];
  if (runId) {
    const max = 20;
    for (let i = 0; i < max; i++) {
      const chk = await safeFetch(`https://api.openai.com/v1/threads/${encodeURIComponent(threadId)}/runs/${encodeURIComponent(runId)}`, { method: "GET", headers });
      out.poll.push({ attempt: i + 1, resp: chk });
      try {
        const cj = JSON.parse(chk.body || "{}");
        const status = cj?.status || cj?.run?.status || cj?.result?.status;
        if (status && /completed|succeeded|finished/i.test(String(status))) {
          out.poll_status = status;
          break;
        }
      } catch (e) {}
      await new Promise((r) => setTimeout(r, 1500));
    }
  } else {
    out.poll_note = "no_run_id, skipped poll";
  }

  // Step 4: fetch messages
  const messages = await safeFetch(`https://api.openai.com/v1/threads/${encodeURIComponent(threadId)}/messages`, { method: "GET", headers });
  out.steps.push({ name: "get_messages", resp: messages });

  // Save debug file
  const debugPath = `/tmp/assist_debug_${Date.now()}.json`;
  try {
    const fs = await import("fs");
    fs.writeFileSync(debugPath, JSON.stringify(out, null, 2), "utf-8");
  } catch (e) {
    // ignore write errors
  }

  out.debug_path = debugPath;
  out.durationMs = Date.now() - t0;
  return NextResponse.json(out);
}


