import React from 'react';
import {StyleSheet, View, Text, Share} from 'react-native';
import CustomHTML from './CustomHTML';
import {PrimaryButtonStyle, PrimaryButtonTitleStyle} from '../styles';
import CustomTouchableHighlight from './CustomTouchableHighlight';
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
      <CustomHTML content={addCenter(phrase.frase)} />
      {phrase.note ? (
        <CustomHTML
          content={addNote(phrase.note)}
          baseFontStyle={{fontSize: 24}}
        />
      ) : null}
      <CustomHTML content={addStrong(phrase.origine)} />
      <CustomTouchableHighlight
        style={PrimaryButtonStyle}
        onPress={sharePhrase}>
        <Text style={PrimaryButtonTitleStyle}>Condividi</Text>
      </CustomTouchableHighlight>
    </View>
  );
});

const styles = StyleSheet.create({
  phraseContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
