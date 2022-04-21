import React from 'react';
import { fireEvent, act } from '@testing-library/react-native';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { renderWithClient } from '~/utils/tests/helpers';

import Characters from '.';

import { eventData } from '~/utils/tests';
import charactersMock from '~/utils/tests/mocks/characters.json';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const originalModule = jest.requireActual('@react-navigation/native');

  return {
    __esModule: true,
    ...originalModule,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

const handlers = [
  rest.get('/character', (_, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({ pageParams: [undefined], pages: [charactersMock] }),
    ),
  ),
];

const server = setupServer(...handlers);

describe('Characters', () => {
  beforeAll(() => {
    server.listen();
  });
  // afterEach(() => {
  //   server.resetHandlers();
  // });
  afterAll(() => {
    server.close();
  });

  it('should render a list', async () => {
    const { toJSON, findByText } = renderWithClient(<Characters />);

    expect(await findByText(/Rick Sanchez/)).toBeTruthy();
    await act(async () => expect(toJSON()).toMatchSnapshot());
  });

  it('should search for a character', async () => {
    const CharacterName = 'Morty Smith';
    const { findByText, getByPlaceholderText } = renderWithClient(
      <Characters />,
    );

    const input = getByPlaceholderText(/Search for characters/i);
    fireEvent.changeText(input, CharacterName);

    expect(await findByText(CharacterName)).toBeTruthy();
  });

  it('should search for a character from onSubmitEditing', async () => {
    const CharacterName = 'Morty Smith';
    const { findByText, getByPlaceholderText } = renderWithClient(
      <Characters />,
    );

    const input = getByPlaceholderText(/Search for characters/i);
    fireEvent.changeText(input, CharacterName);
    fireEvent(input, 'onSubmitEditing');

    expect(await findByText(CharacterName)).toBeTruthy();
  });

  it('should navigate to Details', async () => {
    const { findByText } = renderWithClient(<Characters />);

    const button = await findByText(/Rick Sanchez/i);

    await act(async () => fireEvent.press(button));

    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith('Details', {
      character: charactersMock.results[0],
    });
  });

  it('should load more items', async () => {
    const { getByTestId } = renderWithClient(<Characters />);

    await act(async () =>
      fireEvent.scroll(getByTestId('characters_list'), eventData),
    );

    expect(charactersMock.results).toHaveLength(charactersMock.results.length);
  });
});
