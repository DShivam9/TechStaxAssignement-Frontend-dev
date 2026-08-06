const SPECIES_COLOR_MAP: Record<string, string> = {
  Human: 'var(--species-human)',
  Droid: 'var(--species-droid)',
  Wookiee: 'var(--species-wookiee)',
};

export function getSpeciesColor(speciesName: string | null): string {
  if (!speciesName) return 'var(--species-human)';
  return SPECIES_COLOR_MAP[speciesName] ?? 'var(--species-unknown)';
}
