import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (searchQuery: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search characters by name...' }: SearchBarProps) {
  const [inputValue, setInputValue] = useState<string>(value);
  const debouncedQuery = useDebounce(inputValue, 300);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (debouncedQuery !== value) {
      onChange(debouncedQuery);
    }
  }, [debouncedQuery, value, onChange]);

  useEffect(() => {
    function handleGlobalKeyDown(e: KeyboardEvent) {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        if (['INPUT', 'TEXTAREA'].includes((document.activeElement?.tagName || ''))) {
          return;
        }
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleClear = () => {
    setInputValue('');
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className={styles.container}>
      <svg
        className={styles.searchIcon}
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        ref={inputRef}
        type="text"
        className={styles.input}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        aria-label="Search Star Wars characters"
      />
      {inputValue ? (
        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
          aria-label="Clear search"
        >
          <svg
            width="13"
            height="13"
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
      ) : (
        <kbd className={styles.shortcutBadge}>/</kbd>
      )}
    </div>
  );
}
