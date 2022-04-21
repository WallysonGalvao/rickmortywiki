import React, { useMemo } from 'react';
import { useQueries, useQuery } from 'react-query';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { EpisodeInfo } from '~/components/EpisodeInfo';

import { getEpisodeId } from '~/utils';
import { Character, Episode } from '~/types/common';
import { getEpisode } from '~/services/requests/characters/queries';

import * as S from './styles';

type DetailsParams = {
  character: Character;
};

const Details = () => {
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const { character } = params as DetailsParams;

  const firstSeenEpisodeId = useMemo(
    () => getEpisodeId({ episode: character.episode[0] }),
    [character.episode],
  );

  const { data: firstSeen } = useQuery(['episode', firstSeenEpisodeId], () =>
    getEpisode({ id: firstSeenEpisodeId }),
  );

  const results = useQueries(
    character.episode.map(episode => {
      const episodeId = getEpisodeId({ episode });
      return {
        queryKey: ['episode', episodeId],
        queryFn: () => getEpisode({ id: episodeId }),
      };
    }),
  );

  const isLoading = results.some(result => result.isLoading);
  const episodes = results.map(result => result.data) as Episode[];

  const keyExtractor = (item: Episode) => item.id.toString();

  const renderHeader = () => (
    <>
      <S.Image source={{ uri: character.image }} />

      <S.BackButton onPress={goBack}>
        <Ionicons name="arrow-back-outline" size={25} />
      </S.BackButton>

      <S.InfoContainer>
        <S.Name>{character.name}</S.Name>

        <S.BadgeContainer>
          <S.Badge status={character.status} />
          <S.BadgeText>{`${character.status} - ${character.species}`}</S.BadgeText>
        </S.BadgeContainer>

        <S.LastLocation>Last known location:</S.LastLocation>
        <S.LocationName>{character.location.name}</S.LocationName>

        <S.LastLocation>First seen in:</S.LastLocation>
        <S.LocationName>{firstSeen?.name}</S.LocationName>
      </S.InfoContainer>
    </>
  );

  const renderItem = ({
    item: episode,
    index,
  }: {
    item: Episode;
    index: number;
  }) => {
    return (
      <>
        {index === 0 && <S.Episodes>Episodes</S.Episodes>}
        <EpisodeInfo episode={episode} />
        {/* <S.EpisodeContainer>
          <S.EpisodeContentLeft>
            <S.EpisodeValue>{episode.episode}</S.EpisodeValue>
          </S.EpisodeContentLeft>
          <S.EpisodeContentRight>
            <S.EpisodeName>{episode.name}</S.EpisodeName>
            <S.EpisodeValue>{episode.air_date}</S.EpisodeValue>
          </S.EpisodeContentRight>
        </S.EpisodeContainer> */}
      </>
    );
  };

  return (
    <>
      {!isLoading && (
        <S.EpisodeList
          data={episodes}
          keyExtractor={keyExtractor}
          ListHeaderComponent={renderHeader}
          renderItem={renderItem}
          onEndReachedThreshold={1}
        />
      )}
    </>
  );
};

export default Details;
