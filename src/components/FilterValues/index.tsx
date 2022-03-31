import React from 'react';

import { capitalize } from '~/utils';
import { useFilter } from '~/services/stores/filter';

import * as S from './styles';

type FilterProps = {
  title: string;
  values: string[];
};

export const FilterValues = ({ title, values }: FilterProps) => {
  const { filters, setFilters } = useFilter();

  const onSelect = (value: string) => {
    setFilters({ key: title, value });
  };

  return (
    <>
      <S.Title>{capitalize(title)}</S.Title>
      <S.Content>
        {values.map(value => {
          const currentFilter = filters.find(filter => filter.key === title);
          const isSelected = currentFilter?.value === value;
          return (
            <S.Circle
              key={value}
              onPress={() => onSelect(value)}
              isSelected={isSelected}>
              <S.Text isSelected={isSelected}>{capitalize(value)}</S.Text>
            </S.Circle>
          );
        })}
      </S.Content>
    </>
  );
};
