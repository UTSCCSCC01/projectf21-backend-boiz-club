import * as React from 'react';
import MapView, { Circle } from 'react-native-maps';
import { StyleSheet } from 'react-native';

interface Props {
  lat: number; // latitude of coordinate to render
  long: number; // longitude of coordinate to render
  radius?: number; // radius (meters) of circle buffer to draw (default 200 meters)
}

const Map = ({ lat, long, radius = 200 }: Props) => {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 43.76055603963581,
        longitude: -79.40877280352363,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      <Circle
        center={{ latitude: lat, longitude: long }}
        radius={radius}
        strokeColor={'rgba(159, 191, 223, 0.5)'}
        fillColor={'rgba(159, 191, 223, 0.5)'}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
