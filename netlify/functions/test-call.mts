import type { Context, Config } from "@netlify/functions";

// Rate limit configuration
const RATE_LIMIT_MAX_REQUESTS = 2;
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

// In-memory rate limit store (resets on cold starts)
const rateLimitStore = new Map<string, number[]>();

// Helper: Get client IP from request
function getClientIP(req: Request, context: Context): string {
  // Netlify provides client IP in context
  const ip = context.ip ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  return ip;
}

// Helper: Check rate limit
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitStore.get(ip) || [];

  // Prune old timestamps outside the window
  const validTimestamps = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    // Update store with pruned timestamps
    rateLimitStore.set(ip, validTimestamps);
    return false; // Rate limited
  }

  // Add current timestamp and update store
  validTimestamps.push(now);
  rateLimitStore.set(ip, validTimestamps);
  return true; // Allowed
}

// Helper: Validate and normalize Bulgarian phone number
function normalizePhone(rawPhone: string): { valid: boolean; normalized: string; error?: string } {
  // Strip all non-digit characters except leading +
  const startsWithPlus = rawPhone.trim().startsWith("+");
  const digits = rawPhone.replace(/\D/g, "");

  // Require at least 8 digits
  if (digits.length < 8) {
    return { valid: false, normalized: "", error: "invalid_phone" };
  }

  let normalized: string;

  if (startsWithPlus) {
    // If starts with +, keep it as is (already international format)
    normalized = "+" + digits;
  } else if (digits.startsWith("0")) {
    // Bulgarian local format: 0888... -> +359888...
    normalized = "+359" + digits.slice(1);
  } else if (digits.startsWith("359")) {
    // Missing + prefix: 359888... -> +359888...
    normalized = "+" + digits;
  } else if (digits.startsWith("8")) {
    // Short format: 888... -> +359888...
    normalized = "+359" + digits;
  } else {
    // Unknown format, prepend +359 as best effort
    normalized = "+359" + digits;
  }

  return { valid: true, normalized };
}

// N8N webhook URL (server-side only, not exposed to client)
const N8N_WEBHOOK_URL = "https://n8n-self-host-rx5e.onrender.com/webhook/vapi-test-call";

export default async (req: Request, context: Context) => {
  // Only allow POST
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ ok: false, error: "method_not_allowed" }),
      { status: 405, headers: { "Content-Type": "application/json" } }
    );
  }

  // Get client IP for rate limiting
  const clientIP = getClientIP(req, context);

  // Check rate limit
  if (!checkRateLimit(clientIP)) {
    return new Response(
      JSON.stringify({ ok: false, error: "rate_limited" }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  // Parse request body
  let body: { phone?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ ok: false, error: "invalid_json" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const rawPhone = body.phone;
  if (!rawPhone || typeof rawPhone !== "string") {
    return new Response(
      JSON.stringify({ ok: false, error: "invalid_phone" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Validate and normalize phone
  const { valid, normalized, error } = normalizePhone(rawPhone);
  if (!valid) {
    return new Response(
      JSON.stringify({ ok: false, error }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Forward to n8n webhook (server-side)
  try {
    const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: normalized }),
    });

    if (!n8nResponse.ok) {
      console.error(`n8n webhook returned status ${n8nResponse.status}`);
      return new Response(
        JSON.stringify({ ok: false, error: "upstream_failed" }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ ok: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error calling n8n webhook:", err);
    return new Response(
      JSON.stringify({ ok: false, error: "upstream_failed" }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const config: Config = {
  path: "/api/test-call",
};
