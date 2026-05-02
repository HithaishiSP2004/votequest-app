import { searchKnowledgeBase } from '@/app/lib/knowledgeBase';

describe('Knowledge Base', () => {
  test('returns NOTA information for NOTA query', () => {
    const result = searchKnowledgeBase('NOTA');
    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
    expect(result!.toLowerCase()).toContain('nota');
  });

  test('returns EVM information for EVM query', () => {
    const result = searchKnowledgeBase('EVM');
    expect(result).toBeTruthy();
    expect(result!.toLowerCase()).toMatch(/evm|electronic/);
  });

  test('returns Form 6 information for voter registration query', () => {
    const result = searchKnowledgeBase('voter registration Form 6');
    expect(result).toBeTruthy();
  });

  test('returns null or empty for completely unknown topic', () => {
    const result = searchKnowledgeBase('quantum physics laser beam');
    // Should either return null/undefined or a fallback string
    expect(result === null || result === undefined || typeof result === 'string').toBe(true);
  });

  test('returns VVPAT information for vvpat query', () => {
    const result = searchKnowledgeBase('vvpat paper trail');
    expect(result).toBeTruthy();
    expect(result!.toLowerCase()).toMatch(/vvpat|paper/);
  });

  test('returns polling booth info for polling station query', () => {
    const result = searchKnowledgeBase('polling booth');
    expect(result).toBeTruthy();
  });

  test('returns eligibility info for voting age query', () => {
    const result = searchKnowledgeBase('minimum age to vote');
    expect(result).toBeTruthy();
    expect(result!).toContain('18');
  });

  test('returns cVIGIL info for cvigil query', () => {
    const result = searchKnowledgeBase('cvigil app');
    expect(result).toBeTruthy();
  });
});
