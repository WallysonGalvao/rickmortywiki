import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { theme } from '~/styles';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const testQueryClient = createTestQueryClient();

const RootComponent = ({ ui }: { ui: React.ReactElement }) => (
  <ThemeProvider theme={theme}>
    <BottomSheetModalProvider>
      <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
    </BottomSheetModalProvider>
  </ThemeProvider>
);

export function renderWithClient(ui: React.ReactElement) {
  const { rerender, ...result } = render(<RootComponent ui={ui} />);
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(<RootComponent ui={rerenderUi} />),
  };
}
