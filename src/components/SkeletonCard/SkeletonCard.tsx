import styles from './SkeletonCard.module.css';

export function SkeletonCard() {
  return (
    <div className={styles.card} data-testid="skeleton-card">
      <div className={`${styles.image} ${styles.shimmer}`} />
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={`${styles.title} ${styles.shimmer}`} />
          <div className={`${styles.subtitle} ${styles.shimmer}`} />
        </div>
        <div className={styles.statsGrid}>
          <div className={`${styles.statBlock} ${styles.shimmer}`} />
          <div className={`${styles.statBlock} ${styles.shimmer}`} />
          <div className={`${styles.statBlock} ${styles.shimmer}`} />
        </div>
      </div>
    </div>
  );
}
