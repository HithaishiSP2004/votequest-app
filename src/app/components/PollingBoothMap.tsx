'use client';

import { useState, useEffect } from 'react';

export default function PollingBoothMap() {
  const [searchInput, setSearchInput] = useState('');
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState('');

  // Fetch the embed URL from our server-side API route.
  // The Google Maps API key stays on the server (GOOGLE_MAPS_API_KEY)
  // and is never exposed to the browser bundle.
  const fetchEmbedUrl = async (location: string) => {
    setLoading(true);
    setEmbedUrl(null); // clear first so iframe unmounts (key change triggers remount)
    try {
      const params = location.trim()
        ? `?location=${encodeURIComponent(location.trim())}`
        : '';
      const res = await fetch(`/api/maps${params}`);
      const data = await res.json();
      setEmbedUrl(data.embedUrl || null);
    } catch {
      setEmbedUrl(null);
    } finally {
      setLoading(false);
    }
  };

  // Load default map on mount
  useEffect(() => {
    fetchEmbedUrl('');
  }, []);

  const handleSearch = () => {
    const loc = searchInput.trim();
    if (!loc) return;
    setCurrentLocation(loc);
    fetchEmbedUrl(loc);
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3 style={{
        fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: '1rem',
        marginBottom: 12, color: 'var(--text)',
      }}>
        🗺️ Find Your Polling Booth — Google Maps
      </h3>

      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Enter your area, pincode or city..."
          className="form-input"
          style={{ flex: 1, fontSize: '0.85rem' }}
          aria-label="Search polling booth by location"
        />
        <button
          onClick={handleSearch}
          className="btn-primary"
          style={{ flexShrink: 0, fontSize: '0.85rem', padding: '8px 18px' }}
          disabled={loading}
        >
          {loading ? '…' : 'Search'}
        </button>
      </div>

      {/* Show active search context */}
      {currentLocation && !loading && (
        <div style={{
          fontSize: '0.74rem', color: 'var(--cyan)', fontFamily: "'DM Mono',monospace",
          marginBottom: 8, paddingLeft: 2,
        }}>
          📍 Showing: polling booth {currentLocation} India
        </div>
      )}

      <div style={{ position: 'relative', borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--border)' }}>
        {loading && (
          <div style={{
            height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--surface)',
          }}>
            <div className="spinner" style={{ width: 28, height: 28, borderWidth: 2 }} />
          </div>
        )}

        {!loading && embedUrl && (
          /* key={embedUrl} forces React to unmount+remount the iframe
             whenever the URL changes — this is the only reliable way
             to make the browser load a new Maps location */
          <iframe
            key={embedUrl}
            title="Polling Booth Map"
            width="100%"
            height="350"
            style={{ border: 0, display: 'block' }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={embedUrl}
          />
        )}

        {!loading && !embedUrl && (
          <div style={{
            background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.25)',
            borderRadius: 'var(--radius)', padding: '18px 20px',
            fontSize: '0.85rem', color: 'var(--text-muted)',
          }}>
            <p style={{ fontWeight: 600, marginBottom: 6, color: 'var(--text)' }}>📍 Polling Booth Locator</p>
            <p style={{ marginBottom: 10 }}>To find your nearest polling booth, visit the official ECI voter portal:</p>
            <a
              href="https://electoralsearch.eci.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}
            >
              electoralsearch.eci.gov.in →
            </a>
          </div>
        )}
      </div>

      <p style={{ marginTop: 10, fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: "'DM Mono',monospace" }}>
        🗺️ Powered by Google Maps Embed API · Also visit{' '}
        <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer"
          style={{ color: 'var(--cyan)', textDecoration: 'none' }}>voters.eci.gov.in</a>
        {' '}for official booth details
      </p>
    </div>
  );
}
