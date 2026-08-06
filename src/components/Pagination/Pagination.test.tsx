import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('disables previous button on first page', () => {
    render(<Pagination page={1} totalPages={9} onPageChange={() => {}} />);
    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /next/i })).not.toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination page={9} totalPages={9} onPageChange={() => {}} />);
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /previous/i })).not.toBeDisabled();
  });

  it('calls onPageChange with correct page numbers', () => {
    const handlePageChange = vi.fn();
    render(<Pagination page={2} totalPages={9} onPageChange={handlePageChange} />);

    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(handlePageChange).toHaveBeenCalledWith(3);

    fireEvent.click(screen.getByRole('button', { name: /previous/i }));
    expect(handlePageChange).toHaveBeenCalledWith(1);
  });
});
