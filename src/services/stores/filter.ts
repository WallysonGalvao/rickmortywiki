import { create } from 'zustand';

export type Filter = {
  key: string;
  value: string;
};

type State = {
  filters: Filter[];
  setFilters: (filter: Filter) => void;
};

export const useFilter = create<State>((set, get) => ({
  filters: [] as Filter[],
  setFilters: filter => {
    const diffFilters = get().filters.filter(f => f.key !== filter.key);
    set({ filters: [...diffFilters, filter] });
  },
}));
