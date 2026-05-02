'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useLang } from '../lib/LangContext';
import { IconBot, IconSend, IconMic, IconMicOff, IconVolume, IconVolumeOff, IconVote, IconCalendar, IconShield, IconUsers, IconMap, IconTarget } from './Icons';

interface Message { role: 'user' | 'model'; content: string; }

const quickTopics = [
  { Icon: IconVote,    label: 'Voter Registration', msg: 'How do I register to vote?' },
  { Icon: IconCalendar,label: 'Early Voting',        msg: 'How does early voting work?' },
  { Icon: IconShield,  label: 'Voter Rights',        msg: 'What are my rights as a voter?' },
  { Icon: IconMap,     label: 'Electoral College',   msg: 'How does the Electoral College work?' },
  { Icon: IconTarget,  label: 'Vote Counting',       msg: 'How are votes counted and certified?' },
  { Icon: IconUsers,   label: 'Types of Elections',  msg: 'What are the different types of elections?' },
];

function formatMsg(t: string) {
  return t.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');
}

declare global { interface Window { SpeechRecognition: any; webkitSpeechRecognition: any; } }

interface ChatPanelProps {
  initialMsg?: string;
  onClearInitial: () => void;
  onXP: (n: number, reason: string) => void;
}

export default function ChatPanel({ initialMsg, onClearInitial, onXP }: ChatPanelProps) {
  const { t, speak, stopSpeaking, isSpeaking, speechLang } = useLang();
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
  const recogRef = useRef<any>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  useEffect(() => {
    if (initialMsg) { setInput(initialMsg); setTimeout(() => sendMessage(initialMsg), 120); onClearInitial(); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMsg]);

  const sendMessage = async (override?: string) => {
    const text = (override ?? input).trim();
    if (!text || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: messages.slice(-10), mode, stageContext: 'General Election Education' }),
      });
      const data = await res.json();
      const reply = data.reply || data.text || '⚠️ No response received.';
      setMessages(prev => [...prev, { role: 'model', content: reply }]);
      if (autoRead) speak(reply.replace(/\*\*/g, '').replace(/\*/g, '').replace(/<[^>]+>/g, ''));
      onXP(10, 'Question answered!');
    } catch {
      setMessages(prev => [...prev, { role: 'model', content: '⚠️ Connection error. Please try again.' }]);
    } finally { setLoading(false); }
  };

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert('Voice input not supported in your browser. Try Chrome.'); return; }
    const rec = new SR(); recogRef.current = rec;
    rec.lang = speechLang; rec.interimResults = false;
    rec.onstart = () => setIsListening(true);
    rec.onresult = (e: any) => { const tr = e.results[0][0].transcript; setInput(tr); setTimeout(() => sendMessage(tr), 300); };
    rec.onerror = () => setIsListening(false);
    rec.onend = () => setIsListening(false);
    rec.start();
  };
  const stopVoice = () => { recogRef.current?.stop(); setIsListening(false); };

  const readLast = () => {
    if (isSpeaking) { stopSpeaking(); return; }
    const last = [...messages].reverse().find(m => m.role === 'model');
    if (last) speak(last.content.replace(/\*\*/g,'').replace(/\*/g,'').replace(/<[^>]+>/g,''));
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
          <div className="glass-sm" style={{ padding:'12px 18px', display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ width:42, height:42, borderRadius:'50%', background:'linear-gradient(135deg,var(--primary),var(--cyan))', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 0 18px var(--primary-glow)', flexShrink:0 }}>
              <IconBot size={22} color="#fff" strokeWidth={1.8}/>
            </div>
            <div>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'0.95rem' }}>VoteQuest AI Guide</div>
              <div style={{ fontSize:'0.74rem', color:'var(--cyan)' }}>Powered by Google Gemini · {messages.length - 1} messages</div>
            </div>
            <div style={{ marginLeft:'auto', display:'flex', gap:8, alignItems:'center' }}>
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
          <div className="glass" style={{ minHeight:440, maxHeight:500, overflowY:'auto', padding:'20px 18px', display:'flex', flexDirection:'column', gap:14 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ alignSelf: m.role==='user'?'flex-end':'flex-start', maxWidth:'82%' }}>
                {m.role === 'model' && (
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.6rem', color:'var(--text-muted)', marginBottom:4, textTransform:'uppercase', letterSpacing:'0.06em' }}>
                    VoteQuest Guide
                  </div>
                )}
                <div className={m.role==='user'?'bubble-user':'bubble-bot'} style={{ fontSize:'0.88rem', lineHeight:1.65 }}
                  dangerouslySetInnerHTML={{ __html: formatMsg(m.content) }} />
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
