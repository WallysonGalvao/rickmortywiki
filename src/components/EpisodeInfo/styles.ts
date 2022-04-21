import styled, { css } from 'styled-components/native';

import { darken } from 'polished';

export const EpisodeContainer = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: 15px;
  margin-left: 15px;
`;

export const EpisodeContentLeft = styled.View`
  ${({ theme }) => css`
    width: 20%;
    background-color: ${darken(0.1, theme.colors.aliceblue)};
    padding: 10px;

    justify-content: center;
    align-items: center;
  `};
`;

export const EpisodeContentRight = styled.View`
  ${({ theme }) => css`
    width: 80%;
    background-color: ${darken(0.2, theme.colors.aliceblue)};
    padding: 10px;
  `};
`;

export const EpisodeName = styled.Text`
  font-size: 16px;
  font-weight: 500;
`;

export const EpisodeValue = styled.Text``;
