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
import { ServiceStackScreenProps } from '@/types';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cart';
import { useState } from 'react';

export default function ServiceSetCount({
  navigation,
  route,
}: ServiceStackScreenProps<'ServiceSetCount'>) {
  const dispatch = useDispatch();
  const toast = useToast();
  const { service } = route.params;

  const [sliderCount, setSliderCount] = useState<number>(1); // Hour for service, count for product.
  const minCount = 1;
  const maxCount = 10;

  const addServiceToCart = () => {
    console.log('Added service to Cart');
    dispatch(
      addToCart({
        isService: true,
        item: service,
        count: Math.floor(sliderCount),
      })
    );
    navigation.pop();
    toast.show({
      status: 'success',
      title: 'Added service to the Cart',
      placement: 'top',
    });
  };

  const cancel = () => {
    navigation.pop();

    navigation.navigate('ServiceDetailModal', {
      service: service,
      belongsToThisUser: false,
      openedFromCart: false,
    });
  };

  return (
    <Box safeArea flex={1} paddingTop="5" paddingX="10">
      <VStack space="2xl">
        <Heading fontSize="md">
          Please specify the number of hours you want to benefit from this
          service from the slider below.
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
              accessibilityLabel="Hour"
              step={1}
              onChange={(hour) => {
                setSliderCount(Math.floor(hour));
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
            onPress={addServiceToCart}
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
