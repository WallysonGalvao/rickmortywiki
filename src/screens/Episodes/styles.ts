import styled, { css } from 'styled-components/native';
import { FlatList, FlatListProps } from 'react-native';
import { SafeAreaView as _SafeAreaView } from 'react-native-safe-area-context';

import { Episode } from '~/types/common';

export const SafeAreaView = styled(_SafeAreaView)`
  flex: 1;
`;

export const EpisodeContainer = styled.View`
  margin-bottom: 10px;
`;

export const EpisodeName = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.blue};
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  `}
`;

export const EpisodeAirDate = styled.Text`
  font-size: 18px;
  text-align: center;
`;

export const EpisodeList = styled(
  FlatList as new (props: FlatListProps<Episode>) => FlatList<Episode[]>,
)``;

export const EpisodeButton = styled.TouchableOpacity``;

export const Search = styled.TextInput`
  ${({ theme }) => css`
    margin-horizontal: 20px;
    height: 40px;
    margin: 12px;
    border-width: 1px;
    padding: 10px;
    border-radius: 10px;
    border-color: ${theme.colors.blue};
  `}
`;
