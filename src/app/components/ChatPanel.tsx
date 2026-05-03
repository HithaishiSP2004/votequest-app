'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLang } from '../lib/LangContext';
import { IconBot, IconSend, IconMic, IconMicOff, IconVolume, IconVolumeOff, IconVote, IconCalendar, IconShield, IconUsers, IconMap, IconTarget } from './Icons';
import LanguageSelector from './LanguageSelector';

interface Reasoning {
  query_understood: string;
  answer_source: string;
  confidence: string;
}
interface ElectionPhase {
  phase: string;
  emoji: string;
  description: string;
  nextStep: string;
}
interface SmartAction { label: string; msg: string; }
interface Message {
  role: 'user' | 'model';
  content: string;
  reasoning?: Reasoning;
  electionPhase?: ElectionPhase;
  smartActions?: SmartAction[];
}

const quickTopics = [
  { Icon: IconVote,    label: 'Voter Registration (Form 6)', msg: 'How do I register to vote using Form 6?' },
  { Icon: IconShield,  label: 'EVM and VVPAT',               msg: 'How does the EVM and VVPAT work in Indian elections?' },
  { Icon: IconCalendar,label: 'Model Code of Conduct',       msg: 'What is the Model Code of Conduct in India?' },
  { Icon: IconTarget,  label: 'NOTA',                        msg: 'What is NOTA and how does it work in Indian elections?' },
  { Icon: IconMap,     label: 'Lok Sabha vs Rajya Sabha',    msg: 'What is the difference between Lok Sabha and Rajya Sabha?' },
  { Icon: IconUsers,   label: 'cVIGIL App',                  msg: 'What is the cVIGIL app and how do I use it to report election violations?' },
];

// Pre-compiled regex patterns — defined at module level to avoid re-creation on every message render
const RE_BOLD = /\*\*(.*?)\*\*/g;
const RE_ITALIC = /\*(.*?)\*/g;
const RE_DOUBLE_NL = /\n\n/g;
const RE_SINGLE_NL = /\n/g;

/**
 * Converts simple markdown (bold, italic, newlines) to safe inline HTML.
 * Uses pre-compiled regex patterns for efficiency.
 */
function formatMsg(text: string): string {
  return text
    .replace(RE_BOLD, '<strong>$1</strong>')
    .replace(RE_ITALIC, '<em>$1</em>')
    .replace(RE_DOUBLE_NL, '<br><br>')
    .replace(RE_SINGLE_NL, '<br>');
}

/** Strongly-typed SpeechRecognition interface for cross-browser compatibility */
interface ISpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  onstart: (() => void) | null;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

/** SpeechRecognition result event with typed results list */
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

declare global {
  interface Window {
    SpeechRecognition: new () => ISpeechRecognition;
    webkitSpeechRecognition: new () => ISpeechRecognition;
  }
}

interface ChatPanelProps {
  initialMsg?: string;
  onClearInitial: () => void;
  onXP: (n: number, reason: string) => void;
}

export default function ChatPanel({ initialMsg, onClearInitial, onXP }: ChatPanelProps) {
  const { t, speak, stopSpeaking, isSpeaking, speechLang, lang } = useLang();
  const [messages, setMessages] = useState<Message[]>([{
    role: 'model',
    content: "👋 Welcome to **VoteQuest**! I'm your AI election education guide.\n\nI can help you understand **voter registration**, **election timelines**, **how votes are counted**, and much more.\n\nWhat would you like to learn today? 🗳️",
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'chat' | 'journey'>('chat');
  const [isListening, setIsListening] = useState(false);
  const [autoRead, setAutoRead] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const recogRef = useRef<ISpeechRecognition | null>(null);
  const messagesRef = useRef<Message[]>(messages);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const stripMarkup = useCallback((text: string) => (
    text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/<[^>]+>/g, '')
  ), []);

  // Google Cloud Translation API — translate AI responses to selected Indian language
  const translateText = useCallback(async (text: string, targetLang: string): Promise<string> => {
    if (targetLang === 'en') return text;
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetLanguage: targetLang }),
      });
      const data = await res.json();
      return data.translatedText || text;
    } catch {
      return text; // fallback to English silently
    }
  }, []); // stable — no external deps needed

  const escapeHtml = useCallback((raw: string): string => (
    raw
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
  ), []);

  const formatSafeMsg = useCallback((text: string): string => {
    const escaped = escapeHtml(text);
    return formatMsg(escaped);
  }, [escapeHtml]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  useEffect(() => {
    if (initialMsg) { setInput(initialMsg); setTimeout(() => sendMessage(initialMsg), 120); onClearInitial(); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMsg]);

  const sendMessage = useCallback(async (override?: string) => {
    const text = (override ?? input).trim();
    if (!text || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: messagesRef.current.slice(-10), mode, stageContext: 'General Election Education' }),
      });
      const data = await res.json();
      const rawReply = data.reply || data.text || '⚠️ No response received.';
      // Translate reply via Google Cloud Translation API if language is selected
      const reply = await translateText(rawReply, lang);
      setMessages(prev => [...prev, {
        role: 'model',
        content: reply,
        reasoning: data.reasoning,
        electionPhase: data.electionPhase,
        smartActions: data.smartActions,
      }]);
      if (autoRead) speak(stripMarkup(reply));
      onXP(10, 'Question answered!');
    } catch {
      setMessages(prev => [...prev, { role: 'model', content: '⚠️ Connection error. Please try again.' }]);
    } finally { setLoading(false); }
  }, [input, loading, mode, lang, autoRead, speak, onXP, translateText, stripMarkup]);

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert('Voice input not supported in your browser. Try Chrome.'); return; }
    const rec = new SR(); recogRef.current = rec;
    rec.lang = speechLang; rec.interimResults = false;
    rec.onstart = () => setIsListening(true);
    rec.onresult = (e: SpeechRecognitionEvent) => { const tr = e.results[0][0].transcript; setInput(tr); setTimeout(() => sendMessage(tr), 300); };
    rec.onerror = () => setIsListening(false);
    rec.onend = () => setIsListening(false);
    rec.start();
  };
  const stopVoice = () => { recogRef.current?.stop(); setIsListening(false); };

  const readLast = () => {
    if (isSpeaking) { stopSpeaking(); return; }
    const last = [...messages].reverse().find(m => m.role === 'model');
    if (last) speak(stripMarkup(last.content));
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px 80px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24, alignItems: 'start' }}>

        {/* Sidebar */}
        <div className="glass-sm hide-mobile" style={{ padding: 18, position: 'sticky', top: 80 }}>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.62rem', textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--text-muted)', marginBottom:12, paddingBottom:8, borderBottom:'1px solid var(--border)' }}>
            Quick Topics
          </div>
          {quickTopics.map((topic, i) => (
            <button key={i} className="quick-btn" onClick={() => sendMessage(topic.msg)} style={{ display:'flex', alignItems:'center', gap:8 }}>
              <topic.Icon size={14} color="var(--primary)" strokeWidth={2} />
              <span>{topic.label}</span>
            </button>
          ))}
          <div style={{ marginTop:18, paddingTop:14, borderTop:'1px solid var(--border)' }}>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.62rem', textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--text-muted)', marginBottom:10 }}>
              Mode
            </div>
            {(['chat', 'journey'] as const).map(m => (
              <button key={m} onClick={() => setMode(m)} style={{ display:'block', width:'100%', padding:'8px 12px', borderRadius:8, border:`1px solid ${mode===m?'var(--primary)':'var(--border)'}`, background: mode===m?'rgba(108,99,255,0.15)':'transparent', color: mode===m?'#fff':'var(--text-muted)', cursor:'pointer', fontSize:'0.8rem', fontFamily:"'Inter',sans-serif", transition:'all 0.2s', marginBottom:6, textAlign:'left' }}>
                {m === 'chat' ? '💬 Conversational' : '📋 Step-by-Step'}
              </button>
            ))}
            {/* Auto-read toggle */}
            <div style={{ marginTop:12, paddingTop:12, borderTop:'1px solid var(--border)' }}>
              <button onClick={() => { setAutoRead(a => !a); if (autoRead) stopSpeaking(); }}
                style={{ display:'flex', alignItems:'center', gap:8, width:'100%', padding:'8px 12px', borderRadius:8, border:`1px solid ${autoRead?'var(--cyan)':'var(--border)'}`, background: autoRead?'rgba(0,212,255,0.1)':'transparent', color: autoRead?'var(--cyan)':'var(--text-muted)', cursor:'pointer', fontSize:'0.8rem', fontFamily:"'Inter',sans-serif", transition:'all 0.2s' }}>
                {autoRead ? <IconVolume size={14} strokeWidth={2}/> : <IconVolumeOff size={14} strokeWidth={2}/>}
                <span>{autoRead ? 'Auto-Read ON' : 'Auto-Read OFF'}</span>
              </button>
              <div style={{ marginTop:6, fontSize:'0.68rem', color:'var(--text-dim)', lineHeight:1.4, padding:'0 4px' }}>
                🔊 Enables voice reading for accessibility
              </div>
            </div>
          </div>
        </div>

        {/* Main */}
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {/* Header bar */}
          <div className="glass-sm" style={{ padding:'12px 18px', display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
            <div style={{ width:42, height:42, borderRadius:'50%', background:'linear-gradient(135deg,var(--primary),var(--cyan))', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 0 18px var(--primary-glow)', flexShrink:0 }}>
              <IconBot size={22} color="#fff" strokeWidth={1.8}/>
            </div>
            <div>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'0.95rem' }}>VoteQuest AI Guide</div>
              <div style={{ fontSize:'0.74rem', color:'var(--cyan)' }}>Powered by Google Gemini · {messages.length - 1} messages</div>
            </div>
            <div style={{ marginLeft:'auto', display:'flex', gap:8, alignItems:'center', flexWrap:'wrap' }}>
              {/* Google Cloud Translation API — language selector */}
              <LanguageSelector />
              {/* Read last answer aloud */}
              <button onClick={readLast} title="Read last answer aloud"
                style={{ display:'flex', alignItems:'center', gap:5, padding:'6px 10px', borderRadius:8, border:`1px solid ${isSpeaking?'var(--cyan)':'var(--border)'}`, background: isSpeaking?'rgba(0,212,255,0.1)':'transparent', color: isSpeaking?'var(--cyan)':'var(--text-muted)', cursor:'pointer', fontSize:'0.75rem', fontFamily:"'Inter',sans-serif", transition:'all 0.2s' }}>
                {isSpeaking ? <IconVolumeOff size={13} strokeWidth={2}/> : <IconVolume size={13} strokeWidth={2}/>}
                <span className="hide-mobile">{isSpeaking ? t('stop') : t('listen')}</span>
              </button>
              <span className="badge badge-green" style={{ animation:'none' }}>● Live</span>
            </div>
          </div>

          {/* Messages */}
          <div className="glass" aria-live="polite" aria-label="Chat messages" style={{ minHeight:440, maxHeight:500, overflowY:'auto', padding:'20px 18px', display:'flex', flexDirection:'column', gap:14 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ alignSelf: m.role==='user'?'flex-end':'flex-start', maxWidth:'82%' }}>
                {m.role === 'model' && (
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.6rem', color:'var(--text-muted)', marginBottom:4, textTransform:'uppercase', letterSpacing:'0.06em' }}>
                    VoteQuest Guide
                  </div>
                )}
                <div className={m.role==='user'?'bubble-user':'bubble-bot'} style={{ fontSize:'0.88rem', lineHeight:1.65 }}
                  dangerouslySetInnerHTML={{ __html: formatSafeMsg(m.content) }} />

                {/* ── Reasoning block (collapsible) ── */}
                {m.role === 'model' && m.reasoning && (
                  <details style={{ marginTop:6 }}>
                    <summary style={{
                      fontSize:'0.72rem', color:'var(--text-muted)', cursor:'pointer',
                      fontFamily:"'DM Mono',monospace", listStyle:'none', userSelect:'none',
                      display:'inline-flex', alignItems:'center', gap:4,
                    }}>
                      💡 Why this answer?
                    </summary>
                    <div style={{
                      marginTop:6, padding:'8px 12px',
                      borderLeft:'3px solid var(--cyan)',
                      background:'rgba(0,212,255,0.05)',
                      borderRadius:'0 6px 6px 0',
                      fontSize:'0.72rem', color:'var(--text-muted)',
                      fontFamily:"'DM Mono',monospace", lineHeight:1.6,
                    }}>
                      <div>• {m.reasoning.query_understood}</div>
                      <div>• Source: {m.reasoning.answer_source}</div>
                      <div>• Confidence: {m.reasoning.confidence}</div>
                    </div>
                  </details>
                )}

                {/* ── Election Phase pill ── */}
                {m.role === 'model' && m.electionPhase && (
                  <div style={{
                    marginTop:7, padding:'4px 10px',
                    borderRadius:6,
                    background:'rgba(99,179,237,0.08)',
                    border:'1px solid rgba(99,179,237,0.2)',
                    fontSize:'0.68rem', color:'var(--text-muted)',
                    fontFamily:"'Inter',sans-serif", lineHeight:1.5,
                  }}>
                    {m.electionPhase.emoji} <strong>Current Phase:</strong> {m.electionPhase.phase} — {m.electionPhase.nextStep}
                  </div>
                )}

                {/* ── Smart Action chips ── */}
                {m.role === 'model' && m.smartActions && m.smartActions.length > 0 && (
                  <div style={{ marginTop:8 }}>
                    <div style={{ fontSize:'0.65rem', color:'var(--text-dim)', fontFamily:"'DM Mono',monospace", marginBottom:5 }}>
                      💡 Quick Actions:
                    </div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                      {m.smartActions.map((action, ai) => (
                        <button key={ai} onClick={() => sendMessage(action.msg)} style={{
                          fontSize:'0.72rem', padding:'4px 12px',
                          borderRadius:20,
                          border:'1px solid var(--border)',
                          background:'var(--surface)',
                          color:'var(--text)',
                          cursor:'pointer',
                          fontFamily:"'Inter',sans-serif",
                          transition:'border-color 0.2s, color 0.2s',
                        }}
                          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--primary)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--primary)'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text)'; }}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf:'flex-start' }}>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.6rem', color:'var(--text-muted)', marginBottom:4, textTransform:'uppercase', letterSpacing:'0.06em' }}>VoteQuest Guide</div>
                <div className="bubble-bot"><div className="typing-dots"><span/><span/><span/></div></div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input row */}
          <div className="glass-sm" style={{ padding:'12px 16px', display:'flex', gap:10 }}>
            {/* Voice input */}
            <button onClick={isListening ? stopVoice : startVoice} title={isListening?'Stop listening':'Voice input'}
              style={{ width:42, height:42, borderRadius:'50%', border:`1px solid ${isListening?'var(--red,#ff4757)':'var(--border)'}`, background: isListening?'rgba(255,71,87,0.15)':'var(--surface)', color: isListening?'var(--red,#ff4757)':'var(--text-muted)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.2s', animation: isListening?'pulseRing 1.5s ease-out infinite':'none' }}>
              {isListening ? <IconMicOff size={17} strokeWidth={2}/> : <IconMic size={17} strokeWidth={2}/>}
            </button>
            <input className="form-input" style={{ flex:1, borderRadius:50 }}
              placeholder={t('ask_anything')}
              value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key==='Enter' && sendMessage()}
              disabled={loading} />
            <button className="btn-primary" onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              style={{ borderRadius:50, padding:'10px 20px', opacity: loading||!input.trim()?0.6:1, gap:6 }}>
              <IconSend size={15} strokeWidth={2.5}/>
              <span>{t('send')}</span>
            </button>
          </div>
          <div style={{ textAlign:'center', fontSize:'0.68rem', color:'var(--text-dim)', fontFamily:"'DM Mono',monospace" }}>
            🎤 {t('voice_input')} available · 🔊 {t('listen')} aloud · Works in 8 Indian languages
          </div>
        </div>
      </div>
    </div>
  );
}
