import * as React from 'react';
import { Box, Heading, VStack, Divider } from 'native-base';
import { ServiceStackScreenProps } from '@/types';
import { Map } from '../components';

export default function ServiceDetailModal({
  route,
}: ServiceStackScreenProps<'ServiceDetailModal'>) {
  const { service } = route.params;

  console.log('----------');
  //console.log(service._id);
  //console.log(service.user_id);
  //console.log(service.verified);
  //console.log(service.createdAt);
  //console.log(service.updatedAt);
  console.log(service.service_name); //
  console.log(service.service_description); //
  console.log(service.service_price); //
  console.log(service.contact_number);
  console.log(service.country); //
  console.log(service.city); //
  console.log(service.postal_code); //
  console.log(service.address); //

  return (
    <Box safeArea flex={1} paddingTop="5" paddingX="10">
      <VStack space={3}>
        <Box justifyContent="space-between" flexDirection="row">
          <Heading fontSize="2xl" pb="3" flex="1">
            {service.service_name}
          </Heading>
          <Box width="10" />
          <Heading fontSize="2xl" pb="3">
            {service.service_price} $CAD/hour
          </Heading>
        </Box>
        <Heading fontSize="sm" fontWeight="light">
          {service.service_description}
        </Heading>
        <Divider />
        <Heading fontSize="lg">Location</Heading>
        <Box width="100%" height="40%">
          <Map lat={43.65107} long={-79.347015} />
        </Box>
        <Heading fontSize="sm" fontWeight="light">
          {service.address}
          {'\n'}
          {service.city}, {service.postal_code}
          {'\n'}
          {service.country}
        </Heading>
        <Divider />
      </VStack>
    </Box>
  );
}
