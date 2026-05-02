'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { LangCode, T, SPEECH_LANG } from '../lib/translations';

interface LangCtx {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: (key: string) => string;
  speak: (text: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  speechLang: string;
}

const LangContext = createContext<LangCtx>({
  lang: 'en', setLang: () => {}, t: k => k,
  speak: () => {}, stopSpeaking: () => {}, isSpeaking: false, speechLang: 'en-IN',
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>('en');
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('vq_lang') as LangCode;
    if (saved && T[saved]) setLangState(saved);
  }, []);

  const setLang = (l: LangCode) => {
    setLangState(l);
    localStorage.setItem('vq_lang', l);
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  };

  const t = (key: string): string => T[lang]?.[key] ?? T['en']?.[key] ?? key;

  const speak = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = SPEECH_LANG[lang];
    utter.rate = 0.9;
    utter.pitch = 1;
    utter.onstart = () => setIsSpeaking(true);
    utter.onend = () => setIsSpeaking(false);
    utter.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utter);
  };

  const stopSpeaking = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t, speak, stopSpeaking, isSpeaking, speechLang: SPEECH_LANG[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
