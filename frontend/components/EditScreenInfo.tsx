import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View } from 'native-base';

import { MonoText } from './StyledText';

export default function EditScreenInfo({ path }: { path: string }) {
  return (
    <View padding={10}>
      <View alignItems="center" marginY={50}>
        <Text fontSize={17} lineHeight={24} textAlign="center">
          Open up the code for this screen:
        </Text>

        <View marginY={7}>
          <MonoText>{path}</MonoText>
        </View>

        <Text fontSize={17} lineHeight={24} textAlign="center">
          Change any of the text, save the file, and your app will automatically
          update.
        </Text>
      </View>

      <View marginTop={15} marginX={0} alignItems="center">
        <TouchableOpacity onPress={handleHelpPress}>
          <Text textAlign="center" style={{ color: 'blue' }}>
            Tap here if your app doesn't automatically update after making
            changes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet'
  );
}
