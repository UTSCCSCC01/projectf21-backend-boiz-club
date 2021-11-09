import * as React from 'react';
import {
  Box,
  HStack,
  Pressable,
  View,
  VStack,
  Image,
  Heading,
  Collapse,
  Button,
} from 'native-base';
import { useAppSelector } from '@/hooks/react-redux';
import { CartStackParamList, CartStackScreenProps, Service } from '@/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ServiceDetailModal from './ServiceDetailModal';
import { ScrollView } from 'react-native';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';

function CartIndexScreen({
  navigation,
}: CartStackScreenProps<'CartIndexScreen'>) {
  // const dispatch = useDispatch(); // Will be used to remove items.
  const services: { id: string; data: Service }[] = useAppSelector(
    (state) => state.cart.services
  );
  const products;
  // const products: { id: string; data: Product }[] = useAppSelector(
  //   (state) => state.cart.products
  // );

  const [servicesOpen, setServicesOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const genericServiceImages = [
    require('@/assets/images/generic_service_1.jpg'),
    require('@/assets/images/generic_service_2.jpg'),
    require('@/assets/images/generic_service_3.jpg'),
  ];

  const calculateServiceCost = () => {
    let cost: number = 0;
    services.forEach(
      (service) =>
        (cost += service.data.service_price
          ? Math.floor(service.data.service_price)
          : 0)
    );
    return cost;
  };

  const calculateTotalCost = () => {
    return calculateServiceCost();
  };

  const purchaseCart = () => {
    // Navigation stuff goes here
    console.log('Purchase');
  };

  const displayServiceDetail = async (service: Service) => {
    navigation.navigate('CartServiceDetailModal', {
      service: service,
      belongsToThisUser: false,
      openedFromCart: true,
    });
    return;
  };

  const DisplayServices = () => (
    <View alignItems="center" width={'100%'}>
      {services.map((service, index) => {
        return (
          <Pressable
            key={index}
            width={'100%'}
            onPress={() => displayServiceDetail(service.data)}
          >
            {({ isPressed }) => {
              return (
                <Box
                  p="2"
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
                >
                  <HStack space={3}>
                    <Box>
                      <Image
                        source={
                          genericServiceImages[Math.floor(Math.random() * 3)]
                        }
                        size={'xl'}
                        resizeMode="cover"
                        alt={'Service picture'}
                      />
                    </Box>
                    <VStack justifyContent="space-between">
                      <VStack space={3}>
                        <Heading fontSize="xl">
                          {service.data.service_name}
                        </Heading>
                        <Heading fontSize="xl">
                          {service.data.service_price} $
                        </Heading>
                      </VStack>
                      <Box justifyContent="flex-end">
                        <Feather name="trash-2" size={24} color="orange" />
                      </Box>
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

  const DisplayProducts = () => (
    <View alignItems="center" width={'100%'}>
      <Heading>No Products...yet...</Heading>
    </View>
  );

  const TotalCostBar = () => (
    <HStack
      width="100%"
      backgroundColor="white"
      p="5"
      space="md"
      alignItems="center"
      justifyContent="space-between"
    >
      <Heading fontSize="xl">
        Total Cost: {String(calculateTotalCost())} CAD$
      </Heading>
      <Button size="lg" key="purchase" onPress={purchaseCart}>
        Purchase
      </Button>
    </HStack>
  );

  return (
    <View flex="1" justifyContent="space-between">
      <ScrollView>
        <VStack margin="5" space="md" height="90%">
          <VStack space="sm">
            <Heading fontSize="2xl">Services</Heading>
            {services.length === 0 ? (
              <Heading fontSize="md">No Services in the Cart</Heading>
            ) : (
              <Box>
                <Button
                  size="lg"
                  key="ServiceToggle"
                  justifyContent="flex-start"
                  onPress={() => {
                    setServicesOpen(!servicesOpen);
                  }}
                >
                  {servicesOpen ? 'Hide Services' : 'See Services'}
                </Button>
                <Collapse isOpen={servicesOpen}>
                  <DisplayServices />
                  <Heading fontSize="md">
                    {services.length === 0 ? 'No Services in the Cart' : ''}
                  </Heading>
                </Collapse>
              </Box>
            )}

            <Box
              borderBottomWidth="2"
              borderColor="coolGray.200"
              paddingBottom="1"
              alignItems="flex-end"
            >
              <Heading fontSize="xl">
                Services Subtotal : {String(calculateServiceCost())} CAD$
              </Heading>
            </Box>
          </VStack>

          <VStack space="sm">
            <Heading fontSize="2xl">Products</Heading>
            {services.length === 0 ? (
              <Heading fontSize="md">No Products in the Cart</Heading>
            ) : (
              <Box>
                <Button
                  size="lg"
                  key="ServiceToggle"
                  justifyContent="flex-start"
                  onPress={() => {
                    setProductsOpen(!productsOpen);
                  }}
                >
                  {productsOpen ? 'Hide Products' : 'See Products'}
                </Button>
                <Collapse isOpen={productsOpen}>
                  <DisplayProducts />
                  {/* <Heading fontSize="md">
                  {products.length === 0 ? 'No Products in the Cart' : ''}
                </Heading> */}
                </Collapse>
              </Box>
            )}

            <Box
              borderBottomWidth="2"
              borderColor="coolGray.200"
              paddingBottom="1"
              alignItems="flex-end"
            >
              <Heading fontSize="xl">Products Total</Heading>
            </Box>
          </VStack>
        </VStack>
      </ScrollView>
      <Box>
        <TotalCostBar />
      </Box>
    </View>
  );
}

const CartStack = createNativeStackNavigator<CartStackParamList>();
createNativeStackNavigator();
export default function Cart() {
  return (
    <CartStack.Navigator>
      <CartStack.Screen
        name="CartIndexScreen"
        component={CartIndexScreen}
        options={{ headerShown: false }}
      />
      <CartStack.Screen
        name="CartServiceDetailModal"
        component={ServiceDetailModal}
        options={{ headerShown: false, presentation: 'modal' }}
      />
    </CartStack.Navigator>
  );
}
