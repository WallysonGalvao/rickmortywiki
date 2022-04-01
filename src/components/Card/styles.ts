import styled, { css, DefaultTheme } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Status } from '~/types/common';

export const Container = styled.TouchableOpacity`
  ${({ theme }) => css`
    width: ${RFValue(40)}%;
    border-width: ${RFValue(1)}px;
    border-color: ${theme.colors.blue}
    border-radius: ${RFValue(10)}px;
    margin-bottom: ${RFValue(10)}px;
  `}
`;

export const Image = styled.Image`
  width: 100%;
  height: ${RFValue(150)}px;
  border-top-right-radius: ${RFValue(10)}px;
  border-top-left-radius: ${RFValue(10)}px;
  align-self: center;
`;

const badgeModifiers = {
  Alive: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.forestgreen};
  `,
  Dead: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.red};
  `,
  unknown: () => css``,
};

export const Badge = styled.View<{ status: Status }>`
  ${({ theme, status }) => css`
    top: 5px;
    right: 5px;
    position: absolute;
    padding: 5px;
    border-radius: 5px;
    background-color: gray;

    ${!!status && badgeModifiers[status](theme)}
  `}
`;

export const InfoContainer = styled.View`
  margin-left: 5px;
  margin-bottom: 5px;
`;

export const Name = styled.Text`
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 10px;
`;

export const LastLocation = styled.Text`
  margin-vertical: 5px;
  font-size: 12px;
`;

export const LocationName = styled.Text``;

export const BadgeText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.white}
  font-weight: bold;
  `}
`;
