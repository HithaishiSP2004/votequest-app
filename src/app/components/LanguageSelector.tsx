'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useLang } from '../lib/LangContext';
import { LANGUAGES } from '../lib/translations';
import { IconGlobe, IconChevronDown } from './Icons';

export default function LanguageSelector() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find(l => l.code === lang)!;

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
          background: 'rgba(108,99,255,0.12)', border: '1px solid rgba(108,99,255,0.3)',
          borderRadius: 50, cursor: 'pointer', color: '#e8e8f0',
          fontFamily: "'Inter',sans-serif", fontSize: '0.82rem', fontWeight: 500,
          transition: 'all 0.2s', whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(108,99,255,0.22)'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(108,99,255,0.12)'}
      >
        <IconGlobe size={14} color="var(--cyan, #00d4ff)" strokeWidth={2} />
        <span style={{ color: '#e8e8f0' }}>{current.native}</span>
        <IconChevronDown size={12} color="rgba(255,255,255,0.5)" strokeWidth={2.5} style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0,
          background: 'rgba(10,10,28,0.98)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(108,99,255,0.35)', borderRadius: 14,
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)', zIndex: 9001,
          minWidth: 180, overflow: 'hidden',
          animation: 'fadeUp 0.15s ease',
        }}>
          <div style={{ padding: '8px 12px 6px', fontFamily: "'DM Mono',monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            Select Language
          </div>
          {LANGUAGES.map(l => (
            <button key={l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', padding: '10px 14px', background: lang === l.code ? 'rgba(108,99,255,0.2)' : 'transparent',
                border: 'none', cursor: 'pointer', color: lang === l.code ? '#fff' : '#a0a0c0',
                fontFamily: "'Inter',sans-serif", fontSize: '0.85rem', transition: 'all 0.15s',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}
              onMouseEnter={e => { if (lang !== l.code) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}
              onMouseLeave={e => { if (lang !== l.code) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              <span style={{ fontWeight: lang === l.code ? 700 : 400 }}>{l.native}</span>
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', fontFamily: "'DM Mono',monospace" }}>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
