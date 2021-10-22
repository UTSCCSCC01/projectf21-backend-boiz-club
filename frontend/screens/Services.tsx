import * as React from 'react';
import { Text, Button, Center, HStack, useToast } from 'native-base';
import { ServiceStackParamList, ServiceStackScreenProps } from '@/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RefreshControl, ScrollView } from 'react-native';
import CreateServiceModalDescription from './CreateServiceModalDescription';
import CreateServiceModalContact from './CreateServiceModalContact';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAppSelector } from '@/hooks/react-redux';
import { whoAmI } from '@/services/account';

function ServicesIndexScreen({
  navigation,
}: ServiceStackScreenProps<'ServiceIndexScreen'>) {
  const [isLoading, setIsLoading] = React.useState(true);
  const token = useAppSelector((state) => state.userCredential.userToken);
  const toast = useToast();

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

  const checkVerification = () => {
    let verificationStatus;

    whoAmI(token).then((res) => {
      if (res.data.authentication_lvl === 'verified') {
        verificationStatus = true;
      } else {
        verificationStatus = false;
      }
    });

    return verificationStatus;
  };

  const startCreatingService = () => {
    if (!checkVerification()) {
      toast.show({
        status: 'error',
        title: 'You have to be verified\nto create service',
        placement: 'top',
      });
    } else {
      navigation.navigate('CreateServiceModalDescription');
    }
    return;
  };

  const ServiceButtons = () => (
    <HStack
      width="100%"
      padding="2"
      backgroundColor="gray.100"
      justifyContent="center"
      alignItems="center"
      space={2}
    >
      <Button
        size="lg"
        key="createServiceButton"
        onPress={startCreatingService}
        justifyContent="center"
        leftIcon={<FontAwesome5 name="plus" size={12} color="white" />}
      >
        Create
      </Button>
      <Button size="lg" key="ServicesButton" justifyContent="center">
        All Services
      </Button>
      <Button size="lg" key="MyServicesButton" justifyContent="center">
        My Services
      </Button>
    </HStack>
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
