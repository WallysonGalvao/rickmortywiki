import React, { Fragment } from 'react';
import { Episode, Location } from '~/types/common';

import * as S from './styles';

type EpisodeInfoProps = {
  episode?: Episode;
  location?: Location;
};

export const ListInfo = ({ episode, location }: EpisodeInfoProps) => {
  if (episode) {
    return (
      <S.Container>
        <S.ContentLeft>
          <S.LeftValue>{episode.episode}</S.LeftValue>
        </S.ContentLeft>
        <S.ContentRight>
          <S.Name>{episode.name}</S.Name>
          <S.Value>{episode.air_date}</S.Value>
        </S.ContentRight>
      </S.Container>
    );
  }

  if (location) {
    return (
      <S.Container>
        <S.ContentLeft>
          <S.LeftValue>{location.type}</S.LeftValue>
        </S.ContentLeft>
        <S.ContentRight>
          <S.Name>{location.name}</S.Name>
          <S.Value>{location.dimension}</S.Value>
        </S.ContentRight>
      </S.Container>
    );
  }

  return <Fragment />;
};
