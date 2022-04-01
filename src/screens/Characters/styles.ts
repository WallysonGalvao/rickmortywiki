import styled, { css } from 'styled-components/native';
import { FlatList, FlatListProps } from 'react-native';
import { BottomSheetModal as _BottomSheetModal } from '@gorhom/bottom-sheet';

import { Character } from '~/types/common';

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

export const CharacterList = styled(
  FlatList as new (props: FlatListProps<Character>) => FlatList<Character[]>,
).attrs({
  numColumns: 2,
  columnWrapperStyle: {
    justifyContent: 'space-around',
  },
  showsVerticalScrollIndicator: true,
})``;

export const FilterContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-horizontal: 10px;
`;

export const BottomSheetModal = styled(_BottomSheetModal).attrs({
  enablePanDownToClose: true,
})`
  border-radius: 10px;
`;

export const Shadow = styled.View`
  ${({ theme }) => css`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    z-index: 2;
    background-color: ${theme.colors.darkTransparent};
  `}
`;
