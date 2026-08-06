import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CharacterCard } from './CharacterCard';
import type { Character } from '../../types';

const mockCharacter: Character = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: 'https://swapi.dev/api/planets/1/',
  species: [],
  url: 'https://swapi.dev/api/people/1/',
};

describe('CharacterCard', () => {
  it('renders character name and birth year', () => {
    render(<CharacterCard character={mockCharacter} onClick={() => {}} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText(/19BBY/)).toBeInTheDocument();
  });

  it('triggers onClick handler on click', () => {
    const handleClick = vi.fn();
    render(<CharacterCard character={mockCharacter} onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledWith(mockCharacter);
  });
});
