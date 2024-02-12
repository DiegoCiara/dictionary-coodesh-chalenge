import React, { useContext } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { ButtonIcon, NavContainer, TextIcon } from './NavigationBarStyle';
import { Icon } from '@rneui/themed';

function NavigationBar({ navigation }) {

  const Screens = [
    {
      icon: 'book',
      label:'Dictionary',
      type: 'material',
      value: 'Words',
      size: 25
    },
    {
      icon: 'history',
      label:'History',
      type: 'font-awesome-5',
      value: 'History',
      size: 23
    },
    {
      icon: 'star',
      label:'Favorites',
      type: 'font-awesome-5',
      value: 'Favorites',
      size: 23
    },
  ]

  return (      
    <NavContainer>
      {Screens.map((e)=>(
        <ButtonIcon onPress={() => navigation.navigate(e.value)}>
          <Icon
            name={e.icon}
            type={e.type}
            size={e.size}
            color='#f8f8f8'
          />
          <TextIcon>
            {e.label}
          </TextIcon>
        </ButtonIcon>
      ))}
    </NavContainer>
  );
}

export default NavigationBar;
