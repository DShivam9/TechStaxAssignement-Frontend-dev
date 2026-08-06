import { useState } from 'react';
import styles from './App.module.css';
import { CharacterCard } from './components/CharacterCard/CharacterCard';
import { CharacterModal } from './components/CharacterModal/CharacterModal';
import { EmptyState } from './components/EmptyState/EmptyState';
import { ErrorFallback } from './components/ErrorFallback/ErrorFallback';
import { Pagination } from './components/Pagination/Pagination';
import { SearchBar } from './components/SearchBar/SearchBar';
import { SkeletonCard } from './components/SkeletonCard/SkeletonCard';
import { usePeople } from './hooks/usePeople';
import type { Character } from './types';

export function App() {
  const { characters, isLoading, error, page, totalPages, setPage, search, setSearch, refetch } = usePeople();
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  return (
    <div className={styles.container}>
      <header className={styles.topSection}>
        <div className={styles.header}>
          <span className={styles.tag}>SWAPI Directory</span>
          <h1 className={styles.title}>Star Wars Characters</h1>
          <p className={styles.subtitle}>Explore people, species, and homeworlds across the galaxy</p>
        </div>
        <div className={styles.searchWrapper}>
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </header>

      <main>
        {error ? (
          <ErrorFallback message={error} onRetry={refetch} />
        ) : (
          <>
            <div className={styles.grid}>
              {isLoading ? (
                Array.from({ length: 10 }).map((_, idx) => <SkeletonCard key={idx} />)
              ) : characters.length === 0 ? (
                <EmptyState searchQuery={search} />
              ) : (
                characters.map((char, idx) => (
                  <div
                    key={char.url}
                    className={styles.cardItemWrapper}
                    style={{ '--card-index': idx } as React.CSSProperties}
                  >
                    <CharacterCard
                      character={char}
                      onClick={setSelectedCharacter}
                    />
                  </div>
                ))
              )}
            </div>

            {!isLoading && characters.length > 0 && totalPages > 1 && (
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
                isLoading={isLoading}
              />
            )}
          </>
        )}

        <CharacterModal
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      </main>
    </div>
  );
}

export default App;
