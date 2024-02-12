import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';
import { Loading } from '../ui/components/Loading/Loading';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Adicione esta linha se estiver usando react-native-vector-icons para o ícone de estrela
import { ButtonContainer, ButtonText, ButtonOutlined, ButtonOutlinedText } from '../ui/components/Button/ButtonStyled';


const WordsDetailScreen = ({ route }) => {
  const { word } = route.params;
  const [wordDetails, setWordDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false); 



  useEffect(() => {
    checkCacheBeforeFetching();
    checkFavoriteStatus();

  }, []);

  const checkCacheBeforeFetching = async () => {
    try {
      const cachedData = await AsyncStorage.getItem(word);
      if (cachedData) {
        setWordDetails(JSON.parse(cachedData));
      } else {
        await fetchWordDetails();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWordDetails = async () => {
    try {
      const response = await api.get(`/${word}`);
      setWordDetails(response.data[0]);
      await AsyncStorage.setItem(word, JSON.stringify(response.data[0]));
    } catch (error) {
      console.log(error);
    }
  };

  const checkFavoriteStatus = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      const favArray = favorites ? JSON.parse(favorites) : [];
      setIsFavorite(favArray.includes(word));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      let favArray = favorites ? JSON.parse(favorites) : [];
      if (isFavorite) {
        favArray = favArray.filter(favWord => favWord !== word);
      } else {
        favArray.push(word);
      }
      await AsyncStorage.setItem('favorites', JSON.stringify(favArray));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loading size="large" />;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {wordDetails ? (
          <>
            <Text style={styles.word}>
              {wordDetails.word}
              <TouchableOpacity onPress={toggleFavorite}>
                <Icon name={isFavorite ? 'star' : 'star-border'} size={30} color={isFavorite ? '#FFC300' : 'grey'} />
              </TouchableOpacity>
            </Text>
            <Text>{wordDetails.phonetic}</Text>

            <Text style={styles.meaning}>Meaning</Text>
              <View style={styles.meaning}>
                <Text style={styles.partOfSpeech}>{wordDetails.meanings[step].partOfSpeech}</Text>
                {wordDetails.meanings[step].definitions.map((definition, idx) => (
                  <Text key={idx} style={styles.definition}>{definition.definition}</Text>
                ))}<View style={styles.buttons}>
                <ButtonOutlined 
                  onPress={() => {setStep(step > 0 ? step - 1 : 0)}}
                  style={{borderColor: step == 0 ? 'gray':'blue'}}
                  >
                  <ButtonOutlinedText style={{color: step == 0 ? 'gray':'blue'}}>
                    Voltar
                  </ButtonOutlinedText>
                </ButtonOutlined>
                <ButtonContainer 
                  onPress={() => {setStep(step + 1)}}
                  disabled={step >= wordDetails.meanings.length - 1} 
                  style={{backgroundColor: step >= wordDetails.meanings.length - 1 ? 'gray':'blue'}}
                >
                  <ButtonText>
                    Próximo
                  </ButtonText>
                </ButtonContainer>
              </View>
              
              </View>
          </>
        ) : (
          <Text style={styles.noDetails}>Não foram encontrados detalhes para a palavra.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  word: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  meaning: {
    marginTop: 10,
  },
  partOfSpeech: {
    fontSize: 18,
  },
  definition: {
    fontSize: 16,
  },
  noDetails: {
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    gap: 10,
  },
});

export default WordsDetailScreen;
