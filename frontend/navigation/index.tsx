/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import { HStack, Spinner } from 'native-base';

import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import ModalScreen from '@/screens/ModalScreen';
import NotFoundScreen from '@/screens/NotFoundScreen';
import Home from '@/screens/Home';
import Services from '@/screens/Services';
import Store from '@/screens/Store';
import {
  HomeStackParamList,
  HomeTabParamList,
  HomeTabScreenProps,
} from '@/types';
import LinkingConfiguration from './LinkingConfiguration';
import Account from '@/screens/Account';
import Cart from '@/screens/Cart';

import RootStackNavigator from './RootStack';
import { RootState } from '@/redux';
import { useDispatch, useSelector } from 'react-redux';
import { addToken } from '@/redux/userCredential';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  // attempt to retrieve token from async storage to check if user
  // is still logged in from previous session
  useEffect(() => {
    setTimeout(async () => {
      try {
        // Uncomment following line to logout every time app refreshes.
        // await AsyncStorage.removeItem('userToken');
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken !== null) {
          dispatch(
            addToken({
              userToken: userToken,
            })
          );
        }
      } catch (e) {
        console.log('Failed to retrieve user token' + e);
      }
      setIsLoading(false);
    }, 1000);
  }, [dispatch]);
  const userToken = useSelector(
    (state: RootState) => state.userCredential.userToken
  );

  if (isLoading) {
    return (
      <HStack safeArea flex={1} alignItems="center" justifyContent="center">
        <Spinner size="lg" />
      </HStack>
    );
  }
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      {userToken == null ? <RootStackNavigator /> : <HomeStackNavigator />}
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <HomeStack.Group screenOptions={{ presentation: 'modal' }}>
        <HomeStack.Screen name="Modal" component={ModalScreen} />
      </HomeStack.Group>
    </HomeStack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<HomeTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={({ navigation }: HomeTabScreenProps<'Home'>) => ({
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Services"
        component={Services}
        options={{
          title: 'Services',
          tabBarIcon: ({ color }) => <TabBarIcon name="dog" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Store"
        component={Store}
        options={{
          title: 'Store',
          tabBarIcon: ({ color }) => <TabBarIcon name="store" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={Account}
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Cart"
        component={Cart}
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="shopping-cart" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
}) {
  return <FontAwesome5 size={30} style={{ marginBottom: -3 }} {...props} />;
}
