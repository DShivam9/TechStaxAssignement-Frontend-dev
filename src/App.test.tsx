import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import * as swapiApi from './api/swapi';
import type { SWAPIPeopleResponse, SWAPIPlanet } from './api/types';

const mockPeopleData: SWAPIPeopleResponse = {
  count: 1,
  next: null,
  previous: null,
  results: [
    {
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
    },
  ],
};

const mockPlanetData: SWAPIPlanet = {
  name: 'Tatooine',
  climate: 'arid',
  terrain: 'desert',
  population: '200000',
};

describe('App Integration', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders header, search bar, and skeleton cards initially', () => {
    vi.spyOn(swapiApi, 'fetchPeople').mockImplementation(() => new Promise(() => {}));
    render(<App />);

    expect(screen.getByText('Star Wars Characters')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search characters/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('skeleton-card')).toHaveLength(10);
  });

  it('renders character cards after successful API fetch', async () => {
    vi.spyOn(swapiApi, 'fetchPeople').mockResolvedValue(mockPeopleData);
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
  });

  it('opens character detail modal when a card is clicked', async () => {
    vi.spyOn(swapiApi, 'fetchPeople').mockResolvedValue(mockPeopleData);
    vi.spyOn(swapiApi, 'fetchPlanet').mockResolvedValue(mockPlanetData);
    render(<App />);

    const card = await screen.findByRole('button', { name: /view details for luke skywalker/i });
    fireEvent.click(card);

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Physical Attributes')).toBeInTheDocument();
  });

  it('displays ErrorFallback when API request fails', async () => {
    vi.spyOn(swapiApi, 'fetchPeople').mockRejectedValue(new Error('Network Error'));
    render(<App />);

    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Network Error')).toBeInTheDocument();
  });
});
