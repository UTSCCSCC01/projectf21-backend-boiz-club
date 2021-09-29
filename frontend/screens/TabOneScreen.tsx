import * as React from 'react';
import { View, Button, HStack, Text } from 'native-base';
import { getHealth, addItem } from '@/services/backend';

import { RootTabScreenProps } from '@/types';
import { useAppSelector } from '@/hooks/react-redux';
import { Alert } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  const count = useAppSelector((state) => state.counter.value);
  return (
    <View flex={1} alignItems="center" justifyContent="center">
      <Text fontSize="lg" bold>Pawsup</Text>
      <Text fontSize="md">{`Global Counter Variable :${count}`}</Text>
      <View marginY={30} height={1} width="80%" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      <HStack space={2}>
        <Button onPress={async () => Alert.alert(await getHealth())}>
          Check Health of Backend
        </Button>
        <Button onPress={async () => Alert.alert(await addItem())}>
          Add Item to Backend
        </Button>
      </HStack>
    </View>
  );
}
