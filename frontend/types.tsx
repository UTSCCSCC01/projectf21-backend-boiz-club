/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList, AccountStackParamList {}
  }
}

export type HomeStackParamList = {
  Root: NavigatorScreenParams<HomeTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type HomeStackScreenProps<Screen extends keyof HomeStackParamList> =
  NativeStackScreenProps<HomeStackParamList, Screen>;

export type AccountStackParamList = {
  AccountIndexScreen: undefined;
  NotificationScreen: undefined;
  VerificationApprovalModal: { user: User; request: VerificationRequest };
  VerificationUploadModal: undefined;
};

export type AccountStackScreenProps<
  Screen extends keyof AccountStackParamList
> = CompositeScreenProps<
  NativeStackScreenProps<AccountStackParamList, Screen>,
  BottomTabScreenProps<HomeTabParamList>
>;

export type HomeTabParamList = {
  Home: undefined;
  Services: undefined;
  Store: undefined;
  Account: NavigatorScreenParams<AccountStackParamList> | undefined;
  Cart: undefined;
};

export type HomeTabScreenProps<Screen extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, Screen>,
    NativeStackScreenProps<HomeStackParamList>
  >;

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ResetPassword: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type User = {
  _id: string;
  username: string;
  first_name: string | null;
  last_name: string | null;
  address: string | null;
  phone_number: string | null;
  authentication_lvl: 'verified' | 'unverified' | 'admin';
  createdAt: string;
  updatedAt: string;
};

export type VerificationRequest = {
  _id: string;
  user_id: string;
  img_key: string;
  createdAt: string;
  __v?: undefined | string | number;
};
