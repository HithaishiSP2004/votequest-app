'use client';
import React, { useState, useEffect } from 'react';

interface JourneyPanelProps {
  onXP: (n: number, reason: string) => void;
}

const steps = [
  {
    id: 1, emoji: '📢', title: 'Election Announcement', timeline: '6–8 weeks before Polling Day',
    desc: 'ECI announces election schedule and Model Code of Conduct kicks in.',
    content: `The Indian election process begins when the Election Commission of India (ECI) formally announces the election schedule.\n\n**What happens:**\n1. ECI issues a press note announcing election dates for all phases\n2. Model Code of Conduct (MCC) comes into effect immediately\n3. The announcement is made 4–8 weeks before the actual polling date\n4. ECI appoints Election Observers to monitor the process\n5. Preparation of updated Electoral Rolls begins\n\n💡 *India often conducts elections in multiple phases to manage logistics across its vast geography. The 2024 General Election had 7 phases spread over 44 days.*`,
  },
  {
    id: 2, emoji: '📝', title: 'Nomination Filing', timeline: '4–5 weeks before Polling Day',
    desc: 'Candidates file nomination papers with the Returning Officer.',
    content: `Candidates who wish to contest elections must file their nomination papers within the window specified by the ECI.\n\n**How nomination works:**\n1. Candidate files Form 2B (nomination paper) with the Returning Officer (RO)\n2. Must pay security deposit: ₹25,000 for Lok Sabha (₹12,500 for SC/ST candidates)\n3. Attach affidavit disclosing criminal background, assets & liabilities\n4. Nomination is scrutinized by the RO for validity\n5. Candidate can withdraw nomination before the withdrawal deadline\n\n⚠️ **Important:** Candidates with criminal cases must declare them publicly. ECI mandates newspapers and TV ads announcing this information.`,
  },
  {
    id: 3, emoji: '🗓️', title: 'Voter Registration', timeline: 'Ongoing — rolls updated annually',
    desc: 'Citizens register their names on the Electoral Roll to vote.',
    content: `To vote in India, your name must be on the Electoral Roll of your constituency. Registration is ongoing and managed by ECI.\n\n**How to register:**\n1. Apply online at voters.eci.gov.in (Form 6 for new registration)\n2. Submit Form 6 at your local Booth Level Officer (BLO)\n3. Provide proof of age, address, and identity\n4. Check your name at nvsp.in or call 1950 (Voter Helpline)\n5. Collect your EPIC (Voter ID Card) — though Aadhar, Passport etc. are also accepted\n\n💡 *India has over 96 crore (960 million) registered voters as of 2024 — the largest electorate in the world!*`,
  },
  {
    id: 4, emoji: '📣', title: 'Campaign Period', timeline: '~3–4 weeks before Polling Day',
    desc: 'Candidates and parties campaign under ECI Model Code of Conduct.',
    content: `The campaign period is when parties and candidates try to win voters through rallies, advertisements, and outreach.\n\n**How campaigns work in India:**\n1. **Rallies & Road Shows** — Public gatherings requiring prior police permission\n2. **Advertising** — TV, print, social media regulated by ECI's Media Certification & Monitoring Committee\n3. **Election Expenditure Limits** — Candidates must not exceed ₹95 lakh (Lok Sabha) or ₹40 lakh (Assembly)\n4. **Star Campaigners** — Parties can designate 40 star campaigners whose expenses are shared\n5. **Campaign Silence Period** — No campaigning 48 hours before polling closes\n\n💡 *ECI's cVIGIL app (cvigil.eci.gov.in) allows citizens to report MCC violations with photo/video. ECI resolves complaints within 100 minutes!*`,
  },
  {
    id: 5, emoji: '🗳️', title: 'Polling Day', timeline: 'The designated election date(s)',
    desc: 'Registered voters cast their vote at designated polling booths using EVMs.',
    content: `Polling Day is when eligible registered voters cast their ballots at their assigned polling booths.\n\n**What to expect at the polling booth:**\n1. Check your name on the Electoral Roll and identify your booth (at voters.eci.gov.in)\n2. Carry your EPIC (Voter ID) or one of 12 alternative photo IDs approved by ECI\n3. Join the queue — booths open 7 AM and close by 6 PM (timing may vary)\n4. Poll officer verifies your identity and puts indelible ink on your left index finger\n5. Press the button next to your chosen candidate on the EVM\n6. VVPAT displays a paper slip with candidate name & symbol for 7 seconds to verify\n7. Collect your receipt — and wear your ink with pride! 🇮🇳\n\n✅ **Your rights:** No one can force or bribe you. Vote freely and secretly!`,
  },
  {
    id: 6, emoji: '🔢', title: 'Vote Counting', timeline: 'Counting Day (usually 4–6 weeks after last phase)',
    desc: 'EVM votes are counted at designated counting centers under strict supervision.',
    content: `Vote counting in India is done electronically using data from EVMs, under strict multi-layered supervision.\n\n**The counting process:**\n1. Counting begins at 8 AM on the declared counting day\n2. VVPAT slips are verified against EVM counts for randomly selected booths\n3. Postal ballots (for elderly, disabled, overseas, security forces) are counted first\n4. Returning Officers count EVM rounds for each candidate\n5. Results are declared on the ECI website in real-time\n6. Candidate with highest votes wins (First-Past-The-Post system)\n\n💡 *India's EVM-based counting is extremely fast. Most Lok Sabha results are declared within hours!*`,
  },
  {
    id: 7, emoji: '✅', title: 'Result Declaration', timeline: 'Same day as counting',
    desc: 'Winning candidates are declared and results certified by Returning Officers.',
    content: `Once votes are counted, results are officially declared and certified by the Returning Officer (RO).\n\n**Certification steps:**\n1. Returning Officer announces result for each constituency\n2. Winner receives a Certificate of Election\n3. State/UT-level results compiled by Chief Electoral Officer (CEO)\n4. ECI updates results on its website (results.eci.gov.in)\n5. Any candidate can challenge results in the High Court within 45 days\n6. Winning candidates can take oath only after ECI officially notifies results to Parliament\n\n⚠️ *Disputed elections are handled by Election Petition in High Court. The Supreme Court is the final appellate authority.*`,
  },
  {
    id: 8, emoji: '🏛️', title: 'Government Formation', timeline: '2–4 weeks after results',
    desc: 'Winning party/coalition forms government and PM/CM takes oath.',
    content: `After election results, the party or coalition with a majority forms the government.\n\n**What happens:**\n1. President invites the leader of the majority party/coalition to form government\n2. President-elect (or Governor at state level) swears in the Prime Minister (or Chief Minister)\n3. Cabinet ministers are allocated portfolios\n4. New Parliament (Lok Sabha) or State Assembly convenes\n5. Speaker of Lok Sabha is elected by members\n6. President delivers an address to joint sitting of Parliament outlining government agenda\n\n🕊️ *India's peaceful transfer of power is one of the world's greatest democratic achievements — practiced since the first general election in 1951–52!*`,
  },
];

function formatContent(t: string) {
  return t
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#e8e8f0">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em style="color:var(--text-muted)">$1</em>')
    .replace(/^(\d+)\. (.+)$/gm, '<div style="display:flex;gap:10px;padding:4px 0"><span style="color:var(--primary);font-weight:700;min-width:18px">$1.</span><span>$2</span></div>')
    .replace(/⚠️/g, '<span style="color:var(--gold)">⚠️</span>')
    .replace(/✅/g, '<span style="color:var(--green)">✅</span>')
    .replace(/💡/g, '<span>💡</span>')
    .replace(/🕊️/g, '<span>🕊️</span>')
    .replace(/🇮🇳/g, '<span>🇮🇳</span>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}

function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default function JourneyPanel({ onXP }: JourneyPanelProps) {
  const [activeStep, setActiveStep] = useState<number | null>(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set([1]));
  const [journeyQ, setJourneyQ] = useState('');
  const [journeyAnswer, setJourneyAnswer] = useState('');
  const [journeyLoading, setJourneyLoading] = useState(false);

  // Award XP for starting the journey
  useEffect(() => { onXP(5, 'Started the Election Journey!'); }, []);

  const handleStep = (id: number) => {
    setActiveStep(id);
    if (!completedSteps.has(id)) {
      setCompletedSteps(prev => new Set([...prev, id]));
      onXP(5, 'Explored a journey stage!');
    }
  };

  const askJourney = async (q?: string) => {
    const question = q || journeyQ.trim();
    if (!question) return;
    setJourneyLoading(true);
    setJourneyAnswer('');
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question, history: [], mode: 'journey', stageContext: activeStep ? steps[activeStep - 1].title : 'Indian Election Process Education' }),
      });
      const data = await res.json();
      setJourneyAnswer(data.reply || data.text || 'No response received.');
      onXP(8, 'Deep dive learning!');
    } catch {
      setJourneyAnswer('⚠️ Connection error. Please try again.');
    } finally {
      setJourneyLoading(false);
    }
  };

  const currentStep = activeStep ? steps.find(s => s.id === activeStep) : null;
  const progressPct = completedSteps.size / steps.length * 100;

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px 60px' }}>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 12 }}>
          <div>
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: '2rem', fontWeight: 900, letterSpacing: '-1px', marginBottom: 4 }}>
              🗺️ The Indian Election Journey
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Click any stage to explore — from ECI announcement to government formation.
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Progress — {completedSteps.size}/{steps.length} stages
            </div>
            <div className="xp-bar-outer" style={{ width: 180 }}>
              <div className="xp-bar-inner" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        </div>
        {/* Tricolor accent */}
        <div style={{ display: 'flex', gap: 3 }}>
          <div style={{ height: 3, flex: 1, background: '#FF9933', borderRadius: 2 }} />
          <div style={{ height: 3, flex: 1, background: 'rgba(255,255,255,0.3)', borderRadius: 2 }} />
          <div style={{ height: 3, flex: 1, background: '#138808', borderRadius: 2 }} />
        </div>
      </div>

      {/* Step Grid — Row 1 */}
      <div style={{ position: 'relative', marginBottom: 8 }}>
        {/* connector line */}
        <div style={{ position: 'absolute', top: 28, left: '6.25%', right: '6.25%', height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 1, zIndex: 0 }}>
          <div style={{ height: '100%', width: `${(Math.max(0, ...Array.from(completedSteps).filter(s => s <= 4)) / 4) * 100}%`, background: 'linear-gradient(90deg,#FF9933,#138808)', borderRadius: 1, boxShadow: '0 0 8px rgba(255,153,51,0.4)', transition: 'width 0.6s ease' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', position: 'relative', zIndex: 1 }}>
          {steps.slice(0, 4).map(step => {
            const done = completedSteps.has(step.id);
            const active = activeStep === step.id;
            return (
              <button type="button" key={step.id} onClick={() => handleStep(step.id)} aria-label={`Open step ${step.id}: ${step.title}`}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 12px 32px', cursor: 'pointer', transition: 'all 0.2s', background: 'transparent', border: 'none', color: 'inherit' }}>
                <div className={`step-node ${active ? 'active' : done ? 'done' : 'idle'}`} style={{ position: 'relative', marginBottom: 14 }}>
                  {done && !active ? '✓' : step.emoji}
                  <span style={{
                    position: 'absolute', top: -8, right: -8,
                    width: 20, height: 20, borderRadius: '50%',
                    background: 'linear-gradient(135deg,#FF9933,#e6750a)',
                    color: '#fff', fontSize: '0.6rem', fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'DM Mono',monospace",
                  }}>{step.id}</span>
                </div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: '0.85rem', marginBottom: 4, color: active ? '#fff' : done ? 'var(--cyan)' : 'var(--text)' }}>{step.title}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{step.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Grid — Row 2 */}
      <div style={{ position: 'relative', marginBottom: 36 }}>
        <div style={{ position: 'absolute', top: 28, left: '6.25%', right: '6.25%', height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 1, zIndex: 0 }}>
          <div style={{ height: '100%', width: `${(Math.max(0, ...Array.from(completedSteps).filter(s => s > 4).map(s => s - 4)) / 4) * 100}%`, background: 'linear-gradient(90deg,#138808,#00d4ff)', borderRadius: 1, boxShadow: '0 0 8px rgba(19,136,8,0.4)', transition: 'width 0.6s ease' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', position: 'relative', zIndex: 1 }}>
          {steps.slice(4, 8).map(step => {
            const done = completedSteps.has(step.id);
            const active = activeStep === step.id;
            return (
              <button type="button" key={step.id} onClick={() => handleStep(step.id)} aria-label={`Open step ${step.id}: ${step.title}`}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 12px 32px', cursor: 'pointer', transition: 'all 0.2s', background: 'transparent', border: 'none', color: 'inherit' }}>
                <div className={`step-node ${active ? 'active' : done ? 'done' : 'idle'}`} style={{ position: 'relative', marginBottom: 14 }}>
                  {done && !active ? '✓' : step.emoji}
                  <span style={{
                    position: 'absolute', top: -8, right: -8,
                    width: 20, height: 20, borderRadius: '50%',
                    background: 'linear-gradient(135deg,#138808,#0a6604)',
                    color: '#fff', fontSize: '0.6rem', fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'DM Mono',monospace",
                  }}>{step.id}</span>
                </div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: '0.85rem', marginBottom: 4, color: active ? '#fff' : done ? 'var(--cyan)' : 'var(--text)' }}>{step.title}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{step.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail Card */}
      {currentStep && (
        <div className="detail-card" style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, marginBottom: 16 }}>
            <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: '1.5rem', fontWeight: 800 }}>
              {currentStep.emoji} {currentStep.title}
            </h3>
            <span className="badge badge-gold">⏱ {currentStep.timeline}</span>
          </div>
          <div style={{ fontSize: '0.91rem', lineHeight: 1.75, color: 'var(--text-muted)' }}
            dangerouslySetInnerHTML={{ __html: formatContent(currentStep.content) }}
          />
          <div style={{ display: 'flex', gap: 12, marginTop: 22, flexWrap: 'wrap' }}>
            <button className="btn-secondary" style={{ fontSize: '0.83rem', padding: '9px 18px' }}
              onClick={() => { setJourneyQ(`Tell me more about: ${currentStep.title} in Indian elections`); setJourneyAnswer(''); }}>
              🤖 Ask Guide about this step
            </button>
            {currentStep.id < 8 && (
              <button className="btn-primary" style={{ fontSize: '0.83rem', padding: '9px 18px' }}
                onClick={() => handleStep(currentStep.id + 1)}>
                Next: Step {currentStep.id + 1} →
              </button>
            )}
          </div>
        </div>
      )}

      {/* AI Deep Dive */}
      <div className="glass" style={{ padding: 28 }}>
        <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: '1.1rem', marginBottom: 4 }}>
          🤖 Ask the Guide about any stage
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.83rem', marginBottom: 18 }}>
          Get a detailed, AI-powered explanation of any part of the Indian election process.
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          <input className="form-input" style={{ flex: 1 }}
            placeholder="e.g. How does EVM work? What is NOTA? How does MCC apply?"
            value={journeyQ}
            onChange={e => setJourneyQ(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && askJourney()}
          />
          <button className="btn-primary" onClick={() => askJourney()} disabled={journeyLoading || !journeyQ.trim()}
            style={{ flexShrink: 0, opacity: journeyLoading || !journeyQ.trim() ? 0.6 : 1 }}>
            Ask →
          </button>
        </div>
        {journeyLoading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 18, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <div className="spinner" style={{ width: 24, height: 24, borderWidth: 2 }} />
            Consulting guide...
          </div>
        )}
        {journeyAnswer && !journeyLoading && (
          <div style={{ marginTop: 18, padding: '18px 20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '0.9rem', lineHeight: 1.7 }}
            dangerouslySetInnerHTML={{ __html: formatContent(escapeHtml(journeyAnswer)) }}
          />
        )}
      </div>
    </div>
  );
}
