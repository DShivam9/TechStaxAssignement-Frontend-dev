import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ErrorFallback } from './ErrorFallback';

describe('ErrorFallback', () => {
  it('renders custom error message', () => {
    render(<ErrorFallback message="Network Error" onRetry={() => {}} />);
    expect(screen.getByText('Network Error')).toBeInTheDocument();
  });

  it('triggers onRetry callback when button is clicked', () => {
    const handleRetry = vi.fn();
    render(<ErrorFallback onRetry={handleRetry} />);
    fireEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(handleRetry).toHaveBeenCalledOnce();
  });
});
