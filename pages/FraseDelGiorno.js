import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import Text from '../components/ui/Text';
import {format} from 'date-fns';
import {getJsonData, SGI_SERVICES} from '../api';
import Loading from '../components/Loading';
import Phrase from '../components/Phrase';
import {Colors} from '../styles';
import GiornoPerGiorno from '../assets/giornopergiorno.png';
import MappaDellaFelicita from '../assets/mappadellafelicita.png';
import {it} from 'date-fns/locale';
import { Actions } from 'react-native-router-flux';

export default () => {
  const [content, setContent] = useState();
  const now = new Date();

  useEffect(() => {
    getJsonData(
      'aderenti/index.php/site/wsFrase',
      {
        giorno: format(now, 'dd'),
        mese: format(now, 'MM'),
      },
      SGI_SERVICES,
    )
      .then((response) => {
        setContent(response);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!content) {
    return <Loading />;
  } else {
    const phrases = Object.values(content);
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Le frasi del giorno</Text>
          <Text style={styles.subtitle}>
            Gli incoraggiamenti del
            <Text style={{fontWeight: 'bold'}}>
              {' '}
              {format(now, 'dd MMMM', {locale: it})}.
            </Text>
          </Text>
          <Phrase
            phrase={phrases[0]}
            image={GiornoPerGiorno}
            origin="Giorno per giorno"
          />
          <Phrase
            phrase={phrases[1]}
            image={MappaDellaFelicita}
            origin="La mappa della felicità"
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  title: {
    alignSelf: 'flex-start',
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 26,
  },
  subtitle: {
    alignSelf: 'flex-start',
    color: Colors.textGray,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
  },
});
