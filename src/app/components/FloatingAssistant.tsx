'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLang } from '../lib/LangContext';
import { IconBot, IconX, IconSend, IconMic, IconMicOff, IconVolume, IconVolumeOff, IconMinimize, IconSparkle } from './Icons';

interface Message { role: 'user' | 'model'; content: string; }

interface ISpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  onstart: (() => void) | null;
  onresult: ((e: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

declare global {
  interface Window {
    SpeechRecognition: (new () => ISpeechRecognition) | undefined;
    webkitSpeechRecognition: (new () => ISpeechRecognition) | undefined;
  }
}

export default function FloatingAssistant() {
  const { t, speak, stopSpeaking, isSpeaking, speechLang } = useLang();
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: '🇮🇳 Namaste! I am your VoteQuest AI Guide. Ask me anything about Indian elections, voting rights, EVM, NOTA, or how India\'s democracy works — in your preferred language!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [autoRead, setAutoRead] = useState(false);
  const [pulse, setPulse] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);
  const recogRef = useRef<ISpeechRecognition | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<Message[]>(messages);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);
  useEffect(() => { const timer = setTimeout(() => setPulse(false), 8000); return () => clearTimeout(timer); }, []);

  const escapeHtml = useCallback((raw: string) => (
    raw
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
  ), []);

  const formatSafeMsg = useCallback((raw: string) => (
    escapeHtml(raw)
      .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#fff">$1</strong>')
      .replace(/\n/g, '<br>')
  ), [escapeHtml]);

  const sendMessage = useCallback(async (override?: string) => {
    const text = (override ?? input).trim();
    if (!text || loading) return;
    setInput('');
    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: messagesRef.current.slice(-8), mode: 'chat', stageContext: 'Indian Election Education' }),
      });
      const data = await res.json();
      const reply = data.reply || data.text || '⚠️ No response.';
      const cleaned = reply.replace(/\*\*/g, '').replace(/\*/g, '').replace(/<[^>]+>/g, '');
      setMessages(prev => [...prev, { role: 'model', content: reply }]);
      if (autoRead) speak(cleaned);
    } catch {
      setMessages(prev => [...prev, { role: 'model', content: '⚠️ Connection error. Please try again.' }]);
    } finally { setLoading(false); }
  }, [input, loading, autoRead, speak]);

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert('Voice input not supported in your browser.'); return; }
    stopSpeaking();
    const rec = new SR();
    recogRef.current = rec;
    rec.lang = speechLang;
    rec.interimResults = false;
    rec.onstart = () => setIsListening(true);
    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setTimeout(() => sendMessage(transcript), 300);
    };
    rec.onerror = () => setIsListening(false);
    rec.onend = () => setIsListening(false);
    rec.start();
  };

  const stopVoice = () => { recogRef.current?.stop(); setIsListening(false); };

  const readLast = () => {
    const last = [...messages].reverse().find(m => m.role === 'model');
    if (last) {
      const text = last.content.replace(/\*\*/g, '').replace(/\*/g, '').replace(/<[^>]+>/g, '');
      speak(text);
    }
  };

  // Calculate panel dimensions safely (no window access at render-time on SSR)
  const [panelDims, setPanelDims] = useState({ width: 400, height: 560 });
  useEffect(() => {
    const updateDims = () => setPanelDims({
      width: Math.min(420, window.innerWidth - 48),
      height: Math.min(580, window.innerHeight - 140),
    });
    updateDims();
    window.addEventListener('resize', updateDims);
    return () => window.removeEventListener('resize', updateDims);
  }, []);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => { setOpen(o => !o); setMinimized(false); }}
        aria-label="Open AI Assistant"
        style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 9000,
          width: 60, height: 60, borderRadius: '50%', border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg, #FF9933, #138808)',
          boxShadow: open
            ? '0 0 0 4px rgba(255,153,51,0.3), 0 8px 32px rgba(19,136,8,0.5)'
            : '0 0 0 0 transparent, 0 8px 32px rgba(255,153,51,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          transform: open ? 'scale(1.1) rotate(10deg)' : 'scale(1)',
          flexShrink: 0,
        }}
      >
        {open
          ? <IconX size={24} color="#fff" strokeWidth={2.5} />
          : <IconBot size={26} color="#fff" strokeWidth={2} />
        }
        {/* Pulse rings */}
        {!open && pulse && (
          <>
            <span style={{ position:'absolute', inset:-6, borderRadius:'50%', border:'2px solid rgba(255,153,51,0.5)', animation:'pulseRing 2s ease-out infinite' }} />
            <span style={{ position:'absolute', inset:-12, borderRadius:'50%', border:'2px solid rgba(19,136,8,0.25)', animation:'pulseRing 2s ease-out infinite 0.6s' }} />
          </>
        )}
        {/* Unread badge */}
        {!open && messages.length > 1 && (
          <span style={{
            position:'absolute', top:-4, right:-4, width:20, height:20,
            borderRadius:'50%', background:'#FF9933',
            fontSize:'0.65rem', fontWeight:700, color:'#fff',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontFamily:"'DM Mono',monospace", border:'2px solid #060612',
          }}>{Math.min(messages.length - 1, 9)}</span>
        )}
      </button>

      {/* Chat Modal */}
      {open && (
        <div style={{
          position: 'fixed',
          bottom: 100,
          right: 28,
          zIndex: 8999,
          width: panelDims.width,
          height: minimized ? 56 : panelDims.height,
          background: 'rgba(10,10,28,0.97)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,153,51,0.35)',
          borderRadius: 20,
          boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,153,51,0.08)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'fadeUp 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          overflow: 'hidden',
          transition: 'height 0.3s ease',
        }}>
          {/* Tricolor top accent */}
          <div style={{ height: 3, background: 'linear-gradient(90deg, #FF9933 33%, #fff 33% 66%, #138808 66%)', flexShrink: 0 }} />

          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
            borderBottom: minimized ? 'none' : '1px solid rgba(255,153,51,0.15)',
            background: 'linear-gradient(135deg, rgba(255,153,51,0.1), rgba(19,136,8,0.06))',
            flexShrink: 0,
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'linear-gradient(135deg, #FF9933, #138808)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 14px rgba(255,153,51,0.4)', flexShrink: 0,
            }}>
              <IconSparkle size={17} color="#fff" strokeWidth={2} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'0.9rem', color:'#fff', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                VoteQuest AI Guide 🇮🇳
              </div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.6rem', color:'#FF9933', letterSpacing:'0.04em' }}>
                {loading ? 'Thinking...' : '● Online — Powered by Gemini'}
              </div>
            </div>
            <div style={{ display:'flex', gap:5, flexShrink: 0 }}>
              {/* Auto-read toggle */}
              <button onClick={() => { setAutoRead(a => !a); if (!autoRead) stopSpeaking(); }}
                title={autoRead ? 'Disable auto-read' : 'Enable auto-read'}
                style={{ background:'none', border:`1px solid ${autoRead ? '#FF9933' : 'rgba(255,255,255,0.15)'}`, borderRadius:8, padding:'5px 7px', cursor:'pointer', color: autoRead ? '#FF9933' : 'rgba(255,255,255,0.5)', transition:'all 0.2s', flexShrink:0 }}>
                {autoRead ? <IconVolume size={14} /> : <IconVolumeOff size={14} />}
              </button>
              {/* Minimize */}
              <button onClick={() => setMinimized(m => !m)}
                style={{ background:'none', border:'1px solid rgba(255,255,255,0.15)', borderRadius:8, padding:'5px 7px', cursor:'pointer', color:'rgba(255,255,255,0.5)', flexShrink:0 }}>
                <IconMinimize size={14} />
              </button>
              {/* Close */}
              <button onClick={() => setOpen(false)}
                style={{ background:'none', border:'1px solid rgba(255,71,87,0.3)', borderRadius:8, padding:'5px 7px', cursor:'pointer', color:'rgba(255,71,87,0.7)', flexShrink:0 }}>
                <IconX size={14} />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Messages */}
              <div style={{ flex:1, overflowY:'auto', padding:'12px 12px', display:'flex', flexDirection:'column', gap:10, scrollbarWidth:'thin', minHeight:0 }}>
                {messages.map((m, i) => (
                  <div key={i} style={{ display:'flex', flexDirection:'column', alignItems: m.role==='user' ? 'flex-end' : 'flex-start', gap:3 }}>
                    {m.role === 'model' && (
                      <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                        <div style={{ width:18, height:18, borderRadius:'50%', background:'linear-gradient(135deg,#FF9933,#138808)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                          <IconBot size={10} color="#fff" strokeWidth={2} />
                        </div>
                        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.58rem', color:'rgba(255,255,255,0.4)', textTransform:'uppercase', letterSpacing:'0.06em' }}>Guide</span>
                        <button onClick={isSpeaking ? stopSpeaking : readLast} title={isSpeaking ? "Stop speaking" : "Read aloud"} style={{ background:'none', border:'none', cursor:'pointer', color: isSpeaking ? '#FF9933' : 'rgba(255,255,255,0.3)', padding:0, lineHeight:1 }}>
                          {isSpeaking ? <IconVolumeOff size={11} /> : <IconVolume size={11} />}
                        </button>
                      </div>
                    )}
                    <div style={{
                      maxWidth:'88%', padding:'9px 13px', borderRadius: m.role==='user' ? '16px 16px 4px 16px' : '4px 16px 16px 16px',
                      background: m.role==='user'
                        ? 'linear-gradient(135deg, rgba(255,153,51,0.7), rgba(19,136,8,0.5))'
                        : 'rgba(255,255,255,0.05)',
                      border: m.role==='model' ? '1px solid rgba(255,255,255,0.07)' : 'none',
                      fontSize:'0.83rem', lineHeight:1.6, color:'#e8e8f0',
                      fontFamily:"'Inter',sans-serif",
                      wordBreak: 'break-word',
                    }}
                      dangerouslySetInnerHTML={{ __html: formatSafeMsg(m.content) }}
                    />
                  </div>
                ))}
                {loading && (
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ width:18, height:18, borderRadius:'50%', background:'linear-gradient(135deg,#FF9933,#138808)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <IconBot size={10} color="#fff" strokeWidth={2} />
                    </div>
                    <div style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'4px 16px 16px 16px', padding:'10px 16px' }}>
                      <div className="typing-dots"><span/><span/><span/></div>
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>

              {/* Input */}
              <div style={{
                padding:'10px 12px',
                borderTop:'1px solid rgba(255,153,51,0.15)',
                display:'flex', gap:7, alignItems:'center',
                background:'rgba(0,0,0,0.25)', flexShrink:0,
              }}>
                <input
                  ref={inputRef}
                  style={{
                    flex:1, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,153,51,0.25)',
                    borderRadius:50, padding:'9px 14px', color:'#e8e8f0', fontSize:'0.83rem',
                    fontFamily:"'Inter',sans-serif", outline:'none',
                    transition:'border-color 0.2s', minWidth:0,
                  }}
                  placeholder={t('ask_anything')}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  onFocus={e => (e.target.style.borderColor = 'rgba(255,153,51,0.6)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,153,51,0.25)')}
                  disabled={loading}
                />
                {/* Voice input */}
                <button
                  onClick={isListening ? stopVoice : startVoice}
                  title={isListening ? 'Stop listening' : 'Voice input'}
                  style={{
                    width:38, height:38, borderRadius:'50%', border:'none', cursor:'pointer',
                    background: isListening ? 'rgba(255,71,87,0.2)' : 'rgba(255,255,255,0.07)',
                    color: isListening ? 'var(--red,#ff4757)' : 'rgba(255,255,255,0.6)',
                    display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                    animation: isListening ? 'pulseRing 1.5s ease-out infinite' : 'none',
                    transition:'all 0.2s',
                  }}>
                  {isListening ? <IconMicOff size={15} /> : <IconMic size={15} />}
                </button>
                {/* Send */}
                <button
                  onClick={() => sendMessage()}
                  disabled={loading || !input.trim()}
                  style={{
                    width:38, height:38, borderRadius:'50%', border:'none', cursor:'pointer',
                    background: loading || !input.trim() ? 'rgba(255,153,51,0.15)' : 'linear-gradient(135deg,#FF9933,#138808)',
                    color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                    boxShadow: !loading && input.trim() ? '0 4px 16px rgba(255,153,51,0.35)' : 'none',
                    transition:'all 0.2s', opacity: loading || !input.trim() ? 0.5 : 1,
                  }}>
                  <IconSend size={15} />
                </button>
              </div>

              {/* Footer hint */}
              <div style={{ padding:'5px 14px 8px', display:'flex', alignItems:'center', justifyContent:'center', gap:5, flexShrink:0 }}>
                <IconMic size={10} color="rgba(255,255,255,0.25)" />
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.58rem', color:'rgba(255,255,255,0.25)', letterSpacing:'0.04em' }}>
                  Tap mic to speak • 8 languages • {messages.length - 1} messages
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
