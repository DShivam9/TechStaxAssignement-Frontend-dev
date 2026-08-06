import { describe, expect, it } from 'vitest';
import { extractId } from './extractId';

describe('extractId', () => {
  it('extracts numeric ID from trailing slash URL', () => {
    expect(extractId('https://swapi.dev/api/people/1/')).toBe(1);
  });

  it('extracts numeric ID without trailing slash', () => {
    expect(extractId('https://swapi.dev/api/species/12')).toBe(12);
  });

  it('returns 0 for invalid URL', () => {
    expect(extractId('invalid-url')).toBe(0);
  });
});
