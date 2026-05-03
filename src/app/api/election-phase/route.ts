import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Cache the phase for 6 hours to avoid repeated API calls
let phaseCache: { data: ElectionPhaseData; fetchedAt: number } | null = null;
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

export interface ElectionPhaseData {
  phase: string;
  emoji: string;
  description: string;
  nextStep: string;
  upcomingElections: string[];
  source: 'live' | 'fallback';
}

function isValidElectionPhasePayload(data: unknown): data is Omit<ElectionPhaseData, 'source'> {
  if (!data || typeof data !== 'object') return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.phase === 'string' &&
    typeof d.emoji === 'string' &&
    typeof d.description === 'string' &&
    typeof d.nextStep === 'string' &&
    Array.isArray(d.upcomingElections) &&
    d.upcomingElections.every(item => typeof item === 'string')
  );
}

export async function GET() {
  // Return cached data if fresh
  if (phaseCache && Date.now() - phaseCache.fetchedAt < CACHE_TTL_MS) {
    return NextResponse.json(phaseCache.data);
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      tools: [{ googleSearch: {} } as any],
    });

    const prompt = `Today is ${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.

Search for: "India election schedule 2025 2026 upcoming state elections ECI"

Based on your search results, respond ONLY with a valid JSON object (no markdown, no explanation) in this exact format:
{
  "phase": "current Indian electoral phase in 5-8 words",
  "emoji": "single relevant emoji",
  "description": "one sentence describing current electoral context in India",
  "nextStep": "one actionable sentence for Indian voter right now",
  "upcomingElections": ["State/Election Name - Month Year", "...up to 3 items"]
}

If you cannot find current info, use: {"phase": "Electoral Roll Revision Period", "emoji": "📋", "description": "Annual voter registration drives are ongoing across India.", "nextStep": "Verify your voter registration at voters.eci.gov.in", "upcomingElections": []}`;

    let timeoutId: NodeJS.Timeout | null = null;
    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error('Election-phase request timeout after 25s'));
      }, 25000);
    });

    const result = await Promise.race([
      model.generateContent(prompt),
      timeoutPromise,
    ]);

    if (timeoutId) clearTimeout(timeoutId);
    
    // Type assertion because model.generateContent returns GenerateContentResult which has response
    const text = (result as any).response.text().trim();
    
    // Parse JSON safely
    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean) as unknown;
    if (!isValidElectionPhasePayload(parsed)) {
      throw new Error('Invalid election-phase payload format');
    }
    const data: ElectionPhaseData = { ...parsed, source: 'live' };
    
    phaseCache = { data, fetchedAt: Date.now() };
    return NextResponse.json(data);

  } catch (err) {
    console.error('[/api/election-phase] Error:', err);
    // Graceful fallback
    const fallback: ElectionPhaseData = {
      phase: 'Electoral Awareness Season',
      emoji: '🗳️',
      description: 'India\'s democracy is always active — stay informed and verify your voter registration.',
      nextStep: 'Check voters.eci.gov.in for your voter registration status.',
      upcomingElections: [],
      source: 'fallback'
    };
    return NextResponse.json(fallback);
  }
}
