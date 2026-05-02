'use client';
import React, { useState } from 'react';
import { IconCheck, IconArrowRight, IconInfo, IconExternalLink, IconShield } from './Icons';

// ── Deterministic advisor logic ───────────────────────────────────────────────
type AdvisorStep = {
  step: number;
  title: string;
  description: string;
  action?: { label: string; url: string };
};

type AdvisorResult = {
  eligible: boolean;
  statusTitle: string;
  statusMessage: string;
  steps: AdvisorStep[];
};

function computeAdvisorResult(
  age: number,
  isFirstTime: boolean,
  isRegistered: boolean
): AdvisorResult {
  // Not eligible
  if (age < 18) {
    const yearsLeft = 18 - age;
    return {
      eligible: false,
      statusTitle: 'Not Yet Eligible',
      statusMessage: `You need to be 18 years or older to vote. You will be eligible in ${yearsLeft} year${yearsLeft > 1 ? 's' : ''}.`,
      steps: [
        {
          step: 1,
          title: 'Stay Informed',
          description: 'Use VoteQuest to learn about the Indian election process, constitutional rights, and civic responsibilities now, so you are ready when you turn 18.',
        },
        {
          step: 2,
          title: 'Pre-register awareness',
          description: 'You can apply for voter registration if you will turn 18 on or before January 1 of the electoral roll revision year. Check back closer to that date.',
          action: { label: 'Check NVSP Portal', url: 'https://www.nvsp.in' },
        },
      ],
    };
  }

  // Eligible — First-time voter, not registered
  if (isFirstTime && !isRegistered) {
    return {
      eligible: true,
      statusTitle: 'Eligible — Registration Required',
      statusMessage: 'You are eligible to vote! Your next step is to register on the Electoral Roll.',
      steps: [
        {
          step: 1,
          title: 'Verify Your Eligibility',
          description: 'Confirm you are an Indian citizen, 18+ years old, and an ordinary resident of your constituency.',
        },
        {
          step: 2,
          title: 'Fill Form 6 — New Voter Registration',
          description: 'Apply online via the ECI Voter Portal or NVSP. You will need age proof, address proof, and a passport-size photo.',
          action: { label: 'Register on NVSP →', url: 'https://www.nvsp.in' },
        },
        {
          step: 3,
          title: 'Track Your Application',
          description: 'After submission, track your application status on NVSP using your reference number. Processing takes 2–4 weeks.',
          action: { label: 'Track Status', url: 'https://voters.eci.gov.in' },
        },
        {
          step: 4,
          title: 'Receive Your EPIC (Voter ID)',
          description: 'Once approved, your Elector\'s Photo Identity Card (EPIC) will be dispatched to your address. You can also download your e-EPIC from the Voter Helpline App.',
        },
        {
          step: 5,
          title: 'Find Your Polling Booth',
          description: 'After registration, locate your assigned polling booth using the ECI Voter Portal or by calling Voter Helpline 1950.',
          action: { label: 'Find Your Booth', url: 'https://voters.eci.gov.in' },
        },
      ],
    };
  }

  // Eligible — First-time voter, registered
  if (isFirstTime && isRegistered) {
    return {
      eligible: true,
      statusTitle: 'Eligible — Ready to Vote!',
      statusMessage: 'Great — you are registered! Here is what to do before polling day.',
      steps: [
        {
          step: 1,
          title: 'Verify Your Name on the Voter List',
          description: 'Check that your name, photo, and details are correct on the Electoral Roll at the ECI portal.',
          action: { label: 'Check Voter List', url: 'https://voters.eci.gov.in' },
        },
        {
          step: 2,
          title: 'Get Your e-EPIC (Digital Voter ID)',
          description: 'Download your digital Voter ID from the Voter Helpline App — useful as a backup on polling day.',
          action: { label: 'Voter Helpline App', url: 'https://play.google.com/store/apps/details?id=com.eci.ci' },
        },
        {
          step: 3,
          title: 'Find Your Polling Booth',
          description: 'Your polling station is printed on your EPIC. You can also look it up on the ECI portal or by SMS: send EPIC <voter ID> to 1950.',
          action: { label: 'Find Polling Booth', url: 'https://voters.eci.gov.in' },
        },
        {
          step: 4,
          title: 'Prepare for Polling Day',
          description: 'On election day: carry your EPIC or any valid photo ID. Polling booths are usually open 7 AM – 6 PM. No phone in the voting compartment.',
        },
      ],
    };
  }

  // Eligible — Returning voter
  return {
    eligible: true,
    statusTitle: 'Eligible — Verify & Vote',
    statusMessage: 'You are an eligible returning voter. Confirm your details are up to date before polling day.',
    steps: [
      {
        step: 1,
        title: 'Verify Your Voter Registration',
        description: 'Confirm your name and address are still current on the Electoral Roll, especially if you have moved.',
        action: { label: 'Check on ECI Portal', url: 'https://voters.eci.gov.in' },
      },
      {
        step: 2,
        title: 'Update Details if Needed',
        description: 'If your address or details have changed, submit Form 8A (address change) or Form 8 (correction) on NVSP.',
        action: { label: 'Update on NVSP', url: 'https://www.nvsp.in' },
      },
      {
        step: 3,
        title: 'Find Your Polling Booth',
        description: 'Look up your assigned polling station — it may have changed if constituency boundaries were revised.',
        action: { label: 'Find Polling Booth', url: 'https://voters.eci.gov.in' },
      },
      {
        step: 4,
        title: 'Vote on Polling Day',
        description: 'Carry your EPIC or any of the 12 valid alternative photo IDs. Press the EVM button for your chosen candidate. The VVPAT confirms your choice for 7 seconds.',
      },
    ],
  };
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function AdvisorPanel() {
  const [age, setAge] = useState('');
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [result, setResult] = useState<AdvisorResult | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleCheck = () => {
    const parsedAge = parseInt(age, 10);
    if (!age || isNaN(parsedAge) || parsedAge < 1 || parsedAge > 120) return;
    const r = computeAdvisorResult(parsedAge, isFirstTime, isRegistered);
    setResult(r);
    setActiveStep(0);
    setSubmitted(true);
  };

  const handleReset = () => {
    setAge('');
    setIsFirstTime(true);
    setIsRegistered(false);
    setResult(null);
    setSubmitted(false);
    setActiveStep(0);
  };

  const isAgeValid = age !== '' && !isNaN(parseInt(age, 10)) && parseInt(age, 10) >= 1 && parseInt(age, 10) <= 120;

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 24px 60px' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 10 }}>
          <div style={{
            width: 46, height: 46, borderRadius: 12,
            background: 'linear-gradient(135deg, #6c63ff, #00d4ff)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(108,99,255,0.35)',
          }}>
            <IconShield size={22} color="#fff" strokeWidth={2} />
          </div>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: '2rem', fontWeight: 900, letterSpacing: '-1px', margin: 0 }}>
            Smart Election Advisor
          </h2>
        </div>
        <p style={{ color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto' }}>
          Answer two questions to get your personalised voting roadmap with exact next steps.
        </p>
      </div>

      {/* Input Form */}
      {!submitted && (
        <div className="glass" style={{ padding: '36px 40px', marginBottom: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

            {/* Age */}
            <div>
              <label style={{ display: 'block', fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
                Your Age
              </label>
              <input
                id="advisor-age"
                type="number"
                min="1"
                max="120"
                value={age}
                onChange={e => setAge(e.target.value)}
                placeholder="e.g. 19"
                style={{
                  width: '100%', boxSizing: 'border-box',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)', padding: '14px 18px',
                  fontFamily: "'Outfit',sans-serif", fontSize: '1.1rem', fontWeight: 600,
                  color: 'var(--text)', outline: 'none', transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
                onKeyDown={e => e.key === 'Enter' && isAgeValid && handleCheck()}
              />
            </div>

            {/* First-time voter toggle */}
            <div>
              <label style={{ display: 'block', fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
                Are you a first-time voter?
              </label>
              <div style={{ display: 'flex', gap: 10 }}>
                {[{ val: true, label: 'Yes, first time' }, { val: false, label: 'No, I have voted before' }].map(opt => (
                  <button
                    key={String(opt.val)}
                    id={`first-time-${opt.val}`}
                    onClick={() => { setIsFirstTime(opt.val); if (!opt.val) setIsRegistered(true); }}
                    style={{
                      flex: 1, padding: '13px 10px',
                      background: isFirstTime === opt.val ? 'rgba(108,99,255,0.18)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${isFirstTime === opt.val ? 'var(--primary)' : 'var(--border)'}`,
                      borderRadius: 'var(--radius)', color: isFirstTime === opt.val ? 'var(--primary)' : 'var(--text-muted)',
                      fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: '0.9rem',
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Registration status — only for first-time voters */}
            {isFirstTime && (
              <div style={{ animation: 'fadeUp 0.25s ease' }}>
                <label style={{ display: 'block', fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
                  Are you already registered on the Electoral Roll?
                </label>
                <div style={{ display: 'flex', gap: 10 }}>
                  {[{ val: false, label: 'Not yet registered' }, { val: true, label: 'Yes, I am registered' }].map(opt => (
                    <button
                      key={String(opt.val)}
                      id={`registered-${opt.val}`}
                      onClick={() => setIsRegistered(opt.val)}
                      style={{
                        flex: 1, padding: '13px 10px',
                        background: isRegistered === opt.val ? 'rgba(0,212,255,0.12)' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${isRegistered === opt.val ? 'var(--cyan)' : 'var(--border)'}`,
                        borderRadius: 'var(--radius)', color: isRegistered === opt.val ? 'var(--cyan)' : 'var(--text-muted)',
                        fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: '0.9rem',
                        cursor: 'pointer', transition: 'all 0.2s',
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              id="advisor-check-btn"
              className="btn-primary"
              onClick={handleCheck}
              disabled={!isAgeValid}
              style={{ fontSize: '1rem', padding: '15px', opacity: isAgeValid ? 1 : 0.45, cursor: isAgeValid ? 'pointer' : 'not-allowed' }}
            >
              Get My Voter Roadmap →
            </button>
          </div>
        </div>
      )}

      {/* Result */}
      {submitted && result && (
        <div style={{ animation: 'fadeUp 0.3s ease' }}>

          {/* Status Banner */}
          <div className="glass" style={{
            padding: '24px 28px', marginBottom: 20,
            borderLeft: `4px solid ${result.eligible ? 'var(--green,#2ecc71)' : 'var(--red,#ff4757)'}`,
            display: 'flex', alignItems: 'flex-start', gap: 16,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, flexShrink: 0,
              background: result.eligible ? 'rgba(46,204,113,0.15)' : 'rgba(255,71,87,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: '1.3rem' }}>{result.eligible ? '✅' : '⏳'}</span>
            </div>
            <div>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: '1.15rem', marginBottom: 4, color: result.eligible ? 'var(--green,#2ecc71)' : 'var(--red,#ff4757)' }}>
                {result.statusTitle}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                {result.statusMessage}
              </div>
            </div>
          </div>

          {/* Step Progression */}
          <div className="glass" style={{ padding: '28px 32px', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <IconInfo size={15} color="var(--primary)" strokeWidth={2} />
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Your Roadmap — {result.steps.length} Steps
              </span>
            </div>

            {/* Step tabs */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 24, flexWrap: 'wrap' }}>
              {result.steps.map((s, i) => (
                <button
                  key={i}
                  id={`advisor-step-${i}`}
                  onClick={() => setActiveStep(i)}
                  style={{
                    padding: '7px 14px',
                    background: activeStep === i ? 'rgba(108,99,255,0.2)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${activeStep === i ? 'var(--primary)' : 'var(--border)'}`,
                    borderRadius: 20,
                    color: activeStep === i ? 'var(--primary)' : 'var(--text-muted)',
                    fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', fontWeight: 600,
                    cursor: 'pointer', transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}
                >
                  {i < activeStep
                    ? <IconCheck size={11} color="var(--green,#2ecc71)" strokeWidth={2.5} />
                    : <span style={{ width: 16, height: 16, borderRadius: '50%', background: activeStep === i ? 'var(--primary)' : 'var(--border)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: activeStep === i ? '#fff' : 'var(--text-muted)', fontWeight: 700 }}>{i + 1}</span>
                  }
                  Step {i + 1}
                </button>
              ))}
            </div>

            {/* Active step card */}
            {(() => {
              const s = result.steps[activeStep];
              return (
                <div key={activeStep} style={{ animation: 'fadeUp 0.2s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                      background: 'linear-gradient(135deg, var(--primary), var(--cyan))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: "'DM Mono',monospace", fontWeight: 700, fontSize: '0.8rem', color: '#fff',
                    }}>
                      {s.step}
                    </div>
                    <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: '1.1rem' }}>
                      {s.title}
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.93rem', marginBottom: s.action ? 20 : 0 }}>
                    {s.description}
                  </p>
                  {s.action && (
                    <a
                      href={s.action.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 7,
                        padding: '10px 20px',
                        background: 'rgba(108,99,255,0.12)', border: '1px solid rgba(108,99,255,0.3)',
                        borderRadius: 8, color: 'var(--primary)',
                        fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: '0.88rem',
                        textDecoration: 'none', transition: 'background 0.2s',
                      }}
                    >
                      {s.action.label}
                      <IconExternalLink size={13} strokeWidth={2} />
                    </a>
                  )}
                </div>
              );
            })()}

            {/* Next / Prev Navigation */}
            <div style={{ display: 'flex', gap: 10, marginTop: 28, justifyContent: 'flex-end' }}>
              {activeStep > 0 && (
                <button className="btn-secondary" id="advisor-prev" onClick={() => setActiveStep(s => s - 1)} style={{ padding: '10px 22px', fontSize: '0.88rem' }}>
                  ← Previous
                </button>
              )}
              {activeStep < result.steps.length - 1 ? (
                <button className="btn-primary" id="advisor-next" onClick={() => setActiveStep(s => s + 1)} style={{ padding: '10px 22px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                  Next Step <IconArrowRight size={14} strokeWidth={2.5} />
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', background: 'rgba(46,204,113,0.1)', border: '1px solid rgba(46,204,113,0.3)', borderRadius: 8, color: 'var(--green,#2ecc71)', fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: '0.88rem' }}>
                  <IconCheck size={14} strokeWidth={2.5} /> Roadmap Complete
                </div>
              )}
            </div>
          </div>

          {/* Reset */}
          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <button
              id="advisor-reset"
              onClick={handleReset}
              style={{ background: 'none', border: 'none', color: 'var(--text-dim)', fontSize: '0.82rem', cursor: 'pointer', fontFamily: "'DM Mono',monospace", letterSpacing: '0.04em', textDecoration: 'underline' }}
            >
              Start over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
