import React from 'react';
import { Episode } from '~/types/common';

import * as S from './styles';

type EpisodeInfoProps = {
  episode: Episode;
};

export const EpisodeInfo = ({ episode }: EpisodeInfoProps) => {
  return (
    <S.EpisodeContainer>
      <S.EpisodeContentLeft>
        <S.EpisodeValue>{episode.episode}</S.EpisodeValue>
      </S.EpisodeContentLeft>
      <S.EpisodeContentRight>
        <S.EpisodeName>{episode.name}</S.EpisodeName>
        <S.EpisodeValue>{episode.air_date}</S.EpisodeValue>
      </S.EpisodeContentRight>
    </S.EpisodeContainer>
  );
};
