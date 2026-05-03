import { NextRequest, NextResponse } from 'next/server';

// India's geographic center (fallback)
const INDIA_LAT = 20.5937;
const INDIA_LNG = 78.9629;
const CACHE_TTL_MS = 10 * 60 * 1000;
const geocodeCache = new Map<string, { lat: number; lng: number; fallback: boolean; ts: number }>();

export async function GET(request: NextRequest) {
  const locationRaw = (request.nextUrl.searchParams.get('location') || 'India').trim();
  const location = locationRaw.slice(0, 120);
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.error('[/api/maps] ERROR: GOOGLE_MAPS_API_KEY is not set');
    return NextResponse.json({ error: 'No API key' }, { status: 500 });
  }

  if (!location) {
    return NextResponse.json({ error: 'Location is required' }, { status: 400 });
  }

  const q = `polling booth ${location} India`;
  const cacheKey = q.toLowerCase();
  const cached = geocodeCache.get(cacheKey);
  const isFresh = cached && (Date.now() - cached.ts < CACHE_TTL_MS);

  // ── Step 1: Geocode the query to get a precise lat/lng ──────────────────
  let lat: number = INDIA_LAT;
  let lng: number = INDIA_LNG;
  let fallback = true;

  if (isFresh && cached) {
    lat = cached.lat;
    lng = cached.lng;
    fallback = cached.fallback;
  } else {
    try {
      const geocodeParams = new URLSearchParams({
        address: q,
        key: apiKey,
        region: 'in',
        components: 'country:IN',
      });

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const geocodeRes = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?${geocodeParams.toString()}`,
        { signal: controller.signal, cache: 'no-store' }
      ).finally(() => clearTimeout(timeout));
      const geocodeData = await geocodeRes.json();

      if (geocodeData.status === 'OK' && geocodeData.results?.length > 0) {
        const loc = geocodeData.results[0].geometry.location;
        lat = loc.lat;
        lng = loc.lng;
        fallback = false;
      }
    } catch (err) {
      console.error('[/api/maps] Geocoding request error:', err);
    }

    geocodeCache.set(cacheKey, { lat, lng, fallback, ts: Date.now() });
  }

  // ── Step 2: Build the Maps Embed URL with the resolved center ───────────
  const embedParams = new URLSearchParams({
    key: apiKey,
    q: q,
    center: `${lat},${lng}`,
    zoom: fallback ? '5' : '14',
    language: 'en',
  });

  const embedUrl = `https://www.google.com/maps/embed/v1/search?${embedParams.toString()}`;

  return NextResponse.json({
    embedUrl,
    center: { lat, lng },
    fallback,
  });
}
