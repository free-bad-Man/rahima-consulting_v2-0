// Minimal safe stubs for removed n8n integration.
// These functions intentionally do not perform any external network calls.
// They exist to keep build/runtime compatibility with code paths that
// still import `@/lib/n8n`. Replace with real implementations only if
// n8n integration is re-enabled.
import { NextResponse } from "next/server";

export type ContactFormPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  [key: string]: any;
};

export async function sendContactForm(payload: ContactFormPayload): Promise<{ success: boolean; error?: any; info?: any }> {
  // Log for observability in server logs; do not throw.
  try {
    console.info("[n8n stub] sendContactForm called with payload:", {
      name: payload?.name,
      email: payload?.email,
      phone: payload?.phone,
    });
  } catch (e) {
    // swallow logging errors
  }
  return { success: true, error: null, info: "n8n integration disabled (stub)" };
}

export async function sendToN8n(path: string, body: any): Promise<{ status: number; body: any }> {
  try {
    console.info("[n8n stub] sendToN8n called:", { path, sample: body && (body.sample || body?.id || null) });
  } catch (e) {}
  return { status: 200, body: { ok: true, note: "n8n integration disabled (stub)" } };
}

export default {
  sendContactForm,
  sendToN8n,
};


