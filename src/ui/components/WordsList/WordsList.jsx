import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WordsList = ({ navigation, words }) => {


  const handlePress = async (item) => {  
    const newItem = { key: item?.key, ...item };
    const currentHistoryJson = await AsyncStorage.getItem('searchHistory');
    const currentHistory = currentHistoryJson ? JSON.parse(currentHistoryJson) : [];
    const index = currentHistory.findIndex((historyItem) => historyItem?.key === item?.key);

    if (index === -1) { 
      const updatedHistory = [...currentHistory, newItem];
      await AsyncStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    }
    navigation.navigate('WordDetailScreen', { word: item.key });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <Text style={{ fontSize: 18 }}>{item.key}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={words}
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
    />
  );
};

export default WordsList;
