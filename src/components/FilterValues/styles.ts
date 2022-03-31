import styled, { css } from 'styled-components/native';

export const Content = styled.View`
  border-radius: 10px;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Circle = styled.TouchableOpacity<{ isSelected: boolean }>`
  ${({ theme, isSelected }) => css`
    padding: 5px;
    margin-vertical: 7px;
    margin-horizontal: 5px;
    border-width: 1px;
    border-color: ${theme.colors.blue};
    border-radius: 10px;

    ${isSelected &&
    css`
      background-color: ${theme.colors.blue};
    `}
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    padding: 15px;
    color: ${theme.colors.blue};
    background-color: ${theme.colors.white};
  `}
`;

export const Text = styled.Text<{ isSelected: boolean }>`
  ${({ theme, isSelected }) => css`
    text-align: center;
    color: ${theme.colors.blue};

    ${isSelected &&
    css`
      color: ${theme.colors.white};
    `}
  `}
`;
