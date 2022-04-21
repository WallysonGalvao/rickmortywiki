import api from '~/services/api';

import { Filter } from '~/services/stores/filter';
import { Character, Episode, Location } from '~/types/common';
import {
  CharactersResponse,
  EpisodesResponse,
  LocationsResponse,
} from '~/types/response';

type CharactersParams = {
  name: string;
  pageParam: number;
  filters: Filter[];
};

export async function getCharacters({
  name,
  filters,
  pageParam = 1,
}: CharactersParams) {
  const params = filters.reduce((a, b) => ({ ...a, [b.key]: b.value }), {});
  const { data } = await api.get<CharactersResponse>('/character', {
    params: { name, page: pageParam, ...params },
  });
  return data;
}

export async function getEpisodes() {
  const { data } = await api.get<EpisodesResponse>('/episode');
  return data;
}

export async function getEpisode({ id }: { id: number }) {
  const { data } = await api.get<Episode>(`/episode/${id}`);
  return data;
}

export async function getCharactersByEpisode({ id }: { id: number }) {
  const { data } = await api.get<Episode>(`episode/${id}`);
  if (data) {
    const promises = data.characters.map(url => api.get<Character>(url));
    const characters = await Promise.all(promises).then(response =>
      response.map(res => res.data),
    );
    return { episode: data, characters };
  }
}

export async function getLocations() {
  const { data } = await api.get<LocationsResponse>('/location');
  return data;
}

export async function getCharactersByLocation({ id }: { id: number }) {
  const { data } = await api.get<Location>(`location/${id}`);
  if (data) {
    const promises = data.residents.map(url => api.get<Character>(url));
    const characters = await Promise.all(promises).then(response =>
      response.map(res => res.data),
    );
    return { location: data, characters };
  }
}
