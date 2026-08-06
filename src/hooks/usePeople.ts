import { useCallback, useEffect, useState } from 'react';
import { fetchPeople } from '../api/swapi';
import type { Character } from '../types';

interface UsePeopleReturn {
  characters: Character[];
  isLoading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  totalCount: number;
  setPage: (page: number) => void;
  search: string;
  setSearch: (search: string) => void;
  refetch: () => void;
}

export function usePeople(initialPage: number = 1): UsePeopleReturn {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage);
  const [search, setSearch] = useState<string>('');
  const [totalCount, setTotalCount] = useState<number>(0);
  const [refetchIndex, setRefetchIndex] = useState<number>(0);

  const refetch = useCallback(() => {
    setRefetchIndex((prev) => prev + 1);
  }, []);

  const handleSetSearch = useCallback((newSearch: string) => {
    setSearch(newSearch);
    setPage(1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    fetchPeople(page, search, controller.signal)
      .then((data) => {
        if (controller.signal.aborted) return;
        setCharacters(data.results || []);
        setTotalCount(data.count || 0);
        setIsLoading(false);
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : 'Failed to fetch characters.');
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [page, search, refetchIndex]);

  const totalPages = Math.max(1, Math.ceil(totalCount / 10));

  return {
    characters,
    isLoading,
    error,
    page,
    totalPages,
    totalCount,
    setPage,
    search,
    setSearch: handleSetSearch,
    refetch,
  };
}
