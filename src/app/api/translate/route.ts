import { NextRequest, NextResponse } from 'next/server';

/** ISO 639-1 codes supported by VoteQuest — all major Indian languages + English */
const SUPPORTED_LANG_CODES = new Set([
  'en', 'hi', 'ta', 'te', 'bn', 'mr', 'kn', 'gu', 'ml', 'pa', 'or', 'as', 'ur'
]);

// Google Cloud Translation API integration
export async function POST(request: NextRequest) {
  let fallbackText = '';
  try {
    const { text, targetLanguage } = await request.json();
    const normalizedText = typeof text === 'string' ? text.trim() : '';
    const normalizedTarget = typeof targetLanguage === 'string' ? targetLanguage.trim().toLowerCase() : '';
    fallbackText = normalizedText || (typeof text === 'string' ? text : '');

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
      return NextResponse.json(
        { translatedText: normalizedText, error: 'Text exceeds translation limit (5000 chars)' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

    if (!apiKey) {
      // Graceful fallback: return original text if no API key
      return NextResponse.json({
        translatedText: text,
        note: 'Translation service not configured',
      });
    }

    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: normalizedText,
        target: normalizedTarget,
        source: 'en',
        format: 'text',
      }),
    });

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();
    const translatedText = data.data?.translations?.[0]?.translatedText || text;

    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error('Translation error:', error);
    // Always return something — never break the UI
    return NextResponse.json({ translatedText: fallbackText, error: 'Translation failed, showing original' }, { status: 200 });
  }
}
