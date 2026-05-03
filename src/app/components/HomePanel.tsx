'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useLang } from '../lib/LangContext';
import { IconVote, IconShield, IconCalendar, IconUsers, IconArrowRight, IconLightning, IconTrendingUp, IconStar, IconTarget } from './Icons';

interface HomePanelProps {
  onNavigate: (tab: string, msg?: string) => void;
  xp: number;
  quizScore: number;
}

interface ElectionPhaseData {
  phase: string;
  emoji: string;
  description: string;
  nextStep: string;
  upcomingElections: string[];
  source: 'live' | 'fallback';
}

export default function HomePanel({ onNavigate, xp, quizScore }: HomePanelProps) {
  const { t } = useLang();
  const [electionPhase, setElectionPhase] = useState<ElectionPhaseData | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    fetch('/api/election-phase', { signal: controller.signal })
      .then(res => res.json())
      .then(data => setElectionPhase(data))
      .catch(err => {
        if (err?.name !== 'AbortError') {
          console.error('Failed to fetch election phase:', err);
        }
      });
    return () => controller.abort();
  }, []);

  const topics = [
    { Icon: IconVote,       label: 'Voter Registration (EPIC)',  sub: 'How to register & get your Voter ID',  msg: 'How do I register to vote in India? What is EPIC and how do I apply for a Voter ID card?' },
    { Icon: IconCalendar,   label: 'Polling Day in India',       sub: 'What happens at the polling booth',     msg: 'What happens on Polling Day in India? Walk me through the process at the booth with EVM and VVPAT.' },
    { Icon: IconTrendingUp, label: 'EVM & VVPAT',                sub: 'How electronic voting machines work',   msg: 'How does an EVM work in India? What is VVPAT and how does it verify my vote?' },
    { Icon: IconUsers,      label: 'Lok Sabha & Rajya Sabha',    sub: 'India\'s two houses of Parliament',     msg: 'What is the difference between Lok Sabha and Rajya Sabha? How are members elected to each house?' },
    { Icon: IconShield,     label: 'Model Code of Conduct',      sub: 'ECI rules during elections',           msg: 'What is the Model Code of Conduct (MCC) in Indian elections? When does it apply and what are the key rules?' },
    { Icon: IconStar,       label: 'NOTA — None of the Above',   sub: 'Your right to reject all candidates',  msg: 'What is NOTA in Indian elections? How does it work and what happens if NOTA gets the most votes?' },
  ];

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px' }}>

      {/* HERO */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center', marginBottom: 56 }}>
        <div className="fade-up">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <span className="badge badge-saffron">🏆 Google PromptWars</span>
            <span className="badge badge-green-india">🇮🇳 Indian Election Education</span>
          </div>

          {electionPhase && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 18px',
              background: 'rgba(99,179,237,0.07)',
              border: '1px solid rgba(99,179,237,0.2)',
              borderRadius: 10,
              marginBottom: 24,
              flexWrap: 'wrap',
            }}>
              <span style={{ fontSize: '1.3rem' }}>{electionPhase.emoji}</span>
              <div>
                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--cyan)' }}>
                  Current Phase: {electionPhase.phase}
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginLeft: 8 }}>
                  {electionPhase.description}
                </span>
              </div>
              {electionPhase.upcomingElections?.length > 0 && (
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginLeft: 'auto' }}>
                  📅 {electionPhase.upcomingElections[0]}
                </div>
              )}
            </div>
          )}

          <h1 style={{ fontFamily:"'Outfit',sans-serif", fontSize:'clamp(2.5rem,5vw,4.5rem)', fontWeight:900, lineHeight:1.05, letterSpacing:'-2px', marginBottom:20 }}>
            <span style={{ display:'block', color:'#FF9933' }}>{t('tagline1')}</span>
            <span style={{ display:'block', color:'#e8e8f0' }}>{t('tagline2')}</span>
            <span style={{ display:'block', background:'linear-gradient(135deg,#138808,#00d4ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{t('tagline3')}</span>
          </h1>
          <p style={{ fontSize:'1.05rem', color:'var(--text-muted)', maxWidth:500, lineHeight:1.75, marginBottom:32 }}>
            Master India's election process through an <strong style={{ color:'var(--text)' }}>interactive, AI-powered</strong> experience. From EPIC registration to government formation — understand every step of the world's largest democracy.
          </p>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <button className="btn-saffron" aria-label="Start learning with chat assistant" onClick={() => onNavigate('chat')} style={{ gap:8 }}>
              <IconArrowRight size={16} strokeWidth={2.5} /> {t('start_learning')}
            </button>
            <button className="btn-secondary" aria-label="Open election journey map" onClick={() => onNavigate('journey')}>
              🗺️ {t('see_journey')}
            </button>
            <button className="btn-secondary" aria-label="Open quiz arena" onClick={() => onNavigate('quiz')}>
              🎯 {t('take_quiz')}
            </button>
          </div>
        </div>

        {/* Floating EVM/Ballot card — Indian themed */}
        <div className="anim-float hide-mobile" style={{ position:'relative' }}>
          <div style={{ width:240, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,153,51,0.25)', borderRadius:16, padding:'20px 18px', backdropFilter:'blur(20px)', boxShadow:'0 0 60px rgba(255,153,51,0.12), 0 20px 60px rgba(0,0,0,0.5)', transform:'rotate(-3deg)', overflow:'hidden' }}>
            {/* Tricolor top bar */}
            <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:'linear-gradient(90deg, #FF9933 33%, #fff 33% 66%, #138808 66%)' }} />
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.58rem', color:'var(--text-dim)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:10, borderBottom:'1px solid var(--border)', paddingBottom:7, marginTop:8 }}>
              🇮🇳 Official Ballot · Lok Sabha Election
            </div>
            <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:900, fontSize:'1rem', textAlign:'center', marginBottom:16, background:'linear-gradient(135deg,#FF9933,#138808)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              KNOW YOUR VOTE
            </div>
            {[
              { text: 'Register on Electoral Roll', done: true },
              { text: 'Get your EPIC (Voter ID)', done: true },
              { text: 'Find your polling booth', done: true },
              { text: 'Press EVM — Cast your vote!', done: false },
            ].map((item, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:9, padding:'6px 0', borderBottom:'1px solid var(--border)', fontSize:'0.78rem', color: item.done ? 'var(--text)' : 'var(--text-muted)' }}>
                <div style={{ width:15, height:15, border:`2px solid ${item.done ? '#138808' : 'var(--border-hover)'}`, borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, background: item.done ? 'rgba(19,136,8,0.15)' : 'transparent' }}>
                  {item.done && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#138808" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                </div>
                {item.text}
              </div>
            ))}
            <div style={{ marginTop:10, textAlign:'center', fontFamily:"'DM Mono',monospace", fontSize:'0.6rem', color:'#FF9933', letterSpacing:'0.08em' }}>
              Voter Helpline: 1950
            </div>
          </div>
          <div style={{ position:'absolute', inset:-40, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,153,51,0.1), transparent 70%)', zIndex:-1 }} />
        </div>
      </div>

      {/* STATS */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:48 }}>
        {[
          { num:'8',    label: t('election_stages'),  icon:<IconVote size={20} color="#FF9933" strokeWidth={1.8}/> },
          { num:'50+',  label: t('quiz_questions'),   icon:<IconTarget size={20} color="var(--cyan)" strokeWidth={1.8}/> },
          { num:'AI',   label: t('ai_powered'),       icon:<IconLightning size={20} color="#138808" strokeWidth={1.8}/> },
          { num:'24/7', label: t('available'),        icon:<IconShield size={20} color="var(--primary)" strokeWidth={1.8}/> },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div style={{ marginBottom:6 }}>{s.icon}</div>
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* TOPIC GRID */}
      <div className="glass" style={{ padding:32, marginBottom:32 }}>
        <h2 style={{ fontFamily:"'Outfit',sans-serif", fontSize:'1.5rem', fontWeight:800, marginBottom:6 }}>
          {t('learn_today')}
        </h2>
        <p style={{ color:'var(--text-muted)', marginBottom:24, fontSize:'0.88rem' }}>
          Click any topic to start a guided AI conversation about India's elections.
        </p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
          {topics.map((topic, i) => (
            <button key={i} onClick={() => onNavigate('chat', topic.msg)}
              aria-label={`Ask about ${topic.label}`}
              style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', gap:6, padding:'18px 18px', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--radius)', color:'var(--text)', cursor:'pointer', textAlign:'left', transition:'all 0.25s', fontFamily:"'Inter',sans-serif" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor=i%3===0 ? '#FF9933' : i%3===1 ? 'var(--primary)' : '#138808'; el.style.transform='translateY(-3px)'; el.style.boxShadow='0 8px 28px rgba(108,99,255,0.15)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='var(--border)'; el.style.transform=''; el.style.boxShadow=''; }}
            >
              <topic.Icon size={22} color={i%3===0 ? '#FF9933' : i%3===1 ? 'var(--primary)' : '#138808'} strokeWidth={1.8} />
              <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'0.92rem' }}>{topic.label}</div>
              <div style={{ fontSize:'0.76rem', color:'var(--text-muted)' }}>{topic.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* PROGRESS BANNER */}
      {xp > 0 && (
        <div className="glass" style={{ padding:'18px 26px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:20 }}>
          <div>
            <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'0.95rem', marginBottom:2 }}>Your Progress</div>
            <div style={{ color:'var(--text-muted)', fontSize:'0.82rem' }}>Quiz score: {quizScore} correct · {xp} Civic XP earned</div>
          </div>
          <button className="btn-saffron" onClick={() => onNavigate('quiz')} style={{ flexShrink:0 }}>
            Continue →
          </button>
        </div>
      )}
    </div>
  );
}
