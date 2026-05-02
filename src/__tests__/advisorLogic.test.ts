describe('Voter Eligibility Advisor Logic', () => {
  function checkEligibility(age: number, isCitizen: boolean, isRegistered: boolean) {
    if (!isCitizen) return { eligible: false, reason: 'Must be Indian citizen' };
    if (age < 18) return { eligible: false, reason: 'Must be at least 18 years old' };
    return {
      eligible: true,
      registered: isRegistered,
      nextStep: isRegistered ? 'Find your polling booth' : 'Register via Form 6',
    };
  }

  test('18-year-old Indian citizen is eligible', () => {
    const result = checkEligibility(18, true, false);
    expect(result.eligible).toBe(true);
  });

  test('17-year-old is not eligible', () => {
    const result = checkEligibility(17, true, false);
    expect(result.eligible).toBe(false);
    expect(result.reason).toMatch(/18/);
  });

  test('non-citizen is not eligible regardless of age', () => {
    const result = checkEligibility(25, false, false);
    expect(result.eligible).toBe(false);
    expect(result.reason).toMatch(/citizen/i);
  });

  test('registered eligible voter gets polling booth guidance', () => {
    const result = checkEligibility(30, true, true);
    expect(result.eligible).toBe(true);
    if ('nextStep' in result) {
      expect(result.nextStep).toMatch(/polling/i);
    }
  });

  test('unregistered eligible voter gets Form 6 guidance', () => {
    const result = checkEligibility(25, true, false);
    expect(result.eligible).toBe(true);
    if ('nextStep' in result) {
      expect(result.nextStep).toMatch(/Form 6/i);
    }
  });

  test('0-year-old is not eligible', () => {
    const result = checkEligibility(0, true, false);
    expect(result.eligible).toBe(false);
  });

  test('100-year-old Indian citizen is eligible', () => {
    const result = checkEligibility(100, true, true);
    expect(result.eligible).toBe(true);
  });

  test('non-citizen child is not eligible', () => {
    const result = checkEligibility(10, false, false);
    expect(result.eligible).toBe(false);
    // Citizen check fails first
    expect(result.reason).toMatch(/citizen/i);
  });
});
