import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

const FavoriteList = ({ navigation, words }) => {


  const handlePress = async (item) => {  
    navigation.navigate('WordDetailScreen', { word: item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <Text style={{ fontSize: 18 }}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={words}
      renderItem={renderItem}
      keyExtractor={(item) => item}
    />
  );
};

export default FavoriteList;
