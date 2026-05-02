import { NextRequest, NextResponse } from 'next/server';

// Server-side Google Maps Embed API route.
// The API key stays on the server (GOOGLE_MAPS_API_KEY, no NEXT_PUBLIC_ prefix)
// and is never exposed to the browser bundle.
//
// Accepts:  ?location=ramanagara+Karnataka
// Builds:   polling booth ramanagara Karnataka India
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location') || '';

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ embedUrl: null }, { status: 200 });
  }

  // Build a precise query: "polling booth <location> India"
  // This ensures Maps zooms to the right area instead of world view
  const query = location.trim()
    ? `polling booth ${location.trim()} India`
    : 'polling booth India';

  const embedUrl = `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${encodeURIComponent(query)}&language=en`;

  return NextResponse.json({ embedUrl, query });
}
