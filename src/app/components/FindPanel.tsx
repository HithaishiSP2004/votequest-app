'use client';
import React, { useState } from 'react';
import PollingBoothMap from './PollingBoothMap';

interface FindPanelProps {
  onXP: (n: number, reason: string) => void;
}

const officialResources = [
  { icon: '🗳️', title: 'ECI Voter Portal', desc: 'Find your polling booth & verify voter registration', url: 'https://voters.eci.gov.in' },
  { icon: '📱', title: 'Voter Helpline App', desc: 'Official ECI mobile app for voter services', url: 'https://play.google.com/store/apps/details?id=com.eci.ci' },
  { icon: '📋', title: 'NVSP – National Voter Service Portal', desc: 'Apply online for voter ID, corrections & more', url: 'https://www.nvsp.in' },
];

export default function FindPanel({ onXP }: FindPanelProps) {
  const [constituency, setConstituency] = useState('');
  const [state, setState] = useState('');
  const [results, setResults] = useState<null | 'loading' | 'found' | 'notfound' | 'error'>(null);
  const [formError, setFormError] = useState('');

  const findPolling = async () => {
    if (!constituency.trim() || !state.trim()) {
      setFormError('Please enter your constituency/area and select your state.');
      return;
    }
    setFormError('');
    setResults('loading');
    try {
      const addr = encodeURIComponent(`${constituency}, ${state}`);
      const res = await fetch(`/api/polling-place?address=${addr}`);
      if (!res.ok) throw new Error(`Polling lookup failed (${res.status})`);
      const data = await res.json();
      if (data.locations && data.locations.length > 0) {
        setResults('found');
        onXP(15, 'Checked polling booth location!');
      } else {
        setResults('notfound');
        onXP(10, 'Explored polling booth resources!');
      }
    } catch {
      setResults('error');
    }
  };

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Puducherry',
  ];

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px 60px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>

        {/* Left: Form */}
        <div>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: '2rem', fontWeight: 900, letterSpacing: '-1px', marginBottom: 8 }}>
            📍 Find Your Polling Booth
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 28 }}>
            Enter your area and state to locate your nearest polling booth and check voter registration on the ECI portal.
          </p>

          <div style={{ marginBottom: 16 }}>
            <label htmlFor="find-constituency" className="form-label">Constituency / Area / Village</label>
            <input id="find-constituency" className="form-input" placeholder="e.g. Connaught Place, Karol Bagh, Sector 15..." value={constituency} onChange={e => setConstituency(e.target.value)} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label htmlFor="find-state" className="form-label">State / Union Territory</label>
            <select
              id="find-state"
              className="form-input"
              value={state}
              onChange={e => setState(e.target.value)}
              style={{ cursor: 'pointer' }}
            >
              <option value="">Select your state...</option>
              {indianStates.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <button className="btn-primary" onClick={findPolling} style={{ marginBottom: 14, width: '100%', justifyContent: 'center' }}>
            Find Polling Booth →
          </button>
          {formError && (
            <p role="alert" style={{ marginTop: -6, marginBottom: 10, color: 'var(--red,#ff4757)', fontSize: '0.8rem' }}>
              {formError}
            </p>
          )}
          <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer"
            style={{ display: 'block', textAlign: 'center', color: 'var(--primary)', fontFamily: "'DM Mono',monospace", fontSize: '0.75rem', textDecoration: 'none', letterSpacing: '0.04em' }}>
            Also check voters.eci.gov.in ↗
          </a>

          {/* Results */}
          <div style={{ marginTop: 24 }}>
            {results === 'loading' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <div className="spinner" style={{ width: 24, height: 24, borderWidth: 2 }} />
                Searching for polling booths...
              </div>
            )}

            {(results === 'notfound' || results === 'error' || results === 'found') && (
              <div className="glass-sm" style={{ padding: '20px 22px' }}>
                {/* Indian flag tricolor accent bar */}
                <div style={{ height: 4, borderRadius: 4, background: 'linear-gradient(90deg, #FF9933, #fff 33%, #fff 66%, #138808)', marginBottom: 16, opacity: 0.8 }} />
                <p style={{ fontWeight: 600, marginBottom: 10, fontSize: '0.92rem' }}>
                  🗳️ Find your polling booth on these official portals:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {officialResources.map((r, i) => (
                    <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, textDecoration: 'none', color: 'var(--text)', fontSize: '0.85rem', transition: 'all 0.2s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--primary)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}>
                      <span style={{ fontSize: '1.2rem' }}>{r.icon}</span>
                      <div>
                        <div style={{ fontWeight: 600 }}>{r.title}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{r.desc}</div>
                      </div>
                    </a>
                  ))}
                </div>
                <p style={{ marginTop: 12, fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                  📞 Voter Helpline: <strong style={{ color: 'var(--cyan)' }}>1950</strong> (toll-free) · Available in all Indian languages
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Map + Resources */}
        <div>
          {/* Google Maps Embed for Polling Booth Discovery */}
          <PollingBoothMap />

          {/* Key resources */}
          <div className="glass-sm" style={{ padding: 20 }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 14 }}>
              🇮🇳 Key Voting Resources — India
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {officialResources.map((r, i) => (
                <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, textDecoration: 'none', color: 'var(--text)', fontSize: '0.85rem', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--primary)'; (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.transform = ''; }}>
                  <span style={{ fontSize: '1.4rem' }}>{r.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>{r.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{r.desc}</div>
                  </div>
                  <span style={{ marginLeft: 'auto', color: 'var(--primary)', fontSize: '0.85rem' }}>↗</span>
                </a>
              ))}
            </div>
            <div style={{ marginTop: 14, padding: '10px 14px', background: 'rgba(255,153,51,0.08)', border: '1px solid rgba(255,153,51,0.2)', borderRadius: 8 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: 4, color: '#FF9933' }}>📞 ECI Voter Helpline</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Call <strong style={{ color: 'var(--text)' }}>1950</strong> — Free, available in all languages, 7AM–9PM on election days</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
