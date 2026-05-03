# VoteQuest Final Submission Changes (Top-100 Optimization Pass)

This file documents **all major code changes** done in this session to improve Hack2Skills AI analysis scores across:

- Code Quality
- Efficiency
- Security
- Accessibility
- Testing alignment
- Google Services integration clarity

---

## 1) High-level work completed

### A) Security hardening
- Fixed unsafe model-output rendering paths.
- Added HTML escaping before rendering markdown-like content.
- Reduced API error-detail leakage in chat route.
- Added security HTTP headers in Next.js config.

### B) Efficiency and reliability
- Added API request timeouts for expensive AI routes.
- Added schema validation for AI JSON output before caching/use.
- Added server-side caching and bounded histories where needed.
- Added abortable fetch flows in UI to avoid race/stale updates.

### C) Accessibility improvements
- Improved ARIA semantics in navigation and forms.
- Converted non-semantic clickable elements to keyboard-friendly buttons.
- Added `role="status"` / `role="alert"` and better labels.

### D) README and judge-facing clarity
- Replaced/updated README with evaluation-focused structure.
- Added rubric mapping and clear Google service evidence.
- Documented environment variables and realistic architecture.

---

## 2) Files changed and what was done

## `src/app/components/ChatPanel.tsx`

### What was changed
- Translation now follows selected app language from `LangContext`.
- Added safe HTML escaping before `dangerouslySetInnerHTML`.
- Improved message history correctness with `messagesRef`.
- Centralized plain-text cleanup for TTS with `stripMarkup`.

### Key code added/updated
```ts
const { t, speak, stopSpeaking, isSpeaking, speechLang, lang } = useLang();
const messagesRef = useRef<Message[]>(messages);

useEffect(() => {
  messagesRef.current = messages;
}, [messages]);
```

```ts
const escapeHtml = useCallback((raw: string): string => (
  raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
), []);

const formatSafeMsg = useCallback((text: string): string => {
  const escaped = escapeHtml(text);
  return formatMsg(escaped);
}, [escapeHtml]);
```

```ts
body: JSON.stringify({
  message: text,
  history: messagesRef.current.slice(-10),
  mode,
  stageContext: 'General Election Education'
})
```

```tsx
dangerouslySetInnerHTML={{ __html: formatSafeMsg(m.content) }}
```

---

## `src/app/components/FloatingAssistant.tsx`

### What was changed
- Added safe HTML rendering path (escape + markdown conversion).
- Fixed stale message history usage via `messagesRef`.

### Key code added/updated
```ts
const messagesRef = useRef<Message[]>(messages);
useEffect(() => { messagesRef.current = messages; }, [messages]);
```

```ts
const escapeHtml = useCallback((raw: string) => (
  raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
), []);

const formatSafeMsg = useCallback((raw: string) => (
  escapeHtml(raw)
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#fff">$1</strong>')
    .replace(/\n/g, '<br>')
), [escapeHtml]);
```

```ts
history: messagesRef.current.slice(-8)
```

```tsx
dangerouslySetInnerHTML={{ __html: formatSafeMsg(m.content) }}
```

---

## `src/app/components/JourneyPanel.tsx`

### What was changed
- Added `escapeHtml` and applied it to AI-generated `journeyAnswer`.
- Converted clickable step cards from `div` to keyboard-friendly `button`.
- Added ARIA labels for step navigation.

### Key code added/updated
```ts
function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
```

```tsx
<button
  type="button"
  key={step.id}
  onClick={() => handleStep(step.id)}
  aria-label={`Open step ${step.id}: ${step.title}`}
  style={{ background: 'transparent', border: 'none', color: 'inherit', ... }}
>
```

```tsx
dangerouslySetInnerHTML={{ __html: formatContent(escapeHtml(journeyAnswer)) }}
```

---

## `src/app/components/QuizPanel.tsx`

### What was changed
- Added abortable fetch logic to prevent overlapping quiz requests.
- Added response shape validation before rendering.
- Added clearer error handling and user-facing error messages.
- Added accessibility attributes (`role=status`, `role=alert`, option `aria-label`).

### Key code added/updated
```ts
const abortRef = useRef<AbortController | null>(null);
useEffect(() => () => abortRef.current?.abort(), []);
```

```ts
const controller = new AbortController();
abortRef.current = controller;
const res = await fetch('/api/quiz/random', { signal: controller.signal });
if (!res.ok) throw new Error(`Quiz request failed (${res.status})`);
```

```tsx
<div className="glass" role="status" aria-live="polite">...</div>
<div className="glass" role="alert">...</div>
```

---

## `src/app/components/AdvisorPanel.tsx`

### What was changed
- Reduced repeated parsing/validation of age input.
- Added strong input semantics and ARIA support.
- Added radiogroup semantics for toggle choices.

### Key code added/updated
```ts
const parsedAge = Number.parseInt(age, 10);
const isAgeValid = Number.isInteger(parsedAge) && parsedAge >= 1 && parsedAge <= 120;
```

```tsx
<label htmlFor="advisor-age">Your Age</label>
<input
  id="advisor-age"
  aria-invalid={age !== '' && !isAgeValid}
  aria-describedby="advisor-age-help"
/>
<div id="advisor-age-help">Enter an age between 1 and 120.</div>
```

```tsx
<div role="radiogroup" aria-label="First-time voter">...</div>
<button role="radio" aria-checked={isFirstTime === opt.val}>...</button>
```

---

## `src/app/components/HomePanel.tsx`

### What was changed
- Added abortable fetch for election-phase API call.
- Added better ARIA labels on key CTA buttons.

### Key code added/updated
```ts
const abortRef = useRef<AbortController | null>(null);
useEffect(() => {
  abortRef.current?.abort();
  const controller = new AbortController();
  abortRef.current = controller;
  fetch('/api/election-phase', { signal: controller.signal })
    .then(res => res.json())
    .then(data => setElectionPhase(data))
    .catch(err => {
      if (err?.name !== 'AbortError') console.error('Failed to fetch election phase:', err);
    });
  return () => controller.abort();
}, []);
```

---

## `src/app/components/FindPanel.tsx`

### What was changed
- Replaced `alert` with inline accessible error message.
- Added response status checking before handling JSON.

### Key code added/updated
```ts
if (!constituency.trim() || !state.trim()) {
  setFormError('Please enter your constituency/area and select your state.');
  return;
}
```

```ts
const res = await fetch(`/api/polling-place?address=${addr}`);
if (!res.ok) throw new Error(`Polling lookup failed (${res.status})`);
```

```tsx
{formError && <p role="alert">{formError}</p>}
```

---

## `src/app/page.tsx`

### What was changed
- Strengthened tab typing (`Tab`) and removed unsafe cast behavior.
- Added proper nav semantics and active-tab accessibility state.

### Key code added/updated
```ts
const navigate = useCallback((tab: Tab, msg?: string) => {
  setActiveTab(tab);
  if (msg && tab === 'chat') setChatInitialMsg(msg);
}, []);
```

```tsx
<nav className="tab-bar" aria-label="Primary navigation">
  <button
    aria-current={activeTab === tab.id ? 'page' : undefined}
    aria-label={`Open ${t(tab.labelKey)} tab`}
  >
```

---

## `src/app/api/chat/route.ts`

### What was changed
- Added request-body guard.
- Added max message length guard.
- Bounded parsed history from client.
- Removed internal error details from 500 responses.
- Minor prompt-date efficiency cleanup.

### Key code added/updated
```ts
if (!body || typeof body !== 'object') {
  return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
}
```

```ts
rawHistory = (Array.isArray(history) ? history : [])
  .slice(-12)
  .map(...)
```

```ts
if (lastMessage.length > 2000) {
  return NextResponse.json({ error: 'Message is too long (max 2000 characters).' }, { status: 400 });
}
```

```ts
return NextResponse.json(
  { error: 'Failed to generate response. Please try again.' },
  { status: 500 }
);
```

---

## `src/app/api/quiz/random/route.ts`

### What was changed
- Added strict AI response schema validation.
- Added timeout-based generation guard.
- Improved fallback reuse and removed unused request arg.

### Key code added/updated
```ts
function isValidQuestion(data: unknown): data is QuizQuestion { ... }
const pickFallback = () => FALLBACK_QUESTIONS[Math.floor(Math.random() * FALLBACK_QUESTIONS.length)];
```

```ts
result = await Promise.race([
  model.generateContent(prompt),
  new Promise((_, reject) => setTimeout(() => reject(new Error('Gemini request timeout after 10s')), 10000)),
]);
```

---

## `src/app/api/election-phase/route.ts`

### What was changed
- Added timeout guard for model call.
- Added strict payload shape validation before caching.

### Key code added/updated
```ts
function isValidElectionPhasePayload(data: unknown): data is Omit<ElectionPhaseData, 'source'> { ... }
```

```ts
const result = await Promise.race([
  model.generateContent(prompt),
  new Promise((_, reject) => setTimeout(() => reject(new Error('Election-phase request timeout after 10s')), 10000)),
]);
```

```ts
const parsed = JSON.parse(clean) as unknown;
if (!isValidElectionPhasePayload(parsed)) {
  throw new Error('Invalid election-phase payload format');
}
```

---

## `src/app/api/translate/route.ts`

### What was changed
- Input normalization for text/language.
- Payload-length guard.
- Better fallback behavior on failures.

### Key code added/updated
```ts
const normalizedText = typeof text === 'string' ? text.trim() : '';
const normalizedTarget = typeof targetLanguage === 'string' ? targetLanguage.trim().toLowerCase() : '';
```

```ts
if (normalizedText.length > 5000) {
  return NextResponse.json(
    { translatedText: normalizedText, error: 'Text exceeds translation limit (5000 chars)' },
    { status: 400 }
  );
}
```

---

## `src/app/api/maps/route.ts`

### What was changed
- Added input trimming and max length bounding.
- Added location validation.
- Added in-memory geocode cache + timeout.

### Key code added/updated
```ts
const locationRaw = (request.nextUrl.searchParams.get('location') || 'India').trim();
const location = locationRaw.slice(0, 120);
if (!location) {
  return NextResponse.json({ error: 'Location is required' }, { status: 400 });
}
```

```ts
const CACHE_TTL_MS = 10 * 60 * 1000;
const geocodeCache = new Map<string, { lat: number; lng: number; fallback: boolean; ts: number }>();
```

---

## `src/app/api/polling-place/route.ts`

### What was changed
- Trimmed and validated input address.
- Added address max length guard.
- Safer typed error extraction.

### Key code added/updated
```ts
const address = (searchParams.get('address') || '').trim();
if (!address) { ... }
if (address.length > 200) { ... }
```

---

## `next.config.ts`

### What was changed
- Added security-related response headers.
- Kept microphone permission for voice-input feature.

### Key code added/updated
```ts
async headers() {
  return [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(self), geolocation=()" },
      ],
    },
  ];
}
```

---

## `README.md`

### What was changed
- Rewritten for judge readability and scoring focus.
- Added explicit rubric mapping section.
- Corrected environment variable usage (`GOOGLE_MAPS_API_KEY` server-side).
- Added realistic architecture and route-level references.

---

## 3) Why these changes help Hack2Skills scoring

- **Code Quality:** cleaner typed guards, stable data flow, better semantics, improved structure.
- **Security:** safer rendering, fewer internals exposed, stricter API validation, security headers.
- **Efficiency:** cache/timeout usage, bounded chat history, abortable client fetches.
- **Testing:** test suite already present and aligned with decision-engine core.
- **Accessibility:** better nav semantics, role annotations, keyboard-friendly interactions.
- **Google Services:** Gemini + Search grounding + Maps + Translate + Cloud Run clearly integrated and documented.

---

## 4) Final note

All edits were intentionally **surgical** (minimal-risk, high-impact), designed to maximize evaluator confidence while preserving your existing architecture and features.

