import { describe, expect, it } from 'vitest';
import { formatPopulation } from './formatNumber';

describe('formatPopulation', () => {
  it('formats numeric string with commas', () => {
    expect(formatPopulation('200000')).toBe('200,000');
  });

  it('handles "unknown" population string', () => {
    expect(formatPopulation('unknown')).toBe('Unknown');
  });

  it('handles empty or invalid inputs', () => {
    expect(formatPopulation('')).toBe('Unknown');
  });
});
