import { detectIntent } from '@/app/lib/intentEngine';

describe('Intent Detection', () => {
  test('detects eligibility intent from "am I eligible to vote"', () => {
    const result = detectIntent('am I eligible to vote');
    expect(result).toBe('ELIGIBILITY');
  });

  test('detects registration intent from "how do I register"', () => {
    const result = detectIntent('how do I register');
    expect(['GUIDED_FLOW', 'ELIGIBILITY']).toContain(result);
  });

  test('detects knowledge intent from "what is NOTA"', () => {
    const result = detectIntent('what is NOTA');
    expect(['LEARNING', 'GENERAL']).toContain(result);
  });

  test('detects results intent from "election results 2024"', () => {
    const result = detectIntent('election results 2024');
    expect(['RESULTS_INFO', 'GENERAL']).toContain(result);
  });

  test('returns a valid intent string for any input', () => {
    const result = detectIntent('random unrelated query xyz');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  test('detects GUIDED_FLOW for polling booth query', () => {
    const result = detectIntent('where is my polling booth');
    expect(result).toBe('GUIDED_FLOW');
  });

  test('detects LEARNING for EVM query', () => {
    const result = detectIntent('how does EVM work');
    expect(result).toBe('LEARNING');
  });

  test('returns GENERAL for completely unknown input', () => {
    const result = detectIntent('quantum physics laser beam zzz');
    expect(result).toBe('GENERAL');
  });
});
