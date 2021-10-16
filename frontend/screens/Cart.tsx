import * as React from 'react';
import { Text, View } from 'native-base';
import { Map } from '../components';

export default function Cart() {
  return (
    <View flex={1} alignItems="center" justifyContent="center">
      <Text fontSize="2xl">Cart</Text>
      <View marginY={30} height={1} width="80%" />
      {/* <EditScreenInfo path="/screens/Cart.tsx" /> */}
      <Map />
    </View>
  );
}
