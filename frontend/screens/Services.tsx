import * as React from 'react';
import { View, Text, Button, HStack, useColorModeValue } from 'native-base';

import EditScreenInfo from '@/components/EditScreenInfo';
import { useAppSelector, useAppDispatch } from '@/hooks/react-redux';
import { increment, decrement, incrementByAmount } from '@/redux/counter';

export default function Services() {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const colorScheme = useColorModeValue('black', 'white');

  return (
    <View flex={1} alignItems="center" justifyContent="center">
      <Text fontSize="2xl" style={{ color: colorScheme }}>
        Services
      </Text>
      <View marginY={30} height={1} width="80%" />
      <EditScreenInfo path="/screens/Services.tsx" />
      <Text>{`Global Counter Variable :${count}`}</Text>
      <HStack space={3}>
        <Button onPress={() => dispatch(increment())}>+</Button>
        <Button onPress={() => dispatch(decrement())}>-</Button>
        <Button onPress={() => dispatch(incrementByAmount(33))}> +33 </Button>
      </HStack>
    </View>
  );
}
