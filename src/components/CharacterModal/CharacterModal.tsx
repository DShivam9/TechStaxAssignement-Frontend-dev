import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { fetchPlanet } from '../../api/swapi';
import { useSpeciesColor } from '../../hooks/useSpeciesColor';
import type { Character, Planet } from '../../types';
import { formatPopulation } from '../../utils/formatNumber';
import styles from './CharacterModal.module.css';

interface CharacterModalProps {
  character: Character | null;
  onClose: () => void;
}

function displayValue(val: string, suffix?: string): string {
  if (!val || val === 'unknown' || val === 'n/a') return '—';
  return suffix ? `${val} ${suffix}` : val;
}

export function CharacterModal({ character, onClose }: CharacterModalProps) {
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [isPlanetLoading, setIsPlanetLoading] = useState<boolean>(false);
  const { speciesName } = useSpeciesColor(character?.species || []);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!character) return;
    triggerRef.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';

    const controller = new AbortController();
    setIsPlanetLoading(true);
    setPlanet(null);

    fetchPlanet(character.homeworld, controller.signal)
      .then((data) => setPlanet(data))
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setPlanet(null);
        }
      })
      .finally(() => setIsPlanetLoading(false));

    return () => {
      controller.abort();
      document.body.style.overflow = '';
      if (triggerRef.current) {
        triggerRef.current.focus();
      }
    };
  }, [character]);

  useEffect(() => {
    if (!character) return;

    const modal = modalRef.current;
    if (!modal) return;

    const focusable = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }

    first?.focus();
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [character, onClose]);

  if (!character) return null;

  return createPortal(
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="character-modal-title"
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className={styles.content}>
          <header className={styles.header}>
            <h2 id="character-modal-title" className={styles.title}>
              {character.name}
            </h2>
            <span className={styles.subtitle}>{speciesName ?? 'Unknown Species'}</span>
          </header>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Physical Attributes</h3>
            <div className={styles.grid}>
              <div className={styles.detailItem}>
                <span className={styles.label}>Height</span>
                <span className={styles.value}>{displayValue(character.height, 'cm')}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Mass</span>
                <span className={styles.value}>{displayValue(character.mass, 'kg')}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Hair Color</span>
                <span className={styles.value}>{displayValue(character.hair_color)}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Skin Color</span>
                <span className={styles.value}>{displayValue(character.skin_color)}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Eye Color</span>
                <span className={styles.value}>{displayValue(character.eye_color)}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Birth Year</span>
                <span className={styles.value}>{displayValue(character.birth_year)}</span>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Homeworld Details</h3>
            {isPlanetLoading ? (
              <p className={styles.planetLoading}>Loading homeworld data...</p>
            ) : planet ? (
              <div className={styles.grid}>
                <div className={styles.detailItem}>
                  <span className={styles.label}>Planet</span>
                  <span className={styles.value}>{planet.name}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.label}>Climate</span>
                  <span className={styles.value}>{planet.climate}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.label}>Terrain</span>
                  <span className={styles.value}>{planet.terrain}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.label}>Population</span>
                  <span className={styles.value}>{formatPopulation(planet.population)}</span>
                </div>
              </div>
            ) : (
              <p className={styles.planetLoading}>Homeworld data unavailable.</p>
            )}
          </section>
        </div>
      </div>
    </div>,
    document.body
  );
}
