import { Character, Episode, Info, Location } from './common';

export type CharactersResponse = {
  info: Info;
  results: Character[];
};

export type EpisodesResponse = {
  info: Info;
  results: Episode[];
};

export type LocationsResponse = {
  info: Info;
  results: Location[];
};
