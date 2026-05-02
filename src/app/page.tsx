'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useLang } from './lib/LangContext';
import HomePanel from './components/HomePanel';
import ChatPanel from './components/ChatPanel';
import JourneyPanel from './components/JourneyPanel';
import QuizPanel from './components/QuizPanel';
import FindPanel from './components/FindPanel';
import ResourcesPanel from './components/ResourcesPanel';
import AdvisorPanel from './components/AdvisorPanel';
import LanguageSelector from './components/LanguageSelector';
import { IconHome, IconChat, IconMap, IconTarget, IconPin, IconBook, IconAward, IconShield } from './components/Icons';

type Tab = 'home' | 'chat' | 'journey' | 'quiz' | 'find' | 'resources' | 'advisor';

interface ToastData { title: string; msg: string; }

const TAB_ICONS: Record<Tab, React.ReactNode> = {
  home:      <IconHome size={16} strokeWidth={2} />,
  chat:      <IconChat size={16} strokeWidth={2} />,
  journey:   <IconMap size={16} strokeWidth={2} />,
  quiz:      <IconTarget size={16} strokeWidth={2} />,
  find:      <IconPin size={16} strokeWidth={2} />,
  resources: <IconBook size={16} strokeWidth={2} />,
  advisor:   <IconShield size={16} strokeWidth={2} />,
};

export default function Home() {
  const { t } = useLang();
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [xp, setXp] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [toast, setToast] = useState<ToastData | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [chatInitialMsg, setChatInitialMsg] = useState('');
  const MAX_XP = 500;

  const tabs: { id: Tab; labelKey: string }[] = [
    { id: 'home',      labelKey: 'home' },
    { id: 'chat',      labelKey: 'ask_guide' },
    { id: 'journey',   labelKey: 'journey' },
    { id: 'quiz',      labelKey: 'quiz_arena' },
    { id: 'advisor',   labelKey: 'advisor' },
    { id: 'find',      labelKey: 'find_polling' },
    { id: 'resources', labelKey: 'resources' },
  ];

  const addXP = useCallback((amount: number, reason: string) => {
    setXp(prev => Math.min(prev + amount, MAX_XP));
    if (reason.toLowerCase().includes('correct')) setQuizScore(s => s + 1);
    setToast({ title: `+${amount} ${t('civic_xp')}`, msg: reason });
  }, [t]);

  useEffect(() => {
    if (!toast) return;
    setToastVisible(true);
    const timer = setTimeout(() => {
      setToastVisible(false);
      setTimeout(() => setToast(null), 500);
    }, 3200);
    return () => clearTimeout(timer);
  }, [toast]);

  const navigate = (tab: string, msg?: string) => {
    setActiveTab(tab as Tab);
    if (msg && tab === 'chat') setChatInitialMsg(msg);
  };

  const xpPct = Math.min((xp / MAX_XP) * 100, 100);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>

      {/* HEADER */}
      <header style={{ background: 'rgba(6,6,18,0.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 200 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, height: 62 }}>

          {/* Logo */}
          <button onClick={() => setActiveTab('home')} style={{ display: 'flex', alignItems: 'center', gap: 11, background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,#6c63ff,#00d4ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 18px rgba(108,99,255,0.45)', flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
              </svg>
            </div>
            <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:'1.35rem', fontWeight:900, letterSpacing:'-0.5px', whiteSpace:'nowrap', background:'linear-gradient(135deg,#e8e8f0 35%,#6c63ff 65%,#00d4ff 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              VoteQuest
            </div>
          </button>

          {/* Center: XP bar */}
          <div style={{ display:'flex', alignItems:'center', gap:10, flex:1, maxWidth:280, margin:'0 auto' }}>
            <IconAward size={14} color="var(--gold,#ffd700)" strokeWidth={2} />
            <div className="xp-bar-outer" style={{ flex:1 }}>
              <div className="xp-bar-inner" style={{ width:`${xpPct}%` }} />
            </div>
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.75rem', color:'var(--gold,#ffd700)', fontWeight:600, minWidth:48, whiteSpace:'nowrap' }}>
              {xp} XP
            </span>
          </div>

          {/* Right: Language */}
          <div style={{ flexShrink: 0 }}>
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* TAB BAR */}
      <div className="tab-bar">
        {tabs.map(tab => (
          <button key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}>
            <span style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
              {TAB_ICONS[tab.id]}
            </span>
            <span>{t(tab.labelKey)}</span>
          </button>
        ))}
      </div>

      {/* PANELS */}
      <main style={{ flex: 1 }}>
        {activeTab === 'home'      && <HomePanel onNavigate={navigate} xp={xp} quizScore={quizScore} />}
        {activeTab === 'chat'      && <ChatPanel initialMsg={chatInitialMsg} onClearInitial={() => setChatInitialMsg('')} onXP={addXP} />}
        {activeTab === 'journey'   && <JourneyPanel onXP={addXP} />}
        {activeTab === 'quiz'      && <QuizPanel onXP={addXP} />}
        {activeTab === 'advisor'   && <AdvisorPanel />}
        {activeTab === 'find'      && <FindPanel onXP={addXP} />}
        {activeTab === 'resources' && <ResourcesPanel />}
      </main>

      {/* FOOTER */}
      <footer style={{ background:'rgba(6,6,18,0.85)', backdropFilter:'blur(12px)', borderTop:'1px solid var(--border)', textAlign:'center', padding:'0', fontFamily:"'DM Mono',monospace", fontSize:'0.7rem', color:'var(--text-dim)', letterSpacing:'0.04em', overflow:'hidden' }}>
        {/* Tricolor line */}
        <div style={{ height: 3, background: 'linear-gradient(90deg, #FF9933 33%, rgba(255,255,255,0.15) 33% 66%, #138808 66%)' }} />
        <div style={{ padding: '14px 24px' }}>
          🇮🇳 VoteQuest — Empowering India's voters · Non-partisan civic education · Built for{' '}
          <span style={{ color:'var(--primary)' }}>Google PromptWars</span> ·{' '}
          <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" style={{ color:'#FF9933', textDecoration:'none' }}>voters.eci.gov.in</a>
          {' '}·{' '}
          <a href="https://www.nvsp.in" target="_blank" rel="noopener noreferrer" style={{ color:'#138808', textDecoration:'none' }}>nvsp.in</a>
          {' '}· 📞 1950 · Supports 8 Indian languages
        </div>
      </footer>

      {/* TOAST */}
      {toast && (
        <div className={`toast ${toastVisible ? 'show' : ''}`}>
          <div className="toast-title">
            <IconAward size={14} color="var(--gold)" strokeWidth={2} style={{ display:'inline', verticalAlign:'middle', marginRight:6 }} />
            {toast.title}
          </div>
          <div className="toast-msg">{toast.msg}</div>
        </div>
      )}
    </div>
  );
}
