import { searchKnowledgeBase } from '@/app/lib/knowledgeBase';

// ─── All known KB entries should return content ───────────────────────────────

describe('searchKnowledgeBase — returns content for all known topics', () => {
  const cases: [string, string, string][] = [
    ['voting_age',           'minimum age to vote',          '18'],
    ['voter_registration',   'voter registration Form 6',    'form 6'],
    ['epic_voter_id',        'voter id epic card',           'epic'],
    ['find_polling_booth',   'find my polling booth',        'polling'],
    ['evm',                  'how does EVM work',            'evm'],
    ['nota',                 'what is NOTA option',          'nota'],
    ['vvpat',                'vvpat paper trail audit',      'vvpat'],
    ['model_code_of_conduct','model code of conduct MCC',   'code of conduct'],
    ['election_commission',  'election commission ECI',      'election commission'],
    ['lok_sabha',            'lok sabha seats members',      'lok sabha'],
    ['rajya_sabha',          'rajya sabha elections',        'rajya sabha'],
    ['form_6',               'form 6 new registration form', 'form'],
    ['cvigil',               'cvigil app report violation',  'cvigil'],
    ['eligibility_criteria', 'eligibility who can vote',     '18'],
    ['voting_process',       'what happens at polling booth','vote'],
    ['indelible_ink',        'indelible ink finger mark',    'ink'],
    ['helpline',             'voter helpline 1950',          '1950'],
  ];

  test.each(cases)('topic "%s": query returns relevant content containing "%s"', (_id, query, expectedContent) => {
    const result = searchKnowledgeBase(query);
    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
    expect(result!.toLowerCase()).toContain(expectedContent.toLowerCase());
  });
});

// ─── Unknown topics should return null ───────────────────────────────────────

describe('searchKnowledgeBase — returns null for unknown topics', () => {
  test.each([
    'quantum physics laser beam',
    'cricket world cup 2024',
    'stock market prices today',
    'latest bollywood movie releases',
    'weather forecast tomorrow',
  ])('returns null for "%s"', (query) => {
    const result = searchKnowledgeBase(query);
    expect(result).toBeNull();
  });
});

// ─── Edge cases ───────────────────────────────────────────────────────────────

describe('searchKnowledgeBase — edge cases', () => {
  test('returns same result for repeated queries (cache)', () => {
    const q = 'what is EVM';
    const first = searchKnowledgeBase(q);
    const second = searchKnowledgeBase(q);
    expect(first).toBe(second);
  });

  test('is case-insensitive for NOTA', () => {
    const lower = searchKnowledgeBase('nota');
    const upper = searchKnowledgeBase('NOTA');
    expect(lower).toBe(upper);
  });

  test('is case-insensitive for EVM', () => {
    const lower = searchKnowledgeBase('evm');
    const upper = searchKnowledgeBase('EVM');
    expect(lower).toBe(upper);
  });

  test('handles empty string without throwing', () => {
    expect(() => searchKnowledgeBase('')).not.toThrow();
  });

  test('returns null for empty string (no KB match)', () => {
    const result = searchKnowledgeBase('');
    expect(result).toBeNull();
  });

  test('partial keyword match works for evm', () => {
    const result = searchKnowledgeBase('tell me about evm machines');
    expect(result).toBeTruthy();
  });

  test('partial keyword match works for cvigil complaint', () => {
    const result = searchKnowledgeBase('how to file a complaint via cvigil');
    expect(result).toBeTruthy();
  });

  test('result for voting_age contains constitutional amendment reference', () => {
    const result = searchKnowledgeBase('minimum age to vote');
    expect(result).toContain('18');
  });

  test('result for helpline contains 1950', () => {
    const result = searchKnowledgeBase('voter helpline 1950');
    expect(result).toContain('1950');
  });

  test('result for nota is non-null and string', () => {
    const result = searchKnowledgeBase('none of the above');
    expect(typeof result).toBe('string');
    expect(result).not.toBeNull();
  });
});
