export type Info = {
  count: number;
  pages: number;
  next: string;
  prev: null;
};

export type Status = 'Alive' | 'Dead' | 'unknown';
export type Species =
  | 'Human'
  | 'Alien'
  | 'Humanoid'
  | 'Poopybutthole'
  | 'Mythological'
  | 'Unknown'
  | 'Animal'
  | 'Disease'
  | 'Robot'
  | 'Cronenberg'
  | 'Planet';

export type Gender = 'Female' | 'Male' | 'Genderless' | 'unknown';

export type Character = {
  id: number;
  name: string;
  status: Status;
  species: Species;
  type: string;
  gender: Gender;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: Date;
};

export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: Date;
};

export type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: Date;
};
