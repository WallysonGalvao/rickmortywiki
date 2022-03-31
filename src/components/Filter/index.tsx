import React from 'react';
import { useMemo } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { capitalize } from '~/utils';
import { useFilter } from '~/services/stores/filter';

import { theme } from '~/styles';
import * as S from './styles';

type FilterProps = {
  filterKey: string;
  onPress: () => void;
};

export const Filter = ({ filterKey, onPress }: FilterProps) => {
  const { filters } = useFilter();

  const selectedFilter = useMemo(
    () => filters.find(filter => filter.key === filterKey),
    [filterKey, filters],
  );

  return (
    <S.Container onPress={onPress} active={!!selectedFilter}>
      <S.Text active={!!selectedFilter}>
        {capitalize(selectedFilter?.value || filterKey)}
      </S.Text>
      <Ionicons
        name="chevron-down"
        size={20}
        color={selectedFilter ? theme.colors.white : theme.colors.black}
      />
    </S.Container>
  );
};
