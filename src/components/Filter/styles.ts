import styled, { css } from 'styled-components/native';

export const Container = styled.TouchableOpacity<{ active: boolean }>`
  ${({ theme, active }) => css`
    width: 120px;
    border-width: 1px;
    border-color: ${theme.colors.grey};
    border-radius: 10px;
    padding: 5px;

    flex-direction: row;
    justify-content: center;
    align-items: center;

    ${active &&
    css`
      background-color: ${theme.colors.blue};
      border-color: ${theme.colors.blue};
    `}
  `}
`;

export const Text = styled.Text<{ active: boolean }>`
  ${({ theme, active }) => css`
    text-align: center;

    ${active &&
    css`
      color: ${theme.colors.white};
    `}
  `}
`;
