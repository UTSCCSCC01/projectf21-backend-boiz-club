import * as React from 'react';
import {
  Button,
  HStack,
  Text,
  useToast,
  Pressable,
  Box,
  VStack,
  Image,
  View,
} from 'native-base';
import {
  ServiceStackParamList,
  ServiceStackScreenProps,
  Service,
} from '@/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RefreshControl, ScrollView } from 'react-native';
import CreateServiceModalDescription from './CreateServiceModalDescription';
import CreateServiceModalContact from './CreateServiceModalContact';
import ServiceDetailModal from './ServiceDetailModal';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAppSelector } from '@/hooks/react-redux';
import { whoAmI } from '@/services/account';
import { getVerifiedServices } from '@/services/services';

function ServicesIndexScreen({
  navigation,
}: ServiceStackScreenProps<'ServiceIndexScreen'>) {
  const [isLoading, setIsLoading] = React.useState(true);
  const token = useAppSelector((state) => state.userCredential.userToken);
  const toast = useToast();
  const [services, setServices] = React.useState<Service[]>([]);

  const updateServices = async () => {
    setIsLoading(true);

    const verifiedServices = await getVerifiedServices();
    setServices(verifiedServices);

    setIsLoading(false);
  };

  React.useEffect(() => {
    updateServices();
  }, []);

  const displayDetail = async (service: Service) => {
    navigation.navigate('ServiceDetailModal', {
      service: service,
    });
    return;
  };

  const DisplayServices = () => (
    <View flex={1} alignItems="center" width={'100%'}>
      {services.map((service, index) => {
        return (
          <Pressable
            key={index}
            width={'100%'}
            onPress={() => displayDetail(service)}
          >
            {({ isPressed }) => {
              return (
                <Box
                  p="5"
                  rounded="8"
                  style={{
                    transform: [
                      {
                        scale: isPressed ? 0.96 : 1,
                      },
                    ],
                  }}
                  borderBottomWidth="1"
                  _dark={{
                    borderColor: 'gray.600',
                  }}
                  borderColor="coolGray.200"
                  pl="4"
                  pr="5"
                  py="2"
                >
                  <HStack space={3} justifyContent="space-between">
                    <VStack maxWidth="40%">
                      <Image
                        backgroundColor="grey"
                        size={'xl'}
                        resizeMode="contain"
                        alt={'Service picture'}
                      />
                    </VStack>
                    <VStack maxWidth="60%" flex={1}>
                      <HStack space={3} justifyContent="space-between">
                        <Text
                          _dark={{
                            color: 'warmGray.50',
                          }}
                          color="coolGray.800"
                          bold
                        >
                          {service.service_name}
                        </Text>
                        <Text
                          noOfLines={3}
                          fontSize="xs"
                          _dark={{
                            color: 'warmGray.50',
                          }}
                          color="coolGray.800"
                          alignSelf="flex-start"
                        >
                          {'$'}
                          {service.service_price}
                        </Text>
                      </HStack>
                      <HStack space={3} justifyContent="space-between">
                        <Text
                          color="coolGray.600"
                          _dark={{
                            color: 'warmGray.200',
                          }}
                        >
                          {service.service_description}
                        </Text>
                      </HStack>
                    </VStack>
                  </HStack>
                </Box>
              );
            }}
          </Pressable>
        );
      })}
    </View>
  );

  const checkVerification = async () => {
    return whoAmI(token).then((res) => {
      return res.data.authentication_lvl !== 'unverified';
    });
  };

  const startCreatingService = async () => {
    if (!(await checkVerification())) {
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
        <ServiceStack.Screen
          name="ServiceDetailModal"
          component={ServiceDetailModal}
          options={{ headerShown: false }}
        />
      </ServiceStack.Group>
    </ServiceStack.Navigator>
  );
}
