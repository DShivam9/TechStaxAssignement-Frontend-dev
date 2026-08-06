import { useEffect, useState } from 'react';
import { fetchSpecies } from '../api/swapi';
import { getSpeciesColor } from '../utils/speciesColors';

export function useSpeciesColor(speciesUrls: string[]): {
  color: string;
  speciesName: string | null;
  isLoading: boolean;
} {
  const speciesUrl = speciesUrls[0] ?? '';
  const [speciesName, setSpeciesName] = useState<string | null>(null);
  const [color, setColor] = useState<string>(getSpeciesColor(null));
  const [isLoading, setIsLoading] = useState<boolean>(speciesUrl !== '');

  useEffect(() => {
    if (!speciesUrl) {
      setSpeciesName('Human');
      setColor(getSpeciesColor('Human'));
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);

    fetchSpecies(speciesUrl, controller.signal)
      .then((data) => {
        if (controller.signal.aborted) return;
        setSpeciesName(data.name);
        setColor(getSpeciesColor(data.name));
        setIsLoading(false);
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        setColor(getSpeciesColor(null));
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [speciesUrl]);

  return { color, speciesName, isLoading };
}
