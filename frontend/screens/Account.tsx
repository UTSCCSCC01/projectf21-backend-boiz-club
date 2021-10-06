import * as React from 'react';
import { View, Text, Button } from 'native-base';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AccountStackParamList } from '@/types';
import NotificationScreen from '@/screens/NotificationScreen';
import EditScreenInfo from '@/components/EditScreenInfo';
import VerificationModal from '@/screens/VerificationModal';
import { AccountStackScreenProps } from '@/types';

function AccountIndexScreen({
  navigation,
}: AccountStackScreenProps<'AccountIndexScreen'>) {
  return (
    <View flex={1} alignItems="center" justifyContent="center">
      <Text fontSize="2xl">Account</Text>
      <Button onPress={() => navigation.navigate('NotificationScreen')}>
        Notifications
      </Button>
      <View marginY={30} height={1} width="80%" />
      <EditScreenInfo path="/screens/Account.tsx" />
    </View>
  );
}

const AccountStack = createNativeStackNavigator<AccountStackParamList>();
createNativeStackNavigator();
export default function Account() {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        name="AccountIndexScreen"
        component={AccountIndexScreen}
        options={{ headerShown: false }}
      />
      <AccountStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
      <AccountStack.Group screenOptions={{ presentation: 'modal' }}>
        <AccountStack.Screen
          name="VerificationModal"
          component={VerificationModal}
          options={{ headerShown: false }}
        />
      </AccountStack.Group>
    </AccountStack.Navigator>
  );
}
