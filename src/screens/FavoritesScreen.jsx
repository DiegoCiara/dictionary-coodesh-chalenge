import React, { useState, useEffect } from 'react';
import { Text, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WordsPage } from '../ui/pagesStyles/wordsStyle';
import { Loading } from '../ui/components/Loading/Loading';
import FavoriteList from '../ui/components/FavoriteList/FavoriteList';
import { useDictionary } from '../services/hooks/dictionaryHook';



const FavoritesScreen = ({ navigation }) => {
  const { favorites, loading } = useDictionary();

  if (loading) {
    return <Loading size="large" />;
  }

  return (
    <>
      <WordsPage style={{ flex: 1 }}>
        {favorites.length === 0 ? (
          <Text>No favorites have been added</Text>
        ) : (
          <FavoriteList
            navigation={navigation}
            words={favorites}
          />
        )}
      </WordsPage>
    </>
  );
};

export default FavoritesScreen;
