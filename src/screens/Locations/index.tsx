import React, { useEffect, useRef, useState } from 'react';

import { useQuery } from 'react-query';
import BottomSheet from '@gorhom/bottom-sheet';

import { Card } from '~/components/Card';
import { ListInfo } from '~/components/ListInfo';

import { Character, Location } from '~/types/common';
import {
  getCharactersByLocation,
  getLocations,
} from '~/services/requests/characters/queries';
import { useDebouncedValue } from '~/hooks/useDebouncedValue';

import * as S from './styles';
import { CharacterList, Search } from '../Characters/styles';

const Locations = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [locationId, setLocationId] = useState(5);
  const [locationsFiltered, setLocationsFiltered] = useState<Location[]>([]);

  const { data: locations } = useQuery(['locations'], getLocations);

  const { data: charactersByLocation } = useQuery(
    ['charactersByLocation', locationId],
    () => getCharactersByLocation({ id: locationId }),
  );

  const [textToSearch, setTextToSearch] = useState('');

  const debouncedValue = useDebouncedValue(textToSearch);

  const onChangeSearch = (value: string) => setTextToSearch(value);

  const handleSelectLocation = (item: Location) => {
    setLocationId(item.id);
    bottomSheetRef.current?.snapToIndex(0);
  };

  const keyLocationExtractor = (item: Location) => item.id.toString();

  const renderLocationItem = ({ item }: { item: Location }) => (
    <S.LocationButton onPress={() => handleSelectLocation(item)}>
      <ListInfo location={item} />
    </S.LocationButton>
  );

  const keyExtractor = (item: Character) => item.id.toString();

  const renderItem = ({ item }: { item: Character }) => (
    <Card character={item} />
  );

  useEffect(() => {
    if (debouncedValue.length > 3) {
      const filtered = locations?.results.filter(location =>
        location.name.toLowerCase().includes(debouncedValue.toLowerCase()),
      );
      setLocationsFiltered(filtered || []);
    } else if (locations?.results?.length) {
      setLocationsFiltered(locations?.results);
    }
  }, [debouncedValue, locations?.results]);

  return (
    <S.SafeAreaView>
      <S.LocationContainer>
        <S.LocationName>{charactersByLocation?.location?.name}</S.LocationName>

        <S.LocationType>{`${charactersByLocation?.location?.type} | ${charactersByLocation?.location?.dimension}`}</S.LocationType>
      </S.LocationContainer>

      <CharacterList
        data={charactersByLocation?.characters}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        testID="characters_list"
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={['3%', '25%', '50%']}>
        <Search
          onChangeText={onChangeSearch}
          value={textToSearch}
          placeholder="Search for locations"
          returnKeyType="search"
          onSubmitEditing={() => onChangeSearch(debouncedValue)}
        />

        <S.LocationList
          data={locationsFiltered}
          keyExtractor={keyLocationExtractor}
          renderItem={renderLocationItem}
          testID="locations_list"
        />
      </BottomSheet>
    </S.SafeAreaView>
  );
};

export default Locations;
