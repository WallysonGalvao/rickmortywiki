import styled, { css, DefaultTheme } from 'styled-components/native';
import { FlatList } from 'react-native';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';
import { darken } from 'polished';

import { Episode, Status } from '~/types/common';
import { parseStatus } from '~/utils';

type GradientProps = LinearGradientProps & {
  status: Status;
};

export const Image = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 500px;
  height: 500px;
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

export const BadgeContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const Badge = styled.View<{ status: Status }>`
  ${({ theme, status }) => css`
    padding: 5px;
    height: 0.5px;
    width: 0.5px;
    margin-right: 5px;
    background-color: ${theme.colors.grey};
    border-radius: 50px;

    ${!!status && badgeModifiers[status](theme)}
  `}
`;

export const BadgeText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: 18px;
    font-weight: bold;
  `}
`;

export const InfoContainer = styled(LinearGradient).attrs<GradientProps>(
  ({ status }) => ({
    colors: ['transparent', parseStatus(status)],
  }),
)<GradientProps>`
  position: absolute;
  top: 290px;
  left: 0;
  right: 0;

  padding: 20px;
`;

export const Name = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: 800;
    font-size: 30px;
  `}
`;

export const LastLocation = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: 16px;
    font-weight: 500;
    margin-top: 10px;
    font-weight: 500;
  `}
`;

export const LocationName = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: 18px;
  `}
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  padding: 20px;
`;

export const EpisodeList = styled(
  FlatList as new () => FlatList<Episode[]>,
).attrs({
  showsVerticalScrollIndicator: true,
  ListHeaderComponentStyle: {
    marginBottom: 10,
  },
})``;

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

export const Episodes = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-left: 15px;
`;

export const EpisodeName = styled.Text`
  font-size: 16px;
  font-weight: 500;
`;

export const EpisodeValue = styled.Text``;
