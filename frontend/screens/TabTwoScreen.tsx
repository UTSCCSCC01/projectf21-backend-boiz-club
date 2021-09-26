import * as React from 'react';
import { StyleSheet, Button } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useAppSelector, useAppDispatch } from '../hooks/react-redux'
import {increment, decrement, incrementByAmount} from '../stores/counter'

export default function TabTwoScreen() {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
      <Text>{`Global Counter Variable :${count}`}</Text>
      <Button title={"+"} onPress={()=>dispatch(increment())}/>
      <Button title={"-"} onPress={()=>dispatch(decrement())}/>
      <Button title={"+33"} onPress={()=>dispatch(incrementByAmount(33))}/>

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
