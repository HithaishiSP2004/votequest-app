'use client';

import { useState } from 'react';

export default function PollingBoothMap() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [mapEmbedUrl, setMapEmbedUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFallback, setIsFallback] = useState<boolean | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/maps?location=' + encodeURIComponent(searchQuery));
      const data = await res.json();
      console.log('Setting embed URL:', data.embedUrl, '| fallback:', data.fallback);
      setMapEmbedUrl(data.embedUrl);
      setIsFallback(data.fallback ?? null);
      setActiveQuery(searchQuery);
    } catch (err) {
      console.error('Map search failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3 style={{
        fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: '1rem',
        marginBottom: 12, color: 'var(--text)',
      }}>
        🗺️ Find Your Polling Booth — Google Maps
      </h3>

      {/* Search row */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Enter your area, pincode or city..."
          className="form-input"
          style={{ flex: 1, fontSize: '0.85rem' }}
          aria-label="Search polling booth by location"
        />
        <button
          onClick={handleSearch}
          className="btn-primary"
          style={{
            flexShrink: 0, fontSize: '0.85rem', padding: '8px 18px',
            opacity: isLoading ? 0.6 : 1,
          }}
          disabled={isLoading || !searchQuery.trim()}
        >
          {isLoading ? '…' : 'Search'}
        </button>
      </div>

      {/* Active query label */}
      {mapEmbedUrl && (
        <div style={{
          fontSize: '0.74rem', color: 'var(--cyan)',
          fontFamily: "'DM Mono',monospace", marginBottom: 6,
        }}>
          📍 polling booth {activeQuery} India
        </div>
      )}

      {/* Geocode status notice */}
      {mapEmbedUrl && isFallback !== null && (
        <div style={{
          fontSize: '0.75rem',
          fontFamily: "'Outfit',sans-serif",
          marginBottom: 10,
          padding: '6px 10px',
          borderRadius: '6px',
          background: isFallback ? 'rgba(234,179,8,0.12)' : 'rgba(34,197,94,0.12)',
          border: `1px solid ${isFallback ? 'rgba(234,179,8,0.4)' : 'rgba(34,197,94,0.4)'}`,
          color: isFallback ? '#ca8a04' : '#16a34a',
        }}>
          {isFallback
            ? '⚠️ Exact location not found on map. Showing India view. Try the ECI portal for precise booth location.'
            : `✅ Showing results near ${activeQuery}, India`}
        </div>
      )}

      {/* Map / placeholder */}
      {mapEmbedUrl ? (
        // key={mapEmbedUrl} forces React to fully unmount+remount the iframe
        // on every new URL — without this, browsers ignore src changes
        // on the same iframe DOM element.
        <iframe
          key={mapEmbedUrl}
          src={mapEmbedUrl}
          width="100%"
          height="400"
          style={{ border: 0, borderRadius: '8px', display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Polling booth location map"
        />
      ) : (
        <div style={{
          height: 200, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 12,
          background: 'var(--surface)', borderRadius: '8px',
          border: '1px solid var(--border)', color: 'var(--text-muted)',
        }}>
          {isLoading ? (
            <div className="spinner" style={{ width: 28, height: 28, borderWidth: 2 }} />
          ) : (
            <>
              <span style={{ fontSize: '2rem' }}>🗺️</span>
              <span style={{ fontSize: '0.85rem' }}>Enter a location above and click Search</span>
              <a
                href="https://electoralsearch.eci.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.8rem', color: 'var(--primary)', textDecoration: 'underline' }}
              >
                Or search on electoralsearch.eci.gov.in →
              </a>
            </>
          )}
        </div>
      )}

      <p style={{
        marginTop: 10, fontSize: '0.72rem',
        color: 'var(--text-dim)', fontFamily: "'DM Mono',monospace",
      }}>
        🗺️ Powered by Google Maps Embed API · Also visit{' '}
        <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer"
          style={{ color: 'var(--cyan)', textDecoration: 'none' }}>
          voters.eci.gov.in
        </a>
        {' '}for official booth details
      </p>
    </div>
  );
}
