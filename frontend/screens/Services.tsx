import * as React from 'react';
import { Text, Button, Center, Box, VStack, HStack } from 'native-base';
import { ServiceStackParamList, ServiceStackScreenProps } from '@/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RefreshControl, ScrollView } from 'react-native';
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

  const DisplayServices = () => (
    <Center padding={5}>
      <Text> Services goes here. </Text>
    </Center>
  );

  const ServiceButtons = () => (
    <Box
      width="100%"
      padding="5"
      backgroundColor="gray.100"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        width="90%"
        backgroundColor="gray.400"
        justifyContent="center"
        alignItems="center"
      >
        <VStack space="md">
          <Button
            size="lg"
            key="createServiceButton"
            onPress={() => navigation.navigate('CreateServiceModalDescription')}
            justifyContent="center"
          >
            Create Service
          </Button>
          <HStack space="md">
            <Button size="lg" key="ServicesButton" justifyContent="center">
              All Services
            </Button>
            <Button size="lg" key="MyServicesButton" justifyContent="center">
              My Services
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => {
            updateServices();
          }}
        />
      }
      stickyHeaderIndices={[0]}
    >
      <ServiceButtons />
      <DisplayServices />
    </ScrollView>
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
