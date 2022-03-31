import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { Character } from '~/types/common';

type CardProps = {
  character: Character;
};

import * as S from './styles';

export const Card = ({ character }: CardProps) => {
  const { navigate } = useNavigation();
  const handleDetail = () => navigate('Detail', { character });

  return (
    <S.Container onPress={handleDetail}>
      <S.Image source={{ uri: character.image }} />
      <S.Badge status={character.status}>
        <S.BadgeText>{character.status}</S.BadgeText>
      </S.Badge>
      <S.InfoContainer>
        <S.Name>{character.name}</S.Name>
        <S.LastLocation>Last Location</S.LastLocation>
        <S.LocationName>{character.location.name}</S.LocationName>
      </S.InfoContainer>
    </S.Container>
  );
};
