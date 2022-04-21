import styled, { css } from 'styled-components/native';
import { FlatList, FlatListProps } from 'react-native';
import { SafeAreaView as _SafeAreaView } from 'react-native-safe-area-context';

import { Location } from '~/types/common';

export const SafeAreaView = styled(_SafeAreaView)`
  flex: 1;
`;

export const LocationContainer = styled.View`
  margin-bottom: 10px;
`;

export const LocationName = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.blue};
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  `}
`;

export const LocationDimension = styled.Text`
  font-size: 16px;
  text-align: center;
`;

export const LocationType = styled.Text`
  font-size: 18px;
  text-align: center;
`;

export const LocationList = styled(
  FlatList as new (props: FlatListProps<Location>) => FlatList<Location[]>,
)``;

export const LocationButton = styled.TouchableOpacity``;
