import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {format} from 'date-fns';
import {getJsonData, SGI_SERVICES} from '../api';
import Loading from '../components/Loading';
import Phrase from '../components/Phrase';
import {Colors} from '../styles';
import GiornoPerGiorno from '../assets/giornopergiorno.png';
import MappaDellaFelicita from '../assets/mappadellafelicita.png';
import {it} from 'date-fns/locale';
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
  }, []);

  if (!content) {
    return <Loading />;
  } else {
    const phrases = Object.values(content);
    return (
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>La frase del giorno</Text>
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
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  title: {
    alignSelf: 'flex-start',
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  subtitle: {
    alignSelf: 'flex-start',
    color: Colors.textGray,
  },
  scroll: {
    flex: 1,
  },
  scrollContainer: {
    backgroundColor: Colors.background,
    flex: 1,
    paddingHorizontal: 20
  },
});
