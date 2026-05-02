import { NextRequest, NextResponse } from 'next/server';

// Server-side Google Maps Embed API route.
// The API key stays on the server (GOOGLE_MAPS_API_KEY, no NEXT_PUBLIC_ prefix)
// and is never exposed to the browser bundle.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || 'polling booth near me India';

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ embedUrl: null }, { status: 200 });
  }

  const encodedQuery = encodeURIComponent(q);
  const embedUrl = `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${encodedQuery}&language=en`;

  return NextResponse.json({ embedUrl });
}
