import React, { useState, useEffect, useCallback } from 'react';
import NavigationBar from '../ui/components/NavigationBar/NavigationBar';
import { WordsPage } from '../ui/pagesStyles/wordsStyle';
import { Loading } from '../ui/components/Loading/Loading';
import { debounce } from 'lodash'; // Certifique-se de instalar o pacote lodash
import HistoryList from '../ui/components/HistoryList/HistoryList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WordsList from '../ui/components/WordsList/WordsList';

const HistoryScreen = ({ navigation }) => {

  const [history, setHistory] = useState([]);


  useEffect(() => {
    fetchHistory();
  }, []);


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


  return (
    <>
      <WordsPage style={{ flex: 1 }}>
        {history.length === 0 ? (
          <Loading size="large" />
        ) : (
          <WordsList navigation={navigation} words={history} />
        )}
      </WordsPage>
      <NavigationBar navigation={navigation} />
    </>
  );
};

export default HistoryScreen;
