import { useEffect, useState } from 'react';
import { useSpeciesColor } from '../../hooks/useSpeciesColor';
import type { Character } from '../../types';
import { getCharacterImageUrl, getFallbackImageUrl } from '../../utils/getCharacterImage';
import styles from './CharacterCard.module.css';

interface CharacterCardProps {
  character: Character;
  onClick: (character: Character) => void;
}

export function CharacterCard({ character, onClick }: CharacterCardProps) {
  const { speciesName } = useSpeciesColor(character.species);
  const primaryImageUrl = getCharacterImageUrl(character.url);
  const [imgSrc, setImgSrc] = useState<string>(primaryImageUrl);

  useEffect(() => {
    setImgSrc(primaryImageUrl);
  }, [primaryImageUrl]);

  const handleImageError = () => {
    setImgSrc(getFallbackImageUrl());
  };

  return (
    <article
      className={styles.card}
      onClick={() => onClick(character)}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${character.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(character);
        }
      }}
    >
      <div className={styles.imageWrapper}>
        <img
          src={imgSrc}
          alt=""
          aria-hidden="true"
          className={styles.image}
          loading="lazy"
          onError={handleImageError}
        />
        <div className={styles.imageGradient} />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.identity}>
            <h3 className={styles.name}>{character.name}</h3>
            <span className={styles.species}>{speciesName ?? 'Unknown'}</span>
          </div>
          <span className={styles.arrow} aria-hidden="true">→</span>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Birth</span>
            <span className={styles.statValue}>{character.birth_year}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Gender</span>
            <span className={styles.statValue}>{character.gender}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Height</span>
            <span className={styles.statValue}>{character.height !== 'unknown' ? `${character.height}cm` : '—'}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
