import React, { useEffect, useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import BottomSheet from '@gorhom/bottom-sheet';

import { Card } from '~/components/Card';
import { ListInfo } from '~/components/ListInfo';

import { Character, Episode } from '~/types/common';
import {
  getCharactersByEpisode,
  getEpisodes,
} from '~/services/requests/characters/queries';
import { useDebouncedValue } from '~/hooks/useDebouncedValue';

import * as S from './styles';
import { CharacterList, Search } from '../Characters/styles';

const Episodes = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [episodeId, setEpisodeId] = useState(5);
  const [episodesFiltered, setEpisodesFiltered] = useState<Episode[]>([]);

  const { data: episodes } = useQuery(['episodes'], getEpisodes);

  const { data: charactersByEpisode } = useQuery(
    ['charactersByEpisode', episodeId],
    () => getCharactersByEpisode({ id: episodeId }),
  );

  const [textToSearch, setTextToSearch] = useState('');

  const debouncedValue = useDebouncedValue(textToSearch);

  const onChangeSearch = (value: string) => setTextToSearch(value);

  const handleSelectEpisode = (item: Episode) => {
    setEpisodeId(item.id);
    bottomSheetRef.current?.snapToIndex(0);
  };

  const keyEpisodeExtractor = (item: Episode) => item.id.toString();

  const renderEpisodeItem = ({ item }: { item: Episode }) => (
    <S.EpisodeButton onPress={() => handleSelectEpisode(item)}>
      <ListInfo episode={item} />
    </S.EpisodeButton>
  );

  const keyExtractor = (item: Character) => item.id.toString();

  const renderItem = ({ item }: { item: Character }) => (
    <Card character={item} />
  );

  useEffect(() => {
    if (debouncedValue.length > 3) {
      const filtered = episodes?.results.filter(episode =>
        episode.name.toLowerCase().includes(debouncedValue.toLowerCase()),
      );
      setEpisodesFiltered(filtered || []);
    } else if (episodes?.results?.length) {
      setEpisodesFiltered(episodes?.results);
    }
  }, [debouncedValue, episodes?.results]);

  return (
    <S.SafeAreaView>
      <S.EpisodeContainer>
        <S.EpisodeName>{charactersByEpisode?.episode?.name}</S.EpisodeName>
        <S.EpisodeAirDate>
          {`${charactersByEpisode?.episode?.episode} | ${charactersByEpisode?.episode?.air_date}`}
        </S.EpisodeAirDate>
      </S.EpisodeContainer>

      <CharacterList
        data={charactersByEpisode?.characters}
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
          placeholder="Search for episodes"
          returnKeyType="search"
          onSubmitEditing={() => onChangeSearch(debouncedValue)}
        />

        <S.EpisodeList
          data={episodesFiltered}
          keyExtractor={keyEpisodeExtractor}
          renderItem={renderEpisodeItem}
          testID="episodes_list"
        />
      </BottomSheet>
    </S.SafeAreaView>
  );
};

export default Episodes;
