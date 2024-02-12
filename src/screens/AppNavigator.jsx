import React, { useContext, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native'
import WordsScreen from './WordsScreen';

import WordsDetailScreen from './WordsDetailScreen';
import TabNavigator from '../ui/components/TabNavigator/TabNavigator';
import HistoryScreen from './HistoryScreen';
import FavoritesScreen from './FavoritesScreen';


const Stack = createNativeStackNavigator();


const isIOS = Platform.OS === 'ios'

function AppNavigator() {


  const ScreensComponents = [
    {
      name: 'Dictionary',
      screen: 'Words',
      component: WordsScreen,
    },
    {
      name: 'Details',
      screen: 'WordDetailScreen',
      component: WordsDetailScreen,
    },
    {
      name: 'History',
      screen: 'History',
      component: HistoryScreen,
    },
    {
      name: 'Favorites',
      screen: 'Favorites',
      component: FavoritesScreen,
    },
  ]

  return (
    <Stack.Navigator barStyle="light-content"
      screenOptions={{
        cardStyle: { backgroundColor: '#ebebeb', color: '#050505' }, // Define o estilo de fundo para cada tela
      }}
    >
      {ScreensComponents.map((e) => (
        <Stack.Screen name={e.screen}
          options={{
            title: e.name,
            headerStyle: {
              backgroundColor: '#ebebeb',
              color: '#2e2e2e'
            },
            headerTintColor: isIOS ? null : 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#2e2e2e',
            },
          }}
          component={e.component}
        />
      ))}
    </Stack.Navigator>
  );
}

export default AppNavigator;
