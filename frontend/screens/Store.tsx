import * as React from 'react';
import { View, Text } from 'native-base';

import EditScreenInfo from '@/components/EditScreenInfo';
export default function Store() {
  return (
    <View flex={1} alignItems="center" justifyContent="center">
      <Text fontSize="2xl">Store</Text>
      <View marginY={30} height={1} width="80%" />
      <EditScreenInfo path="/screens/Store.tsx" />
    </View>
  );
}
