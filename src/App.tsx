import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { theme } from './styles';
import { Routes } from './routes';

import './config';

const queryClient = new QueryClient();

const App = () => {
  return (
    <GestureHandlerRootView style={styles.rootView}>
      <ThemeProvider theme={theme}>
        <BottomSheetModalProvider>
          <QueryClientProvider client={queryClient}>
            <StatusBar barStyle={'dark-content'} />
            <Routes />
          </QueryClientProvider>
        </BottomSheetModalProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
});
