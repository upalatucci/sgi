import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {format} from 'date-fns';
import {getJsonData, SGI_SERVICES} from '../api';
import Loading from '../components/Loading';
import Phrase from '../components/Phrase';

export default () => {
  const [content, setContent] = useState();

  useEffect(() => {
    const now = new Date();
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
      <ScrollView contentContainerStyle={styles.container}>
        <Phrase phrase={phrases[0]} />
        <Phrase phrase={phrases[1]} />
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 40,
  },
});
