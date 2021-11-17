import * as React from 'react';
import {
  Box,
  Heading,
  VStack,
  Divider,
  Button,
  HStack,
  useToast,
} from 'native-base';
import { ServiceStackScreenProps } from '@/types';
import { Map } from '../components';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addToCart } from '@/redux/cart';

export default function ServiceDetailModal({
  navigation,
  route,
}: ServiceStackScreenProps<'ServiceDetailModal'>) {
  const { service, belongsToThisUser } = route.params;

  const dispatch = useDispatch();
  const toast = useToast();

  const [counterCount, setCounterCount] = useState<number>(1);
  const minCount = 1;
  const maxCount = 10;

  const extractDate = (
    creationDate: string | undefined,
    updateDate: string | undefined
  ) => {
    if (typeof creationDate === 'undefined') {
      return '';
    }

    let dateLine = creationDate.substring(0, 10);

    if (
      typeof updateDate !== 'undefined' &&
      updateDate.substring(0, 10) !== dateLine
    ) {
      dateLine += ' (Modified on ';
      dateLine += updateDate.substring(0, 10);
      dateLine += ')';
    }
    return dateLine;
  };

  const modifyService = () => {
    console.log('Modify Service');
    navigation.pop();
    navigation.push('ModifyServiceModal', { service: service });
  };

  const addServiceToCart = () => {
    console.log('Added service to Cart');
    dispatch(
      addToCart({
        isService: true,
        item: service,
        count: Math.floor(counterCount),
      })
    );
    navigation.pop();
    toast.show({
      status: 'success',
      title: 'Added service to the Cart',
      placement: 'top',
    });
  };

  return (
    <Box safeArea flex={1} paddingTop="5" paddingX="10">
      <VStack space="md">
        <Box justifyContent="space-between" flexDirection="row">
          <Heading fontSize="2xl" flex="1">
            {service.service_name}
          </Heading>
          <Box width="6" />
          <Box alignItems="flex-end">
            <Heading fontSize="2xl">{service.service_price} $CAD</Heading>
            <Heading fontSize="lg" pb="3">
              per Hour
            </Heading>
          </Box>
        </Box>
        <Heading fontSize="sm" fontWeight="light">
          {service.service_description}
        </Heading>
        <Heading fontSize="sm" fontWeight="light">
          {extractDate(service.createdAt, service.updatedAt)}
        </Heading>
        <Divider />
        <Heading fontSize="lg">Location</Heading>
        <Box width="100%" height="32%">
          <Map
            lat={
              typeof service.latitude !== 'undefined'
                ? parseFloat(service.latitude)
                : 43.76055603963581
            }
            long={
              typeof service.longitude !== 'undefined'
                ? parseFloat(service.longitude)
                : -79.40877280352363
            }
          />
        </Box>
        <Heading fontSize="sm" fontWeight="light">
          {service.address}
          {'\n'}
          {service.city}, {service.postal_code}
          {'\n'}
          {service.country}
        </Heading>
        <Divider />
        <Heading fontSize="lg">Contact</Heading>
        <HStack space="md" alignItems="center">
          <FontAwesome name="mobile-phone" size={24} color="black" />
          <Heading fontSize="sm" fontWeight="light">
            {service.contact_number}
          </Heading>
        </HStack>
        <Divider />
        {!belongsToThisUser ? (
          <VStack space="sm">
            <Heading fontSize="sm">Duration (hour)</Heading>
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
              <Heading>{counterCount}</Heading>
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
          </VStack>
        ) : null}
        <Button
          size="lg"
          key="MPButton"
          justifyContent="center"
          onPress={() => {
            if (belongsToThisUser) {
              modifyService();
            } else {
              addServiceToCart();
            }
          }}
        >
          {belongsToThisUser ? 'Modify Service' : 'Add to Cart'}
        </Button>
      </VStack>
    </Box>
  );
}
