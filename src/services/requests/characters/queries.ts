import api from '~/services/api';
import { CharactersResponse } from '~/types/response';
import { Filter } from '~/services/stores/filter';

type Params = {
  name: string;
  pageParam: number;
  filters: Filter[];
};

export async function getCharacters({ name, filters, pageParam = 1 }: Params) {
  const params = filters.reduce((a, b) => ({ ...a, [b.key]: b.value }), {});
  const { data } = await api.get<CharactersResponse>('/character', {
    params: { name, page: pageParam, ...params },
  });
  return data;
}
