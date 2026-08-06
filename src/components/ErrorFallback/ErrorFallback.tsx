import styles from './ErrorFallback.module.css';

interface ErrorFallbackProps {
  message?: string;
  onRetry: () => void;
}

export function ErrorFallback({ message, onRetry }: ErrorFallbackProps) {
  return (
    <div className={styles.container} role="alert">
      <div className={styles.icon} aria-hidden="true">⚠️</div>
      <h2 className={styles.title}>Something went wrong</h2>
      <p className={styles.message}>
        {message || 'Failed to load Star Wars data. Check internet connection.'}
      </p>
      <button type="button" className={styles.button} onClick={onRetry}>
        Try Again
      </button>
    </div>
  );
}
