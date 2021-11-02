import * as React from 'react';
import { Box, Heading, VStack, Divider, Button, HStack } from 'native-base';
import { ServiceStackScreenProps } from '@/types';
import { Map } from '../components';
import { FontAwesome } from '@expo/vector-icons';

export default function ServiceDetailModal({
  route,
}: ServiceStackScreenProps<'ServiceDetailModal'>) {
  const { service } = route.params;

  console.log('----------');
  //console.log(service._id);
  //console.log(service.user_id);
  //console.log(service.verified);
  console.log(service.createdAt);
  console.log(service.updatedAt);
  console.log(service.service_name);
  console.log(service.service_description);
  console.log(service.service_price);
  console.log(service.contact_number);
  console.log(service.country);
  console.log(service.city);
  console.log(service.postal_code);
  console.log(service.address);
  console.log(service.latitude);
  console.log(service.longitude);

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

  return (
    <Box safeArea flex={1} paddingTop="5" paddingX="10">
      <VStack space={3}>
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
        <HStack space="3" alignItems="center">
          <FontAwesome name="mobile-phone" size={24} color="black" />
          <Heading fontSize="sm" fontWeight="light">
            {service.contact_number}
          </Heading>
        </HStack>
        <Divider />
        <Button size="lg" key="PurchaseServiceButton" justifyContent="center">
          Purchase Service
        </Button>
      </VStack>
    </Box>
  );
}
