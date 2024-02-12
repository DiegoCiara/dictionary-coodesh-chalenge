import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";

export const useDictionary = () => {
  const [words, setWords] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await loadWords();
      readStoredData();
    }
    fetchData();
    fetchHistory()
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
      console.log(history)        
      const reversedHistory = [...history].reverse();
      setHistory(reversedHistory);
    } catch (error) {
      console.log(error);
    }
  };


  return {
    words,
    history,
    loadWords
  };
};
