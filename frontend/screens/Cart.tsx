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
  Modal,
  useToast,
} from 'native-base';
import { useAppSelector } from '@/hooks/react-redux';
import {
  CartStackParamList,
  CartStackScreenProps,
  Service,
  Product,
} from '@/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ServiceDetailModal from './ServiceDetailModal';
import { ScrollView } from 'react-native';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { changeCartCount, removeFromCart } from '@/redux/cart';
import { useDispatch } from 'react-redux';
import { FontAwesome5 } from '@expo/vector-icons';
import ProductDetailModal from './ProductDetailModal';

function CartIndexScreen({
  navigation,
}: CartStackScreenProps<'CartIndexScreen'>) {
  const dispatch = useDispatch();
  const toast = useToast();

  const services: { id: string; data: Service; count: number }[] =
    useAppSelector((state) => state.cart.services);
  const products: { id: string; data: Product; count: number }[] =
    useAppSelector((state) => state.cart.products);

  const [servicesOpen, setServicesOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [askToRemoveOpen, setAskToRemoveOpen] = useState(false);
  const [isRemoveService, setIsRemoveService] = useState(false);
  const [askToChangeCountOpen, setAskToChangeCountOpen] = useState(false);
  const [isChangeServiceCount, setIsChangeServiceCount] = useState(false);
  const [currentItemId, setCurrentItemId] = useState<string>('');

  const [counterCount, setCounterCount] = useState<number>(1); // Hour for service, count for product.
  const minCount = 1;
  const maxCount = 10;

  const genericServiceImages = [
    require('@/assets/images/generic_service_1.jpg'),
    require('@/assets/images/generic_service_2.jpg'),
    require('@/assets/images/generic_service_3.jpg'),
  ];

  const genericProductImages = [
    require('@/assets/images/generic_product_1.jpg'),
    require('@/assets/images/generic_product_2.jpg'),
    require('@/assets/images/generic_product_3.jpg'),
  ];

  const calculateServiceCost = () => {
    let cost: number = 0;
    services.forEach(
      (service) =>
        (cost += service.data.service_price
          ? +(+service.data.service_price * service.count).toFixed(2)
          : 0)
    );
    return cost;
  };

  const calculateProductCost = () => {
    let cost: number = 0;
    products.forEach(
      (product) =>
        (cost += product.data.product_price
          ? +(product.data.product_price * +product.count).toFixed(2)
          : 0)
    );
    return cost;
  };

  const calculateTotalCost = () => {
    return calculateServiceCost() + calculateProductCost();
  };

  const removeItem = () => {
    dispatch(removeFromCart({ isService: isRemoveService, id: currentItemId }));
    toast.show({
      status: 'success',
      title: isRemoveService ? 'Removed Service' : 'Removed Product',
      placement: 'top',
    });
  };

  const changeItemCount = () => {
    dispatch(
      changeCartCount({
        isService: isChangeServiceCount,
        id: currentItemId,
        newCount: counterCount,
      })
    );
    toast.show({
      status: 'success',
      title: isChangeServiceCount ? 'Changed Duration' : 'Changed Amount',
      placement: 'top',
    });
  };

  const checkoutCart = () => {
    // Navigation stuff goes here
    console.log('Checkout');
  };

  const displayServiceDetail = async (service: Service) => {
    navigation.navigate('CartServiceDetailModal', {
      service: service,
      belongsToThisUser: false,
      openedFromCart: true,
    });
    return;
  };
  const displayProductDetail = async (product: Product) => {
    navigation.navigate('CartProductDetailModal', {
      product: product,
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
                      <VStack space="2xs">
                        <Heading fontSize="xl">
                          {service.data.service_name}
                        </Heading>
                        <Heading fontSize="lg" fontWeight="normal">
                          Duration: {service.count} hours
                        </Heading>
                        <Heading fontSize="lg" fontWeight="normal">
                          ({service.data.service_price} CAD$ per hour)
                        </Heading>
                      </VStack>
                      <HStack space="md">
                        <Button
                          size="lg"
                          key="removeService"
                          onPress={() => {
                            setAskToRemoveOpen(true);
                            setIsRemoveService(true);
                            setCurrentItemId(service.id);
                          }}
                          justifyContent="center"
                          variant="subtle"
                          leftIcon={
                            <Feather name="trash-2" size={24} color="orange" />
                          }
                        />
                        <Button
                          size="lg"
                          key="changeServiceCount"
                          onPress={() => {
                            setAskToChangeCountOpen(true);
                            setIsChangeServiceCount(true);
                            setCurrentItemId(service.id);
                            setCounterCount(service.count);
                          }}
                          justifyContent="center"
                          variant="subtle"
                        >
                          Set Duration
                        </Button>
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

  const DisplayProducts = () => (
    <View alignItems="center" width={'100%'}>
      {products.map((product, index) => {
        return (
          <Pressable
            key={index}
            width={'100%'}
            onPress={() => displayProductDetail(product.data)}
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
                          genericProductImages[Math.floor(Math.random() * 3)]
                        }
                        size={'xl'}
                        resizeMode="cover"
                        alt={'Service picture'}
                      />
                    </Box>
                    <VStack justifyContent="space-between">
                      <VStack space="2xs">
                        <Heading fontSize="xl">
                          {product.data.product_name}
                        </Heading>
                        <Heading fontSize="lg" fontWeight="normal">
                          Count: {product.count}
                        </Heading>
                        <Heading fontSize="lg" fontWeight="normal">
                          ({product.data.product_price} CAD$ per item)
                        </Heading>
                      </VStack>
                      <HStack space="md">
                        <Button
                          size="lg"
                          key="removeProduct"
                          onPress={() => {
                            setAskToRemoveOpen(true);
                            setIsRemoveService(false);
                            setCurrentItemId(product.id);
                          }}
                          justifyContent="center"
                          variant="subtle"
                          leftIcon={
                            <Feather name="trash-2" size={24} color="orange" />
                          }
                        />
                        <Button
                          size="lg"
                          key="changeProductCount"
                          onPress={() => {
                            setAskToChangeCountOpen(true);
                            setIsChangeServiceCount(false);
                            setCurrentItemId(product.id);
                            setCounterCount(product.count);
                          }}
                          justifyContent="center"
                          variant="subtle"
                        >
                          Set Count
                        </Button>
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
      <Button size="lg" key="checkout" onPress={checkoutCart}>
        Checkout
      </Button>
    </HStack>
  );

  return (
    <View flex="1" justifyContent="space-between">
      <Modal
        isOpen={askToRemoveOpen}
        onClose={() => {
          setAskToRemoveOpen(false);
        }}
        size="xl"
        key="remove"
      >
        <Modal.Content padding="3">
          <Modal.Body>
            <Heading fontSize="lg">
              Are you sure you want to remove this{' '}
              {isRemoveService ? 'service' : 'product'}?
            </Heading>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space="md" size="lg">
              <Button
                colorScheme="teal"
                onPress={() => {
                  setAskToRemoveOpen(false);
                  removeItem();
                }}
              >
                Yes
              </Button>
              <Button
                colorScheme="danger"
                onPress={() => {
                  setAskToRemoveOpen(false);
                }}
              >
                No
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Modal
        isOpen={askToChangeCountOpen}
        onClose={() => {
          setAskToChangeCountOpen(false);
        }}
        size="xl"
        key="changeCount"
      >
        <Modal.Content padding="3">
          <Modal.Body>
            <VStack width="100%" space="md">
              <Heading fontSize="lg">
                Please specify{' '}
                {isChangeServiceCount
                  ? 'the number of hours you want to benefit from this service'
                  : 'the amount you want to buy this product'}
              </Heading>
              <HStack
                justifyContent="center"
                alignItems="center"
                width="100%"
                space="md"
              >
                <Heading fontSize="xs" fontWeight="light">
                  Min: {minCount}
                </Heading>
                <Button
                  leftIcon={
                    <FontAwesome5 name="minus" size={16} color="white" />
                  }
                  onPress={() => {
                    setCounterCount(Math.max(counterCount - 1, minCount));
                  }}
                />
                <Heading> {counterCount} </Heading>
                <Button
                  leftIcon={
                    <FontAwesome5 name="plus" size={16} color="white" />
                  }
                  onPress={() => {
                    setCounterCount(Math.min(counterCount + 1, maxCount));
                  }}
                />
                <Heading fontSize="xs" fontWeight="light">
                  Max: {maxCount}
                </Heading>
              </HStack>
            </VStack>
          </Modal.Body>

          <Modal.Footer>
            <Button.Group space="md" size="lg">
              <Button
                colorScheme="teal"
                onPress={() => {
                  setAskToChangeCountOpen(false);
                  changeItemCount();
                }}
              >
                Confirm
              </Button>
              <Button
                colorScheme="danger"
                onPress={() => {
                  setAskToChangeCountOpen(false);
                }}
              >
                Cancel
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

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
            {products.length === 0 ? (
              <Heading fontSize="md">No Products in the Cart</Heading>
            ) : (
              <Box>
                <Button
                  size="lg"
                  key="ProductToggle"
                  justifyContent="flex-start"
                  onPress={() => {
                    setProductsOpen(!productsOpen);
                  }}
                >
                  {productsOpen ? 'Hide Products' : 'See Products'}
                </Button>
                <Collapse isOpen={productsOpen}>
                  <DisplayProducts />
                  <Heading fontSize="md">
                    {products.length === 0 ? 'No Products in the Cart' : ''}
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
                Products Subtotal : {String(calculateProductCost())} CAD$
              </Heading>
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
      <CartStack.Screen
        name="CartProductDetailModal"
        component={ProductDetailModal}
        options={{ headerShown: false, presentation: 'modal' }}
      />
    </CartStack.Navigator>
  );
}
