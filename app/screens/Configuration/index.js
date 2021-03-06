import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';

import { Alert } from '../../components/common/Alert';
import { Share } from '../../components/common/Share';
import Screen from '../../components/common/Screen';
import { TouchableOpacity } from '../../components/common/TouchableOpacity';
import { Switch } from '../../components/common/Switch';

import { getItem, setItem } from '../../utils/asyncStorage';

import styles from './styles';

const Configuration = () => {
  const [hasAdultContent, setHasAdultContent] = useState(false);
  
  useEffect(() => {
    (async () => {
      try {
        const adultContentStorage = await getItem(
          '@ConfigKey',
          'hasAdultContent'
        );

        setHasAdultContent(adultContentStorage);
      } catch (error) {
        showError();
      }
    })();
  }, [hasAdultContent]);

  showError = () => {
    Alert({
      title: 'Atenção',
      description: 'Erro. Por favor tente novamente depois'
    });
  };

  handleChangeAdultContent = async value => {
    try {
      setHasAdultContent(value);
      await setItem('@ConfigKey', `{"hasAdultContent": ${value}}`);
    } catch (error) {
      showError();
    }
  };

  handleShare = () => {
    Share({
      message: 'B.filmes: Saiba tudo sobre seus filmes favoritos \u{1F37F}',
      url: 'https://www.themoviedb.org/',
      title: 'B.filmes',
      dialogTitle: 'Saiba tudo sobre seus filmes favoritos no app \u{1F37F}'
    });
  };

  handleRating = () => {
    Alert({
      title: 'Atenção',
      description:
        'Ainda não é possível'
    });
  };

  return (
    <Screen>
      <ScrollView style={styles.bgWhite}>
        <View style={styles.container}>
          <View style={styles.section}>
            <Text
              style={[styles.itemText, styles.sectionText]}
              numberOfLines={2}
            >
              Interface
            </Text>
            <View style={[styles.item, styles.itemNoBorder]}>
              <Text style={styles.itemText} numberOfLines={2}>
                Possui conteúdo adulto
              </Text>
              <Switch
                value={hasAdultContent}
                onValueChange={handleChangeAdultContent}
              />
            </View>
          </View>
          <View style={styles.section}>
            <Text
              style={[styles.itemText, styles.sectionText]}
              numberOfLines={2}
            >
              Acessibilidade
            </Text>
          </View>
          <View>
            <Text
              style={[styles.itemText, styles.sectionText]}
              numberOfLines={2}
            >
              Aplicação
            </Text>
            <TouchableOpacity onPress={handleShare}>
              <View style={styles.item}>
                <Text style={styles.itemText} numberOfLines={2}>
                  Compartilhe com um amigo
                </Text>
                <Feather
                  name="share"
                  size={22}
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRating}>
              <View style={styles.item}>
                <Text style={styles.itemText} numberOfLines={2}>
                  Avalie B.Filmes
                </Text>
                <Feather
                  name="star"
                  size={22}
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default Configuration;
