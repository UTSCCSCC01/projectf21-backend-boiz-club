import * as React from 'react';
import { Box, Heading, VStack } from 'native-base';
import { ServiceStackScreenProps } from '@/types';

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
  console.log(service.service_price);
  console.log(service.contact_number);
  console.log(service.country); //
  console.log(service.city); //
  console.log(service.postal_code); //
  console.log(service.address);

  // {service.city}, {service.postal_code}, {service.country}

  return (
    <Box safeArea flex={1} paddingTop="5" paddingX="10">
      <VStack space={3}>
        <Box justifyContent="space-between" flexDirection="row">
          <Heading fontSize="xl" pb="3" flex="1">
            {service.service_name}
          </Heading>
          <Box width="10" />
          <Heading fontSize="xl" pb="3">
            {service.service_price} $CAD/hour
          </Heading>
        </Box>
        <Heading fontSize="sm" fontWeight="light">
          {service.service_description}
        </Heading>
      </VStack>
    </Box>
  );
}
