import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const location = request.nextUrl.searchParams.get('location') || 'India';
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.error('[/api/maps] ERROR: GOOGLE_MAPS_API_KEY is not set');
    return NextResponse.json({ error: 'Maps API key not configured' }, { status: 500 });
  }

  const query = encodeURIComponent(`polling booth ${location} India`);
  const embedUrl = `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${query}&zoom=13&language=en`;

  // Debug log — verify key is present and URL is correct
  console.log('[/api/maps] location:', location);
  console.log('[/api/maps] query:', `polling booth ${location} India`);
  console.log('[/api/maps] embedUrl (first 80 chars):', embedUrl.slice(0, 80));
  console.log('[/api/maps] apiKey present:', !!apiKey, '| key length:', apiKey.length);

  return NextResponse.json({ embedUrl });
}
