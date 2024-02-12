import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/screens/AppNavigator.jsx';

function App() {
  return (
    <NavigationContainer>
      <AppNavigator/>
    </NavigationContainer>
  );
}

export default App;
