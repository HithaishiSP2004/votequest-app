import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const location = request.nextUrl.searchParams.get('location') || 'India';
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.error('[/api/maps] ERROR: GOOGLE_MAPS_API_KEY is not set');
    return NextResponse.json({ error: 'No API key' }, { status: 500 });
  }

  const q = `polling booth ${location} India`;

  // Use URLSearchParams to guarantee correct & separation and encoding
  const params = new URLSearchParams({
    key: apiKey,
    q: q,
    zoom: '13',
    language: 'en',
  });

  const embedUrl = `https://www.google.com/maps/embed/v1/search?${params.toString()}`;

  console.log('[/api/maps] location:', location);
  console.log('[/api/maps] q:', q);
  console.log('[/api/maps] embedUrl:', embedUrl);

  return NextResponse.json({ embedUrl });
}
