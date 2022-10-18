import React from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/stacks/Root';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle={'light-content'} />
        <RootStack />
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
