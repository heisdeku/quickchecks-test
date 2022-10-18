import * as React from 'react';
import {Button, Text} from 'react-native-paper';
import {View} from 'react-native';

const WelcomeScreen = () => {
  return (
    <View>
      <Text variant="displayMedium">Welcome to the List Screen</Text>
      <Button>Refresh the Page to see more</Button>
    </View>
  );
};

export default WelcomeScreen;
