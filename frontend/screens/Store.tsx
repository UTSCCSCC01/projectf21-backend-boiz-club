import * as React from 'react';
import {
  View,
  Text,
  HStack,
  Button,
  Pressable,
  Box,
  VStack,
  Image,
} from 'native-base';
import { RefreshControl, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { getProducts } from '@/services/products';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetailModal from './ProductDetailModal';
import {
  ProductStackParamList,
  Product,
  ProductStackScreenProps,
} from '@/types';
const genericProductImages = [
  require('@/assets/images/generic_product_1.jpg'),
  require('@/assets/images/generic_product_2.jpg'),
  require('@/assets/images/generic_product_3.jpg'),
];
function ProductIndexScreen({
  navigation,
}: ProductStackScreenProps<'ProductIndexScreen'>) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [products, setProducts] = React.useState<Product[]>([]);

  const updateProducts = async () => {
    const newProducts = await getProducts();
    setProducts([...newProducts]);
    setIsLoading(false);
  };
  React.useEffect(() => {
    updateProducts();
  }, []);
  const DisplayProducts = () => {
    return (
      <View flex={1} alignItems="center" width={'100%'}>
        {products.map((product, index) => {
          return (
            <Pressable
              key={index}
              width={'100%'}
              onPress={() =>
                navigation.navigate('ProductDetailModal', {
                  product,
                })
              }
            >
              {({ isPressed }) => {
                return (
                  <Box
                    p="5"
                    rounded="8"
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
                    pl="4"
                    pr="5"
                    py="2"
                  >
                    <HStack space={3} justifyContent="space-between">
                      <VStack maxWidth="40%">
                        <Image
                          source={
                            genericProductImages[Math.floor(Math.random() * 3)]
                          }
                          size={'xl'}
                          resizeMode="cover"
                          alt={'Product picture'}
                        />
                      </VStack>
                      <VStack maxWidth="60%" flex={1}>
                        <HStack space={3} justifyContent="space-between">
                          <Text
                            _dark={{
                              color: 'warmGray.50',
                            }}
                            color="coolGray.800"
                            bold
                          >
                            {product.product_name}
                          </Text>
                          <Text
                            noOfLines={3}
                            fontSize="xs"
                            _dark={{
                              color: 'warmGray.50',
                            }}
                            color="coolGray.800"
                            alignSelf="flex-start"
                          >
                            {'$'}
                            {product.product_price}
                          </Text>
                        </HStack>
                        <HStack space={3} justifyContent="space-between">
                          <Text
                            color="coolGray.600"
                            _dark={{
                              color: 'warmGray.200',
                            }}
                          >
                            {product.product_description}
                          </Text>
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
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={updateProducts} />
      }
      stickyHeaderIndices={[0]}
    >
      <DisplayProducts />
    </ScrollView>
  );
}

const ProductStack = createNativeStackNavigator<ProductStackParamList>();
createNativeStackNavigator();
export default function Products() {
  return (
    <ProductStack.Navigator>
      <ProductStack.Screen
        name="ProductIndexScreen"
        component={ProductIndexScreen}
        options={{ headerShown: false }}
      />
      <ProductStack.Group screenOptions={{ presentation: 'modal' }}>
        <ProductStack.Screen
          name="ProductDetailModal"
          component={ProductDetailModal}
          options={{ headerShown: false, presentation: 'modal' }}
        />
      </ProductStack.Group>
    </ProductStack.Navigator>
  );
}
