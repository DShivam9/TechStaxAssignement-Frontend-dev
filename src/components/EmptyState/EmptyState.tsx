import styles from './EmptyState.module.css';

interface EmptyStateProps {
  searchQuery?: string;
}

export function EmptyState({ searchQuery }: EmptyStateProps) {
  return (
    <div className={styles.container}>
      <div className={styles.icon} aria-hidden="true">🔍</div>
      <h3 className={styles.title}>
        {searchQuery ? `No characters found for "${searchQuery}"` : 'No characters found'}
      </h3>
      <p className={styles.message}>Try searching for a different name or clear the filter.</p>
    </div>
  );
}
