import * as React from 'react';
import {
  Box,
  Button,
  Heading,
  HStack,
  Slider,
  useToast,
  VStack,
} from 'native-base';
import { ProductStackScreenProps } from '@/types';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cart';
import { useState } from 'react';

export default function ProductSetCount({
  navigation,
  route,
}: ProductStackScreenProps<'ProductSetCount'>) {
  const dispatch = useDispatch();
  const toast = useToast();
  const { product } = route.params;

  const [sliderCount, setSliderCount] = useState<number>(1);
  const minCount = 1;
  const maxCount = 10;

  const addProductToCart = () => {
    console.log('Added product to Cart');
    dispatch(
      addToCart({
        isService: false,
        item: product,
        count: Math.floor(sliderCount),
      })
    );
    navigation.pop();
    toast.show({
      status: 'success',
      title: 'Added product to the Cart',
      placement: 'top',
    });
  };

  const cancel = () => {
    navigation.pop();

    navigation.navigate('ProductDetailModal', {
      product: product,
      openedFromCart: false,
    });
  };

  return (
    <Box safeArea flex={1} paddingTop="5" paddingX="10">
      <VStack space="2xl">
        <Heading fontSize="md">
          Please specify the amount you want to buy this product.
        </Heading>

        <Box w="100%">
          <HStack
            justifyContent="space-between"
            alignItems="flex-end"
            width="100%"
          >
            <Heading fontSize="xs" fontWeight="light">
              {minCount}
            </Heading>
            <Heading> {sliderCount} </Heading>
            <Heading fontSize="xs" fontWeight="light">
              {maxCount}
            </Heading>
          </HStack>

          <Box w="100%">
            <Slider
              defaultValue={1}
              minValue={minCount}
              maxValue={maxCount}
              accessibilityLabel="Count"
              step={1}
              onChange={(count) => {
                setSliderCount(Math.floor(count));
              }}
            >
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb />
            </Slider>
          </Box>
        </Box>

        <VStack space="md">
          <Button
            size="lg"
            key="AddToCart"
            justifyContent="center"
            onPress={addProductToCart}
          >
            Add to Cart
          </Button>

          <Button
            size="lg"
            key="Cancel"
            justifyContent="center"
            onPress={cancel}
          >
            Cancel
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
}
