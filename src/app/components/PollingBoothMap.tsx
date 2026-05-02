'use client';

import { useState } from 'react';

export default function PollingBoothMap() {
  const [searchQuery, setSearchQuery] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    const loc = searchQuery.trim();
    if (!loc) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/maps?location=${encodeURIComponent(loc)}`);
      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setEmbedUrl('');
      } else {
        // Setting a new string value always triggers a React re-render
        // The iframe key={embedUrl} forces full unmount+remount each time
        setEmbedUrl(data.embedUrl);
      }
    } catch (e) {
      console.error('Maps fetch error:', e);
      setError('Failed to load map. Please try again.');
      setEmbedUrl('');
    } finally {
      setLoading(false);
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
            opacity: loading ? 0.6 : 1,
          }}
          disabled={loading || !searchQuery.trim()}
        >
          {loading ? '…' : 'Search'}
        </button>
      </div>

      {/* Active query label */}
      {embedUrl && !loading && (
        <div style={{
          fontSize: '0.74rem', color: 'var(--cyan)',
          fontFamily: "'DM Mono',monospace", marginBottom: 8,
        }}>
          📍 polling booth {searchQuery} India
        </div>
      )}

      {/* Map area */}
      {loading && (
        <div style={{
          height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--surface)', borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
        }}>
          <div className="spinner" style={{ width: 28, height: 28, borderWidth: 2 }} />
        </div>
      )}

      {!loading && embedUrl && (
        // key={embedUrl} — React unmounts old iframe and mounts a fresh one
        // whenever the src URL changes. This is required because browsers
        // do not reload an existing iframe when only the src attribute updates.
        <iframe
          key={embedUrl}
          src={embedUrl}
          title="Polling Booth Map"
          width="100%"
          height="350"
          style={{ border: 0, borderRadius: 'var(--radius)', display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      )}

      {!loading && !embedUrl && !error && (
        <div style={{
          height: 200, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 12,
          background: 'var(--surface)', borderRadius: 'var(--radius)',
          border: '1px solid var(--border)', color: 'var(--text-muted)',
        }}>
          <span style={{ fontSize: '2rem' }}>🗺️</span>
          <span style={{ fontSize: '0.85rem' }}>Enter a location above and click Search</span>
        </div>
      )}

      {!loading && error && (
        <div style={{
          background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.25)',
          borderRadius: 'var(--radius)', padding: '18px 20px',
          fontSize: '0.85rem', color: 'var(--text-muted)',
        }}>
          <p style={{ fontWeight: 600, marginBottom: 6, color: 'var(--text)' }}>📍 Polling Booth Locator</p>
          <p style={{ marginBottom: 10 }}>Maps API not available. Find your booth on the official ECI portal:</p>
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
