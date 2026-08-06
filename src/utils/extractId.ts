export function extractId(url: string): number {
  const matches = url.match(/\/(\d+)\/?$/);
  return matches ? parseInt(matches[1], 10) : 0;
}
