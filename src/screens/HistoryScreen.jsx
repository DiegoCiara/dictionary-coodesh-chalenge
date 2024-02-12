import React, { useState, useEffect, useCallback } from 'react';
import NavigationBar from '../ui/components/NavigationBar/NavigationBar';
import { WordsPage } from '../ui/pagesStyles/wordsStyle';
import { Loading } from '../ui/components/Loading/Loading';
import { debounce } from 'lodash'; // Certifique-se de instalar o pacote lodash
import HistoryList from '../ui/components/HistoryList/HistoryList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WordsList from '../ui/components/WordsList/WordsList';
import { useDictionary } from '../services/hooks/dictionaryHook';

const HistoryScreen = ({ navigation }) => {


  const { history } = useDictionary();

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
