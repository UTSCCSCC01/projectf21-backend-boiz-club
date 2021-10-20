import * as React from 'react';
import { Text, Button, ScrollView, Box } from 'native-base';

import { ServiceStackParamList, ServiceStackScreenProps } from '@/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RefreshControl } from 'react-native';
import CreateServiceModalDescription from './CreateServiceModalDescription';
import CreateServiceModalContact from './CreateServiceModalContact';

function ServicesIndexScreen({
  navigation,
}: ServiceStackScreenProps<'ServiceIndexScreen'>) {
  const [isLoading, setIsLoading] = React.useState(true);

  const updateServices = async () => {
    setIsLoading(true);

    // UPDATE SERVICES FROM BACKEND HERE.

    setIsLoading(false);
  };

  React.useEffect(() => {
    updateServices();
  }, []);

  const DisplayServices = () => <Text> Services goes here. </Text>;

  const CreateServiceButton = () => (
    <Button
      size="lg"
      key="createServiceButton"
      width="70%"
      onPress={() => navigation.navigate('CreateServiceModalDescription')}
      marginBottom={7}
      justifyContent="center"
    >
      Create Service
    </Button>
  );
  return (
    <Box justifyContent="space-between" alignItems="center" marginBottom={5}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              updateServices();
            }}
          />
        }
      >
        <DisplayServices />
      </ScrollView>

      <CreateServiceButton />
    </Box>
  );
}

const ServiceStack = createNativeStackNavigator<ServiceStackParamList>();
createNativeStackNavigator();
export default function Services() {
  return (
    <ServiceStack.Navigator>
      <ServiceStack.Screen
        name="ServiceIndexScreen"
        component={ServicesIndexScreen}
        options={{ headerShown: false }}
      />
      <ServiceStack.Group screenOptions={{ presentation: 'modal' }}>
        <ServiceStack.Screen
          name="CreateServiceModalDescription"
          component={CreateServiceModalDescription}
          options={{ headerShown: false }}
        />
        <ServiceStack.Screen
          name="CreateServiceModalContact"
          component={CreateServiceModalContact}
          options={{ headerShown: false }}
        />
      </ServiceStack.Group>
    </ServiceStack.Navigator>
  );
}
