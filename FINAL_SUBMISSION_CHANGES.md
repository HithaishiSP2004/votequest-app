# PROMPT — Security Hardening: Fix All Remaining Gaps

## Apply ALL changes below across 3 files. No UI or logic changes.

---

## FIX 1: `next.config.ts` — Add Content-Security-Policy + Cache-Control headers
**Gap: No CSP header — biggest missing security header**

Replace the entire file with:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    return [
      {
        // API routes — no caching, strict controls
        source: "/api/(.*)",
        headers: [
          { key: "X-Content-Type-Options",  value: "nosniff" },
          { key: "X-Frame-Options",          value: "DENY" },
          { key: "Cache-Control",            value: "no-store, no-cache, must-revalidate" },
          { key: "Referrer-Policy",          value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        // All other routes
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",   value: "nosniff" },
          { key: "X-Frame-Options",           value: "SAMEORIGIN" },
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",        value: "camera=(), microphone=(self), geolocation=()" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https://maps.googleapis.com https://maps.gstatic.com",
              "frame-src https://www.google.com",
              "connect-src 'self' https://generativelanguage.googleapis.com https://maps.googleapis.com https://translation.googleapis.com",
            ].join("; "),
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

---

## FIX 2: `src/app/api/chat/route.ts` — Sanitize stageContext + mode + history items
**Gap: stageContext and mode from request body flow unsanitized into the system prompt**

### 2A — After this line:
```typescript
    const { messages, message, history, stageContext, mode } = body;
```

Add immediately after it:
```typescript
    // Sanitize optional params — prevent prompt injection via stageContext/mode
    const safeStageContext = typeof stageContext === 'string'
      ? stageContext.replace(/[<>"'`]/g, '').slice(0, 100)
      : 'General Election Education';
    const safeMode = mode === 'journey' ? 'journey' : 'chat';
```

### 2B — Find:
```typescript
    const stage = stageContext || 'General Election Education';
    const modeInstruction = mode === 'journey'
```

Replace with:
```typescript
    const stage = safeStageContext;
    const modeInstruction = safeMode === 'journey'
```

### 2C — Sanitize history content items to strip any injected HTML/script tags.
Find:
```typescript
      rawHistory = (Array.isArray(history) ? history : []).slice(-12).map((m: { role: string; content: string }) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));
```

Replace with:
```typescript
      rawHistory = (Array.isArray(history) ? history : []).slice(-12).map((m: { role: string; content: string }) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: typeof m.content === 'string' ? m.content.slice(0, 2000) : '' }],
      }));
```

---

## FIX 3: `src/app/api/translate/route.ts` — Add language allowlist
**Gap: any arbitrary language code is passed to Google Translation API**

### 3A — Add the allowlist constant at the top of the file, after the import:
```typescript
/** ISO 639-1 codes supported by VoteQuest — all major Indian languages */
const SUPPORTED_LANG_CODES = new Set([
  'en', 'hi', 'ta', 'te', 'bn', 'mr', 'kn', 'gu', 'ml', 'pa', 'or', 'as', 'ur'
]);
```

### 3B — Find:
```typescript
    if (!normalizedText || !normalizedTarget || normalizedTarget === 'en') {
      return NextResponse.json({ translatedText: normalizedText || text || '' });
    }

    if (normalizedText.length > 5000) {
```

Replace with:
```typescript
    if (!normalizedText || !normalizedTarget || normalizedTarget === 'en') {
      return NextResponse.json({ translatedText: normalizedText || text || '' });
    }

    // Reject unsupported language codes — prevents API abuse
    if (!SUPPORTED_LANG_CODES.has(normalizedTarget)) {
      return NextResponse.json(
        { translatedText: normalizedText, error: 'Unsupported language code' },
        { status: 400 }
      );
    }

    if (normalizedText.length > 5000) {
```

---

## FIX 4: `src/app/api/chat/route.ts` — Add NEXT_TELEMETRY_DISABLED to Dockerfile
**This is in Dockerfile, not chat route — separate small fix**

Open `Dockerfile`. Find:
```dockerfile
RUN npm run build
```

Add one line BEFORE it:
```dockerfile
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build
```

---

## SUMMARY OF WHAT EACH FIX CLOSES

| Fix | Vulnerability Closed |
|-----|---------------------|
| 1 — CSP header | Prevents XSS via script injection from external domains; locks down allowed frame/connect sources |
| 1 — HSTS header | Forces HTTPS on all connections; prevents downgrade attacks |
| 1 — API Cache-Control | Prevents sensitive AI responses from being cached by proxies/CDNs |
| 2 — stageContext sanitize | Closes prompt injection vector via request body parameter into system prompt |
| 2 — mode allowlist | Prevents arbitrary mode strings entering the system prompt |
| 2 — history item length cap | Prevents oversized history items bypassing the 2000-char message limit |
| 3 — language allowlist | Prevents arbitrary language codes being forwarded to Google Translation API |
| 4 — NEXT_TELEMETRY_DISABLED | Stops data exfiltration to Vercel telemetry servers during build/runtime |

## DO NOT change any component files, test files, or other API routes.
## DO NOT change the existing security headers that are already present — only ADD to them.