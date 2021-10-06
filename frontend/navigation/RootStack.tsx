import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '@/screens/SignInScreen';
import SignUpScreen from '@/screens/SignUpScreen';
import ForgotPasswordScreen from '@/screens/ForgotPasswordScreen';
import { RootStackParamList } from '@/types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootStackNavigator() {
  return (
    <RootStack.Navigator initialRouteName="SignIn">
      <RootStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </RootStack.Navigator>
  );
}

export default RootStackNavigator;
