import type { SWAPIPeopleResponse, SWAPIPlanet, SWAPISpecies } from './types';
import { API_TIMEOUT_MS, BASE_URL, CACHE_TTL_MS, FALLBACK_URL } from '../utils/constants';

const cache = new Map<string, { data: unknown; timestamp: number }>();

function normalizeUrl(url: string): string {
  return url.replace(/^http:/, 'https:');
}

async function fetchWithCache<T>(url: string, signal?: AbortSignal): Promise<T> {
  const cleanUrl = normalizeUrl(url);
  const cached = cache.get(cleanUrl);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data as T;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  if (signal) {
    signal.addEventListener('abort', () => controller.abort());
  }

  try {
    const response = await fetch(cleanUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data: T = await response.json();
    cache.set(cleanUrl, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    if (signal?.aborted || controller.signal.aborted || (error instanceof DOMException && error.name === 'AbortError')) {
      const abortErr = new DOMException('Aborted', 'AbortError');
      throw abortErr;
    }
    throw error;
  }
}

export async function fetchPeople(
  page: number = 1,
  search?: string,
  signal?: AbortSignal
): Promise<SWAPIPeopleResponse> {
  let url = `${BASE_URL}/people/?page=${page}`;
  if (search && search.trim() !== '') {
    url += `&search=${encodeURIComponent(search.trim())}`;
  }

  try {
    return await fetchWithCache<SWAPIPeopleResponse>(url, signal);
  } catch (err) {
    if (signal?.aborted || (err instanceof DOMException && err.name === 'AbortError')) {
      throw err;
    }
    let fallbackPath = `${FALLBACK_URL}/people/?page=${page}`;
    if (search && search.trim() !== '') {
      fallbackPath += `&search=${encodeURIComponent(search.trim())}`;
    }
    return await fetchWithCache<SWAPIPeopleResponse>(fallbackPath, signal);
  }
}

export async function fetchSpecies(url: string, signal?: AbortSignal): Promise<SWAPISpecies> {
  try {
    return await fetchWithCache<SWAPISpecies>(url, signal);
  } catch (err) {
    if (signal?.aborted || (err instanceof DOMException && err.name === 'AbortError')) {
      throw err;
    }
    const fallbackUrl = url.replace('swapi.dev', 'swapi.py4e.com');
    return await fetchWithCache<SWAPISpecies>(fallbackUrl, signal);
  }
}

export async function fetchPlanet(url: string, signal?: AbortSignal): Promise<SWAPIPlanet> {
  try {
    return await fetchWithCache<SWAPIPlanet>(url, signal);
  } catch (err) {
    if (signal?.aborted || (err instanceof DOMException && err.name === 'AbortError')) {
      throw err;
    }
    const fallbackUrl = url.replace('swapi.dev', 'swapi.py4e.com');
    return await fetchWithCache<SWAPIPlanet>(fallbackUrl, signal);
  }
}
