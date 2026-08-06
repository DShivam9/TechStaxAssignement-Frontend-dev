export interface SWAPIPeopleResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SWAPIPerson[];
}

export interface SWAPIPerson {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  species: string[];
  url: string;
}

export interface SWAPISpecies {
  name: string;
  classification: string;
  language: string;
}

export interface SWAPIPlanet {
  name: string;
  climate: string;
  terrain: string;
  population: string;
}
