import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useDictionary } from '../services/hooks/dictionaryHook';
import WordsList from '../ui/components/WordsList/WordsList';
import { TextField } from '../ui/components/TexField/TextFieldStyled';
import NavigationBar from '../ui/components/NavigationBar/NavigationBar';
import { WordsPage } from '../ui/pagesStyles/wordsStyle';
import { Loading } from '../ui/components/Loading/Loading';
import { debounce } from 'lodash'; // Certifique-se de instalar o pacote lodash

const WordsScreen = ({ navigation }) => {
  const { words } = useDictionary();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredWords, setFilteredWords] = useState(words);

  const debounceFilter = useCallback(
    debounce((search) => {
      const filtered = words.filter(word =>
        word.key.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredWords(filtered);
    }, 250),
    [words]
  );

  useEffect(() => {
    debounceFilter(searchTerm);
  }, [searchTerm, debounceFilter]);

  return (
    <>
      <WordsPage style={{ flex: 1 }}>
        <TextField
          placeholder="Search for a word..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        {words.length === 0 ? (
          <Loading size="large" />
        ) : (
          <WordsList navigation={navigation} words={filteredWords} />
        )}
      </WordsPage>
      <NavigationBar navigation={navigation} />
    </>
  );
};

export default WordsScreen;
