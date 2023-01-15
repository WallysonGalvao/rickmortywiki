import React, { useCallback, useRef, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '~/components/Card';
import { Filter } from '~/components/Filter';
import { FilterValues } from '~/components/FilterValues';

import { Character } from '~/types/common';
import { useFilter } from '~/services/stores/filter';
import { useDebouncedValue } from '~/hooks/useDebouncedValue';
import { getCharacters } from '~/services/requests/characters/queries';

import * as S from './styles';

const filterValues = [
  { title: 'status', values: ['alive', 'dead', 'unknown'] },
  {
    title: 'species',
    values: [
      'human',
      'alien',
      'humanoid',
      'poopybutthole',
      'mythological',
      'unknown',
      'animal',
      'disease',
      'robot',
      'cronenberg',
      'planet',
    ],
  },
  { title: 'gender', values: ['female', 'male', 'genderless', 'unknown'] },
];

const Characters = () => {
  const { filters } = useFilter();

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const [textToSearch, setTextToSearch] = useState('');
  const [isActive, setIsActive] = useState(false);

  const debouncedValue = useDebouncedValue(textToSearch);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ['characters', debouncedValue, filters],
      ({ pageParam }) =>
        getCharacters({ name: debouncedValue, pageParam, filters }),
      {
        getNextPageParam: lastPage => {
          if (lastPage.info.next) {
            const regex = new RegExp(/(page=)\w+/g);
            const results = regex.exec(lastPage.info.next);
            if (results?.length) {
              return Number(results?.[0].split('page=')[1]);
            }
          }
        },
      },
    );

  const handleSheetChanges = useCallback(
    (index: number) => setIsActive(index > -1),
    [],
  );

  const onChangeSearch = (value: string) => setTextToSearch(value);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const handleFilters = () => bottomSheetRef.current?.present();

  const keyExtractor = (item: Character) => item.id.toString();

  const renderItem = ({ item }: { item: Character }) => (
    <Card character={item} />
  );

  const renderSpinner = () => <ActivityIndicator size={100} />;

  return (
    <SafeAreaView>
      <S.Search
        onChangeText={onChangeSearch}
        value={textToSearch}
        placeholder="Search for characters"
        returnKeyType="search"
        onSubmitEditing={() => onChangeSearch(debouncedValue)}
      />

      <S.FilterContainer>
        {filterValues
          .map(values => values.title)
          .map(key => (
            <Filter key={key} filterKey={key} onPress={handleFilters} />
          ))}
      </S.FilterContainer>

      <S.CharacterList
        data={data?.pages.flatMap(page => page.results)}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReachedThreshold={1}
        onEndReached={loadMore}
        ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
        testID="characters_list"
      />

      <S.BottomSheetModal
        ref={bottomSheetRef}
        index={1}
        snapPoints={['25%', '50%']}
        onChange={handleSheetChanges}>
        {filterValues.map(value => (
          <FilterValues
            key={value.title}
            title={value.title}
            values={value.values}
          />
        ))}
      </S.BottomSheetModal>

      {isActive && <S.Shadow />}
    </SafeAreaView>
  );
};

export default Characters;
