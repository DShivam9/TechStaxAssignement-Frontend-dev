import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('renders input with placeholder', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText(/search characters/i)).toBeInTheDocument();
  });

  it('triggers debounced onChange when typing', () => {
    vi.useFakeTimers();
    const handleChange = vi.fn();
    render(<SearchBar value="" onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Luke' } });

    expect(handleChange).not.toHaveBeenCalledWith('Luke');

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(handleChange).toHaveBeenCalledWith('Luke');
    vi.useRealTimers();
  });

  it('clears input when clear button is clicked', () => {
    const handleChange = vi.fn();
    render(<SearchBar value="Luke" onChange={handleChange} />);

    const clearBtn = screen.getByRole('button', { name: /clear search/i });
    fireEvent.click(clearBtn);

    expect(handleChange).toHaveBeenCalledWith('');
  });
});
