/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { HomeStackParamList } from '@/types';

const linking: LinkingOptions<HomeStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          Services: {
            screens: {
              ServicesScreen: 'services',
            },
          },
          Store: {
            screens: {
              StoreScreen: 'store',
            },
          },
          Account: {
            screens: {
              AccountScreen: 'store',
            },
          },
          Cart: {
            screens: {
              CartScreen: 'cart',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
