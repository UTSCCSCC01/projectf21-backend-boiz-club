import * as React from 'react';
import {
  Box,
  Heading,
  VStack,
  Divider,
  Button,
  Image,
  HStack,
  useToast,
} from 'native-base';
import { ProductStackScreenProps } from '@/types';
import { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cart';

export default function ProductDetailModal({
  navigation,
  route,
}: ProductStackScreenProps<'ProductDetailModal'>) {
  const dispatch = useDispatch();
  const toast = useToast();
  const { product } = route.params;

  const [counterCount, setCounterCount] = useState<number>(1); // Hour for service, count for product.
  const minCount = 1;
  const maxCount = 50;

  const genericProductImages = [
    require('@/assets/images/generic_product_1.jpg'),
    require('@/assets/images/generic_product_2.jpg'),
    require('@/assets/images/generic_product_3.jpg'),
  ];

  const addProductToCart = () => {
    console.log('Added product to Cart');
    dispatch(
      addToCart({
        isService: false,
        item: product,
        count: Math.floor(counterCount),
      })
    );
    navigation.pop();
    toast.show({
      status: 'success',
      title: 'Added product to the Cart',
      placement: 'top',
    });
  };

  return (
    <Box safeArea flex={1} paddingTop="5" paddingX="10">
      <VStack space={3}>
        <Box justifyContent="space-between" flexDirection="row">
          <Heading fontSize="2xl" flex="1">
            {product.product_name}
          </Heading>
          <Box width="6" />
          <Box alignItems="flex-end">
            <Heading fontSize="2xl">{product.product_price} $CAD</Heading>
          </Box>
        </Box>
        <Box width="100%" height="50%" backgroundColor="grey">
          <Image
            source={genericProductImages[Math.floor(Math.random() * 3)]}
            size={'2xl'}
            resizeMode="cover"
            alt={'Product picture'}
            width="100%"
            height="100%"
          />
        </Box>
        <Heading fontSize="sm" fontWeight="light">
          {product.product_description}
        </Heading>
        <Divider />

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
            leftIcon={<FontAwesome5 name="minus" size={16} color="white" />}
            onPress={() => {
              setCounterCount(Math.max(counterCount - 1, minCount));
            }}
          />
          <Heading> {counterCount} </Heading>
          <Button
            leftIcon={<FontAwesome5 name="plus" size={16} color="white" />}
            onPress={() => {
              setCounterCount(Math.min(counterCount + 1, maxCount));
            }}
          />
          <Heading fontSize="xs" fontWeight="light">
            Max: {maxCount}
          </Heading>
        </HStack>
        <Button
          size="lg"
          key="MPButton"
          justifyContent="center"
          onPress={addProductToCart}
        >
          Add to Cart
        </Button>
      </VStack>
    </Box>
  );
}
