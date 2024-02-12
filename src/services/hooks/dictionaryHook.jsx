import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";

export const useDictionary = () => {
  const [words, setWords] = useState([]);
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      await loadWords();
      readStoredData();
    }
    fetchData();
    fetchHistory()    
    fetchFavorites();
    }, []);

  async function loadWords() {
    try {
      const response = await axios.get('https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json');
      const jsonString = JSON.stringify(response.data);
      await AsyncStorage.setItem('largeJsonData', jsonString);
    } catch (error) {
      console.error(error);
    }
  }

  async function readStoredData() {
    try {
      const jsonString = await AsyncStorage.getItem('largeJsonData');
      const jsonData = JSON.parse(jsonString || '{}');
      const wordsArray = Object.keys(jsonData).map(key => ({
        key: key,
        value: jsonData[key],
      }));
      setWords(wordsArray);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchHistory = async () => {
    try {
      const historyJson = await AsyncStorage.getItem('searchHistory');
      const history = historyJson ? JSON.parse(historyJson) : [];
      const reversedHistory = [...history].reverse();
      setHistory(reversedHistory);
    } catch (error) {
      console.log(error);
    }
  };

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

  return {
    words,
    history,
    favorites,
    loading,
    loadWords
  };
};
