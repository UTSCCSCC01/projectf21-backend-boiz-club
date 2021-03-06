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
  EditProfileScreen: undefined;
  NotificationScreen: undefined;
  VerificationApprovalModal: {
    user: User;
    request: AccountVerificationRequest;
  };
  ServiceApprovalModal: {
    user: User;
    request: ServiceVerificationRequest;
    service: Service;
  };
  ServicePurchaseApprovalModal: {
    user: User;
    request: ServiceVerificationRequest;
    service: Service;
  };
  VerificationUploadModal: undefined;
  FeesAdministrationModal: undefined;
};

export type AccountStackScreenProps<
  Screen extends keyof AccountStackParamList
> = CompositeScreenProps<
  NativeStackScreenProps<AccountStackParamList, Screen>,
  BottomTabScreenProps<HomeTabParamList>
>;

export type ServiceStackParamList = {
  ServiceIndexScreen: undefined;
  ServiceDetailModal: {
    service: Service;
    belongsToThisUser: boolean;
    openedFromCart: boolean;
  };
  CreateServiceModalDescription: undefined;
  CreateServiceModalContact: {
    serviceName: string;
    serviceDescription: string;
    servicePrice: string;
  };
  ViewServiceModal: undefined;
  ModifyServiceModal: {
    service: Service;
  };
};

export type ProductStackParamList = {
  ProductIndexScreen: undefined;
  ProductDetailModal: {
    product: Product;
    openedFromCart: boolean;
  };
};

export type ServiceStackScreenProps<
  Screen extends keyof ServiceStackParamList
> = CompositeScreenProps<
  NativeStackScreenProps<ServiceStackParamList, Screen>,
  BottomTabScreenProps<HomeTabParamList>
>;

export type ProductStackScreenProps<
  Screen extends keyof ProductStackParamList
> = CompositeScreenProps<
  NativeStackScreenProps<ProductStackParamList, Screen>,
  BottomTabScreenProps<HomeTabParamList>
>;

export type CartStackParamList = {
  CartIndexScreen: undefined;
  CartServiceDetailModal: {
    service: Service;
    belongsToThisUser: boolean;
  };
  CartProductDetailModal: {
    product: Product;
  };
  PaymentScreen: undefined;
};

export type CartStackScreenProps<Screen extends keyof CartStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<CartStackParamList, Screen>,
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
  ForgotPassword: undefined;
  ResetPassword: {
    email: string;
    encryptedEmail: string;
    encrpytedOTPId: string;
  };
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
  profile_pic: string;
  num_dogs: number;
  num_cats: number;
  createdAt: string;
  updatedAt: string;
};

export type Service = {
  _id: string;
  user_id: string;
  service_name: string | null;
  service_description: string | null;
  service_price: number | null;
  contact_number: string | null;
  country: string | null;
  city: string | null;
  postal_code: string | null;
  address: string | null;
  verified: boolean;
  createdAt?: string;
  updatedAt?: string;
  latitude: string | undefined;
  longitude: string | undefined;
};

export type Product = {
  _id: string;
  product_name: string | null;
  product_description: string | null;
  product_price: number | null;
};

export type AccountVerificationRequest = {
  _id: string;
  user_id: string;
  img_key: string;
  createdAt: string;
  __v?: undefined | string | number;
};

export type ServiceVerificationRequest = {
  _id: string;
  service_id: string;
  createdAt: string;
  __v?: undefined | string | number;
};

export type ServicePurchaseRequest = {
  _id: string;
  user_id: string;
  service_id: string;
  service_owner_id: string;
  createdAt: string;
  __v?: undefined | string | number;
};
