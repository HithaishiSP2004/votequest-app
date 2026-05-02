'use client';
import React from 'react';

const resources = [
  { icon: '🗳️', color: 'var(--saffron)', title: 'ECI Voter Portal', desc: 'Official Election Commission of India portal for voter registration, polling booth finder, and electoral roll verification.', url: 'https://voters.eci.gov.in', label: 'visit voters.eci.gov.in' },
  { icon: '🏛️', color: 'var(--primary)', title: 'Election Commission of India', desc: 'The constitutional body that superintends, directs, and controls elections to Parliament, State Legislatures, and offices of President and Vice-President.', url: 'https://www.eci.gov.in', label: 'visit eci.gov.in' },
  { icon: '📋', color: 'var(--india-green)', title: 'NVSP — National Voter Service Portal', desc: 'Apply online for new voter ID (Form 6), corrections (Form 8), overseas voter registration, and track application status.', url: 'https://www.nvsp.in', label: 'visit nvsp.in' },
  { icon: '📱', color: 'var(--saffron)', title: 'Voter Helpline App', desc: 'Official ECI mobile app for voter services — find your polling booth, check name on electoral roll, and more. Available in multiple languages.', url: 'https://play.google.com/store/apps/details?id=com.eci.ci', label: 'download app' },
  { icon: '🔍', color: 'var(--primary)', title: 'cVIGIL — Citizen Vigilance App', desc: 'Report Model Code of Conduct violations directly to the Election Commission. Upload photo/video evidence; ECI resolves within 100 minutes.', url: 'https://cvigil.eci.gov.in', label: 'visit cvigil.eci.gov.in' },
  { icon: '📊', color: 'var(--india-green)', title: 'MyGov — Democracy Platform', desc: 'Government of India platform for citizen engagement, policy discussions, and election-related information and updates.', url: 'https://www.mygov.in', label: 'visit mygov.in' },
  { icon: '🎓', color: 'var(--saffron)', title: 'SVEEP — Voter Education', desc: 'Systematic Voters Education and Electoral Participation programme by ECI to increase voter awareness and participation.', url: 'https://www.ecisveep.nic.in', label: 'visit ecisveep.nic.in' },
  { icon: '⚖️', color: 'var(--primary)', title: 'Know Your Voter Rights', desc: 'Understand your rights as a voter in India — secret ballot, assisted voting, accessibility provisions, and what to do if your name is missing.', url: 'https://voters.eci.gov.in/voter-guide', label: 'visit eci voter guide' },
  { icon: '🌐', color: 'var(--india-green)', title: 'SUVIDHA Portal', desc: 'Online permission portal for political parties and candidates to apply for permissions required during election campaigning.', url: 'https://suvidha.eci.gov.in', label: 'visit suvidha.eci.gov.in' },
];

export default function ResourcesPanel() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px 60px' }}>
      <div style={{ marginBottom: 40 }}>
        {/* Indian tricolor accent */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
          <div style={{ width: 36, height: 4, background: '#FF9933', borderRadius: 2 }} />
          <div style={{ width: 36, height: 4, background: '#fff', borderRadius: 2 }} />
          <div style={{ width: 36, height: 4, background: '#138808', borderRadius: 2 }} />
        </div>
        <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: '2rem', fontWeight: 900, letterSpacing: '-1px', marginBottom: 8 }}>
          📚 Indian Voter Resources
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Everything you need to become an informed, empowered voter in India's democracy — the world's largest.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
        {resources.map((r, i) => (
          <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
            className="resource-card"
            style={{ textDecoration: 'none', display: 'block' }}>
            {/* Top accent line — tricolor cycling */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${r.color}, transparent)`, borderRadius: '14px 14px 0 0' }} />

            <div style={{ fontSize: '2rem', marginBottom: 12 }}>{r.icon}</div>
            <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: '0.95rem', marginBottom: 8, color: 'var(--text)' }}>
              {r.title}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>
              {r.desc}
            </div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.73rem', color: r.color, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: 4 }}>
              {r.label} <span>↗</span>
            </div>
          </a>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="glass" style={{ marginTop: 48, padding: '28px 36px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Tricolor bar at top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #FF9933 33%, #fff 33% 66%, #138808 66%)' }} />
        <div style={{ fontSize: '2rem', marginBottom: 10 }}>🇮🇳</div>
        <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: '1.3rem', marginBottom: 8 }}>
          Ready to make your voice heard?
        </h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: 8, fontSize: '0.9rem' }}>
          India is the world's largest democracy. Your vote shapes the nation.
        </p>
        <p style={{ color: 'var(--text-dim)', marginBottom: 22, fontSize: '0.82rem' }}>
          VoteQuest is non-partisan. Our goal is to inform and empower every eligible Indian voter.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://www.nvsp.in" target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ display: 'inline-flex' }}>
            Register at NVSP ↗
          </a>
          <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display: 'inline-flex' }}>
            ECI Voter Portal ↗
          </a>
        </div>
        <p style={{ marginTop: 16, fontSize: '0.75rem', color: 'var(--text-dim)' }}>
          📞 Voter Helpline: <strong>1950</strong> (Toll-Free)
        </p>
      </div>
    </div>
  );
}
