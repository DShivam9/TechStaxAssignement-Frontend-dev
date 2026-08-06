import styles from './Pagination.module.css';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function Pagination({ page, totalPages, onPageChange, isLoading }: PaginationProps) {
  return (
    <nav className={styles.container} aria-label="Pagination Navigation">
      <button
        type="button"
        className={styles.button}
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1 || isLoading}
        aria-label="Previous page"
      >
        ← Previous
      </button>
      <span className={styles.info}>
        Page {page} of {totalPages}
      </span>
      <button
        type="button"
        className={styles.button}
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages || isLoading}
        aria-label="Next page"
      >
        Next →
      </button>
    </nav>
  );
}
