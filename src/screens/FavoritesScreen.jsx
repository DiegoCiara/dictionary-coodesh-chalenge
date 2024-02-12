import React, { useState, useEffect } from 'react';
import { Text, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WordsPage } from '../ui/pagesStyles/wordsStyle';
import { Loading } from '../ui/components/Loading/Loading';
import FavoriteList from '../ui/components/FavoriteList/FavoriteList';



const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const favoritesJson = await AsyncStorage.getItem('favorites');
      const favoritesList = favoritesJson ? JSON.parse(favoritesJson) : [];
      setFavorites(favoritesList);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading size="large" />;
  }

  return (
    <>
      <WordsPage style={{ flex: 1 }}>
        {favorites.length === 0 ? (
          <Text>Nenhum favorito adicionado.</Text>
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
