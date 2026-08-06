import { describe, expect, it } from 'vitest';
import { getSpeciesColor } from './speciesColors';

describe('getSpeciesColor', () => {
  it('returns human color when species is null', () => {
    expect(getSpeciesColor(null)).toBe('var(--species-human)');
  });

  it('returns mapped color for known species', () => {
    expect(getSpeciesColor('Droid')).toBe('var(--species-droid)');
  });

  it('returns unknown color for unmapped species', () => {
    expect(getSpeciesColor('UnknownSpecies')).toBe('var(--species-unknown)');
  });
});
