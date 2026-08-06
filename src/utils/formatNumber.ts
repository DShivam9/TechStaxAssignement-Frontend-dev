export function formatPopulation(population: string): string {
  if (!population || population === 'unknown') return 'Unknown';
  const num = parseInt(population, 10);
  if (isNaN(num)) return population;
  return num.toLocaleString('en-US');
}
