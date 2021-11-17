import * as React from 'react';
import { Button, HStack, Text } from 'native-base';
import { getHealth } from '@/services/backend';

import { useAppSelector } from '@/hooks/react-redux';
import { Alert, View } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';

export default function Home() {
  const count = useAppSelector((state) => state.counter.value);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text fontSize="lg" bold>
        Pawsup
      </Text>

      <Text fontSize="md">{`Global Counter Variable :${count}`}</Text>
      <View marginY={30} height={1} width="80%" />
      <EditScreenInfo path="/screens/Home.tsx" />
      <HStack space={2}>
        <Button onPress={async () => Alert.alert(await getHealth())}>
          Check Health of Backend
        </Button>
      </HStack>
    </View>
  );
}
