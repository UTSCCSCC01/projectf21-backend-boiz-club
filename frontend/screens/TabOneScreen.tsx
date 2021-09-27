import * as React from 'react';
import { StyleSheet, Button, Alert } from 'react-native';
import { getHealth, addItem } from '@/services/backend';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { RootTabScreenProps } from '@/types';
import { useAppSelector } from '@/hooks/react-redux';

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  const count = useAppSelector((state) => state.counter.value);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pawsup</Text>
      <Text>{`Global Counter Variable :${count}`}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button
        title="Check Health of Backend"
        onPress={async () => Alert.alert(await getHealth())}
      />
      <Button
        title="Add Item to Backend"
        onPress={async () => Alert.alert(await addItem())}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
