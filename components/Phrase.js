import React from 'react';
import {StyleSheet, View, Text, Share} from 'react-native';
import CustomHTML from './CustomHTML';
import PrimaryButton from './PrimaryButton';
import {convertHTMLToText, italianFormat} from '../utils';

export default React.memo(({phrase}) => {
  const now = new Date();

  function addStrong(string) {
    return `<p style="text-align: center;"><strong>Tratto da ${string}</strong></p>`;
  }

  function addNote(string) {
    return `<span style="margin-top: 10px;"><strong>Note: </strong> <br>${string}</span>`;
  }

  function addCenter(string) {
    return `<p style="text-align: center; margin-bottom: 10px;">${string}</p>`;
  }

  async function sharePhrase() {
    const messageHTML =
      `${italianFormat(now, 'dd')} ${italianFormat(now, 'MMMM')}\n\n` +
      `${phrase.frase}\n\n${phrase.origine}`;
    const message = await convertHTMLToText(messageHTML);
    try {
      await Share.share({
        message,
      });
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <View style={styles.phraseContainer}>
      <CustomHTML content={addCenter(phrase.frase)} style={styles.flex} />
      {phrase.note ? (
        <CustomHTML content={addNote(phrase.note)} style={styles.flex} />
      ) : null}
      <CustomHTML content={addStrong(phrase.origine)} style={styles.flex} />
      <PrimaryButton text="Condividi" onPress={sharePhrase} />
    </View>
  );
});

const styles = StyleSheet.create({
  phraseContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
    maxWidth: 700,
  },
  flex: {
    flex: 1,
  },
});
