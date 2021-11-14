import * as React from 'react';
import {
  Box,
  Heading,
  VStack,
  Divider,
  Button,
  HStack,
  Text,
  Image,
} from 'native-base';
import { ProductStackScreenProps } from '@/types';
import { Map } from '../components';
import { FontAwesome } from '@expo/vector-icons';
import { View } from '@/components/Themed';

export default function ProductDetailModal({
  navigation,
  route,
}: ProductStackScreenProps<'ProductDetailModal'>) {
  const { product } = route.params;
  const genericProductImages = [
    require('@/assets/images/generic_service_1.jpg'),
    require('@/assets/images/generic_service_2.jpg'),
    require('@/assets/images/generic_service_3.jpg'),
  ];
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
        <Box width="100%" height="50%" style={{ backgroundColor: 'grey' }}>
          <Image
            source={genericProductImages[Math.floor(Math.random() * 3)]}
            size={'2xl'}
            resizeMode="cover"
            alt={'Product picture'}
            style={{ width: '100%', height: '100%' }}
          />
        </Box>
        <Heading fontSize="sm" fontWeight="light">
          {product.product_description}
        </Heading>
        <Divider />
        <Button
          size="lg"
          key="MPButton"
          justifyContent="center"
          onPress={() => {
            console.log('Purchase Product');
          }}
        >
          {'Purchase Product'}
        </Button>
      </VStack>
    </Box>
  );
}
