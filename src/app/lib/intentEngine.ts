/**
 * intentEngine.ts
 * Fast, deterministic keyword-based intent classifier.
 * Controls the decision engine — routes queries without AI where possible.
 * Blueprint: "User Input → Intent Detection → Decision Engine → Response Type"
 */

export type Intent =
  | 'GUIDED_FLOW'   // Registration, booth, EPIC, Form 6 — serve from KB
  | 'RESULTS_INFO'  // Election results, dates, schedules — serve from KB + Google Search
  | 'ELIGIBILITY'   // Age-based eligibility checks — serve from KB
  | 'LEARNING'      // Civic education, constitution, concepts — serve from KB
  | 'GENERAL';      // Complex / unknown — call Gemini AI

interface IntentRule {
  intent: Intent;
  keywords: string[];
}

const INTENT_RULES: IntentRule[] = [
  {
    intent: 'GUIDED_FLOW',
    keywords: [
      'register', 'registration', 'form 6', 'form6', 'enroll', 'electoral roll',
      'voter list', 'voter id', 'epic', 'voter card', 'polling booth', 'polling station',
      'find booth', 'where to vote', 'nvsp', 'how to vote', 'cast vote', 'voting process',
      'booth level officer', 'blo', 'indelible ink', 'voting day', 'election day',
      'submit form', 'voter helpline', '1950', 'cvigil', 'c-vigil',
    ],
  },
  {
    intent: 'RESULTS_INFO',
    keywords: [
      'result', 'results', 'winner', 'who won', 'counting', 'counting day',
      'declaration', 'declare', 'when election', 'election date', 'schedule',
      '2026 election', '2024 election', '2019 election', 'upcoming election',
      'state election', 'assembly election', 'lok sabha election', 'general election',
      'west bengal election', 'tamil nadu election', 'kerala election', 'assam election',
    ],
  },
  {
    intent: 'ELIGIBILITY',
    keywords: [
      'eligible', 'eligibility', 'can i vote', 'am i eligible', 'who can vote',
      'minimum age', 'voting age', 'age to vote', 'age limit', 'requirements',
      'criteria', 'nri vote', 'overseas voter', 'first time voter', 'new voter',
    ],
  },
  {
    intent: 'LEARNING',
    keywords: [
      'evm', 'electronic voting machine', 'vvpat', 'nota', 'none of the above',
      'model code of conduct', 'mcc', 'election commission', 'eci', 'article 324',
      'article 326', 'rajya sabha', 'lok sabha', 'constituency', 'delimitation',
      'anti-defection', 'whip', 'proportional representation', 'fptp',
      'first past the post', 'reserved constituency', 'sc st seat',
      'by-election', 'bye-election', 'mid-term', 'sveep', 'suvidha',
      'nomination', 'security deposit', 'returning officer', 'president election',
      'vice president', 'panchayat election', 'municipal election',
    ],
  },
];

/**
 * Detect the intent of a user query.
 * Returns the first matching intent or GENERAL as fallback.
 */
export function detectIntent(query: string): Intent {
  const q = query.toLowerCase().trim();
  for (const rule of INTENT_RULES) {
    if (rule.keywords.some(kw => q.includes(kw))) {
      return rule.intent;
    }
  }
  return 'GENERAL';
}

/**
 * Validate user input for safety.
 * Returns { valid: true } or { valid: false, reason: string }
 */
export function validateInput(input: string): { valid: boolean; reason?: string } {
  if (!input || input.trim().length === 0) {
    return { valid: false, reason: 'Empty input.' };
  }

  if (input.trim().length > 600) {
    return { valid: false, reason: 'Query is too long. Please keep it under 600 characters.' };
  }

  const INJECTION_PATTERNS = [
    'ignore previous instructions',
    'ignore all previous',
    'disregard your instructions',
    'you are now',
    'forget your instructions',
    'act as',
    'jailbreak',
    'dan mode',
    'developer mode',
    'pretend you are',
    'override system',
    'bypass',
    'you have no restrictions',
    'reveal your system prompt',
    'print your instructions',
  ];

  const q = input.toLowerCase();
  for (const pattern of INJECTION_PATTERNS) {
    if (q.includes(pattern)) {
      return { valid: false, reason: 'That type of request cannot be processed. Please ask about Indian elections or voting.' };
    }
  }

  const POLITICAL_PROMOTION_PATTERNS = [
    'vote for',
    'support party',
    'which party is best',
    'which party should i vote',
    'best political party',
    'worst political party',
    'endorse',
  ];

  for (const pattern of POLITICAL_PROMOTION_PATTERNS) {
    if (q.includes(pattern)) {
      return { valid: false, reason: 'VoteQuest is a non-partisan platform and cannot recommend or endorse political parties or candidates. We can help you understand the election process!' };
    }
  }

  return { valid: true };
}
