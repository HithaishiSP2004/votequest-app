'use client';
import React, { useState, useCallback, useRef, useEffect } from 'react';

interface QuizQuestion {
  question: string;
  options: string[];
  correct: string;
  explanation: string;
}

interface QuizPanelProps {
  onXP: (n: number, reason: string) => void;
}

export default function QuizPanel({ onXP }: QuizPanelProps) {
  const [phase, setPhase] = useState<'start' | 'loading' | 'question' | 'error'>('start');
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [streak, setStreak] = useState(0);
  const [errorMsg, setErrorMsg] = useState('Error loading question. Check your API connection.');
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  /** Fetches a new random quiz question from the AI-generated question bank */
  const loadQuiz = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setPhase('loading');
    setSelected(null);
    setErrorMsg('Error loading question. Check your API connection.');
    try {
      const res = await fetch('/api/quiz/random', { signal: controller.signal });
      if (!res.ok) throw new Error(`Quiz request failed (${res.status})`);
      const data = await res.json();
      const isValidData =
        typeof data?.question === 'string' &&
        Array.isArray(data?.options) &&
        data.options.length === 4 &&
        typeof data?.correct === 'string' &&
        typeof data?.explanation === 'string';
      if (isValidData) {
        setQuestion(data);
        setTotal(t => t + 1);
        setPhase('question');
      } else {
        setErrorMsg('Received malformed quiz data. Please try again.');
        setPhase('error');
      }
    } catch (err: unknown) {
      if ((err as Error).name === 'AbortError') return;
      setErrorMsg('Unable to load quiz question right now. Please try again.');
      setPhase('error');
    }
  }, []);

  /** Handles answer selection and awards XP based on correctness and streak */
  const selectAnswer = useCallback((letter: string) => {
    if (selected || !question) return;
    setSelected(letter);
    const correct = letter === question.correct;
    if (correct) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
      const bonus = streak >= 2 ? 40 : 25;
      onXP(bonus, streak >= 2 ? `🔥 ${streak + 1} Streak! Bonus XP!` : 'Correct answer!');
    } else {
      setStreak(0);
      onXP(5, 'Keep learning!');
    }
  }, [selected, question, streak, onXP]);

  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div style={{ maxWidth: 740, margin: '0 auto', padding: '32px 24px 60px' }}>
      {/* Header / Score */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-1px', marginBottom: 8 }}>
          🎯 Quiz Arena
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>
          Test your Indian election knowledge. Each correct answer earns Civic XP!
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <div className="glass-sm" style={{ padding: '10px 22px', display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ color: 'var(--text-muted)', fontFamily: "'DM Mono',monospace", fontSize: '0.75rem' }}>SCORE</span>
            <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: '1.4rem', background: 'linear-gradient(135deg,var(--primary),var(--cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {score}/{total}
            </span>
          </div>
          {total > 0 && (
            <div className="glass-sm" style={{ padding: '10px 22px', display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ color: 'var(--text-muted)', fontFamily: "'DM Mono',monospace", fontSize: '0.75rem' }}>ACCURACY</span>
              <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: '1.4rem', color: accuracy >= 70 ? 'var(--green)' : accuracy >= 40 ? 'var(--gold)' : 'var(--red)' }}>
                {accuracy}%
              </span>
            </div>
          )}
          {streak >= 2 && (
            <div className="glass-sm" style={{ padding: '10px 22px', display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: '1.2rem' }}>🔥</span>
              <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: '1.4rem', color: 'var(--red)' }}>{streak} Streak</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      {phase === 'start' && (
        <div className="glass" style={{ textAlign: 'center', padding: '56px 40px' }} role="status" aria-live="polite">
          <div style={{ fontSize: '4rem', marginBottom: 20 }}>🎯</div>
          <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: '1.8rem', fontWeight: 800, marginBottom: 14 }}>
            Ready to test your knowledge?
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: 32, lineHeight: 1.7 }}>
            Questions are AI-generated and cover Indian voter registration, EVM & VVPAT, Lok Sabha & Rajya Sabha, Model Code of Conduct, NOTA, constitutional provisions, and more.
            Each correct answer earns <strong style={{ color: 'var(--gold)' }}>25 Civic XP</strong>!
          </p>
          <button className="btn-primary" onClick={loadQuiz} style={{ fontSize: '1rem', padding: '14px 40px' }}>
            Start Quiz →
          </button>
        </div>
      )}

      {phase === 'loading' && (
        <div className="glass" style={{ textAlign: 'center', padding: '56px 40px' }}>
          <div className="spinner" style={{ margin: '0 auto 20px' }} />
          <p style={{ fontFamily: "'DM Mono',monospace", color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Generating question with AI...
          </p>
        </div>
      )}

      {phase === 'error' && (
        <div className="glass" style={{ textAlign: 'center', padding: '40px' }} role="alert">
          <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>⚠️</div>
          <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>{errorMsg}</p>
          <button className="btn-primary" onClick={loadQuiz}>Try Again</button>
        </div>
      )}

      {phase === 'question' && question && (
        <div>
          {/* Question Card */}
          <div className="glass" style={{ padding: '32px 36px', marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
            {/* Background number */}
            <div style={{
              position: 'absolute', top: -20, right: 20,
              fontFamily: "'Outfit',sans-serif", fontSize: '8rem', fontWeight: 900,
              color: 'rgba(108,99,255,0.06)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
            }}>
              {total}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span className="badge badge-primary">Question {total}</span>
              {streak >= 2 && <span className="badge" style={{ background: 'rgba(255,71,87,0.12)', border: '1px solid rgba(255,71,87,0.3)', color: 'var(--red)' }}>🔥 {streak} Streak</span>}
            </div>

            <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: '1.25rem', fontWeight: 700, marginBottom: 28, lineHeight: 1.4, position: 'relative', zIndex: 1 }}>
              {question.question}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'relative', zIndex: 1 }}>
              {question.options.map((opt, i) => {
                const letter = opt.charAt(0);
                const text = opt.substring(3);
                let extraClass = '';
                if (selected) {
                  if (letter === question.correct) extraClass = 'correct';
                  else if (letter === selected) extraClass = 'wrong';
                }
                return (
                  <button key={i} className={`option-btn ${extraClass}`}
                    onClick={() => selectAnswer(letter)}
                    disabled={!!selected}
                    aria-label={`Option ${letter}: ${text}`}>
                    <span className="option-letter">{letter}</span>
                    <span style={{ flex: 1 }}>{text}</span>
                    {selected && letter === question.correct && (
                      <span style={{ fontSize: '1.1rem', marginLeft: 'auto' }}>✅</span>
                    )}
                    {selected && letter === selected && letter !== question.correct && (
                      <span style={{ fontSize: '1.1rem', marginLeft: 'auto' }}>❌</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation */}
          {selected && (
            <div className="glass-sm" style={{
              padding: '18px 22px', marginBottom: 16,
              borderLeft: `3px solid ${selected === question.correct ? 'var(--green)' : 'var(--red)'}`,
              borderRadius: 'var(--radius)', animation: 'fadeUp 0.3s ease',
            }}>
              <div style={{ fontWeight: 700, marginBottom: 6, color: selected === question.correct ? 'var(--green)' : 'var(--red)' }}>
                {selected === question.correct ? '🎉 Correct!' : '💡 Explanation:'}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                📘 {question.explanation}
              </div>
            </div>
          )}

          {/* Actions */}
          {selected && (
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button className="btn-primary" onClick={loadQuiz}>
                Next Question →
              </button>
              <button className="btn-secondary" onClick={() => { setPhase('start'); setSelected(null); }}>
                End Quiz
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
