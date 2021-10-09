import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NativeBaseProvider } from 'native-base';

import useCachedResources from '@/hooks/useCachedResources';
import useColorScheme from '@/hooks/useColorScheme';
import Navigation from '@/navigation';
import StorybookUIRoot from './storybook';

import store from '@/redux';
import Constants from 'expo-constants';
import { Provider } from 'react-redux';

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NativeBaseProvider>
        <Provider store={store}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </Provider>
      </NativeBaseProvider>
    );
  }
};

export default Constants.manifest?.extra.LOAD_STORYBOOK ? StorybookUIRoot : App;
