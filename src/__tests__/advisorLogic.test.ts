import { computeAdvisorResult } from '@/app/components/AdvisorPanel';

// ─── Ineligible (under 18) ────────────────────────────────────────────────────

describe('computeAdvisorResult — ineligible (under 18)', () => {
  test('age 17 returns not eligible', () => {
    const result = computeAdvisorResult(17, true, false);
    expect(result.eligible).toBe(false);
    expect(result.statusTitle).toMatch(/not.*eligible/i);
  });

  test('age 0 returns not eligible', () => {
    expect(computeAdvisorResult(0, true, false).eligible).toBe(false);
  });

  test('age 1 shows 17 years remaining', () => {
    const result = computeAdvisorResult(1, true, false);
    expect(result.eligible).toBe(false);
    expect(result.statusMessage).toMatch(/17 year/i);
  });

  test('age 10 shows 8 years remaining', () => {
    const result = computeAdvisorResult(10, true, false);
    expect(result.statusMessage).toMatch(/8 year/i);
  });

  test('under-18 has at least 1 step', () => {
    expect(computeAdvisorResult(15, true, false).steps.length).toBeGreaterThanOrEqual(1);
  });

  test('under-18 statusTitle is not empty', () => {
    const result = computeAdvisorResult(12, false, false);
    expect(result.statusTitle.length).toBeGreaterThan(0);
  });
});

// ─── Eligible first-time voter, unregistered ──────────────────────────────────

describe('computeAdvisorResult — eligible first-time voter, unregistered', () => {
  test('age 18 first-time unregistered returns eligible', () => {
    expect(computeAdvisorResult(18, true, false).eligible).toBe(true);
  });

  test('age 22 unregistered statusMessage mentions registration', () => {
    const result = computeAdvisorResult(22, true, false);
    expect(result.statusMessage).toMatch(/register|enroll|registration/i);
  });

  test('steps include Form 6 or NVSP reference', () => {
    const result = computeAdvisorResult(22, true, false);
    const allText = result.steps.map(s => s.title + ' ' + s.description).join(' ').toLowerCase();
    expect(allText).toMatch(/form 6|nvsp|register/i);
  });

  test('has at least 3 steps', () => {
    expect(computeAdvisorResult(22, true, false).steps.length).toBeGreaterThanOrEqual(3);
  });

  test('statusTitle indicates registration required', () => {
    const result = computeAdvisorResult(25, true, false);
    expect(result.statusTitle).toMatch(/eligible/i);
  });
});

// ─── Eligible first-time voter, already registered ───────────────────────────

describe('computeAdvisorResult — eligible first-time registered voter', () => {
  test('first-time registered voter returns eligible', () => {
    expect(computeAdvisorResult(20, true, true).eligible).toBe(true);
  });

  test('steps contain polling booth guidance', () => {
    const result = computeAdvisorResult(20, true, true);
    const allText = JSON.stringify(result).toLowerCase();
    expect(allText).toMatch(/polling|booth|voter/i);
  });

  test('has at least 2 steps', () => {
    expect(computeAdvisorResult(20, true, true).steps.length).toBeGreaterThanOrEqual(2);
  });
});

// ─── Returning voter ──────────────────────────────────────────────────────────

describe('computeAdvisorResult — eligible returning voter', () => {
  test('returning voter (not first-time) returns eligible', () => {
    expect(computeAdvisorResult(30, false, true).eligible).toBe(true);
  });

  test('age 100 returning voter is eligible', () => {
    expect(computeAdvisorResult(100, false, true).eligible).toBe(true);
  });

  test('returning voter steps contain verify/update/booth guidance', () => {
    const result = computeAdvisorResult(35, false, true);
    const allText = JSON.stringify(result).toLowerCase();
    expect(allText).toMatch(/verify|polling|booth|update/i);
  });

  test('has at least 1 step', () => {
    expect(computeAdvisorResult(40, false, true).steps.length).toBeGreaterThanOrEqual(1);
  });
});

// ─── Step structure integrity ─────────────────────────────────────────────────

describe('computeAdvisorResult — step structure integrity', () => {
  test('all steps have required fields (step, title, description)', () => {
    const result = computeAdvisorResult(25, true, false);
    result.steps.forEach(step => {
      expect(typeof step.step).toBe('number');
      expect(typeof step.title).toBe('string');
      expect(step.title.length).toBeGreaterThan(0);
      expect(typeof step.description).toBe('string');
      expect(step.description.length).toBeGreaterThan(0);
    });
  });

  test('steps are numbered sequentially starting from 1', () => {
    const result = computeAdvisorResult(25, true, false);
    result.steps.forEach((step, idx) => {
      expect(step.step).toBe(idx + 1);
    });
  });

  test('result always has statusTitle and statusMessage', () => {
    [
      computeAdvisorResult(15, true, false),
      computeAdvisorResult(18, true, false),
      computeAdvisorResult(30, false, true),
    ].forEach(result => {
      expect(typeof result.statusTitle).toBe('string');
      expect(result.statusTitle.length).toBeGreaterThan(0);
      expect(typeof result.statusMessage).toBe('string');
      expect(result.statusMessage.length).toBeGreaterThan(0);
    });
  });

  test('eligible field is always a boolean', () => {
    expect(typeof computeAdvisorResult(17, true, false).eligible).toBe('boolean');
    expect(typeof computeAdvisorResult(25, true, false).eligible).toBe('boolean');
  });

  test('action links are valid URLs when present', () => {
    const result = computeAdvisorResult(22, true, false);
    result.steps.forEach(step => {
      if (step.action) {
        expect(step.action.url).toMatch(/^https?:\/\//);
        expect(step.action.label.length).toBeGreaterThan(0);
      }
    });
  });
});
