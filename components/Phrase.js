import React from 'react';
import {StyleSheet, View, Text, Share, Image} from 'react-native';
import CustomHTML from './CustomHTML';
import {convertHTMLToText, italianFormat} from '../utils';
import {WithLocalSvg} from 'react-native-svg';
import ShareIcon from '../assets/share.svg';
import CustomTouchableHighlight from './CustomTouchableHighlight';
import {DefaultShadow, Colors} from '../styles';

export default React.memo(({phrase, image, origin}) => {
  const now = new Date();

  function addStrong(string) {
    return `<p style="text-align: left;"><strong>Tratto da ${string}</strong></p>`;
  }

  function addNote(string) {
    return `<span style="margin-top: 10px;"><strong>Note: </strong> <br>${string}</span>`;
  }

  function addCenter(string) {
    return `<p style="text-align: left; margin-bottom: 10px;">${string}</p>`;
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
      <View style={styles.bottomView}>
        <View style={styles.originView}>
          <Image source={image} style={styles.image} />
          <View style={styles.originTextView}>
            <Text style={styles.origin}>{origin}</Text>
            <Text style={styles.ikeda}>Daisaku Ikeda</Text>
          </View>
        </View>
        <CustomTouchableHighlight
          onPress={sharePhrase}
          style={styles.shareView}>
          <>
            <Text style={styles.shareText}>Condividi</Text>
            <WithLocalSvg
              style={styles.shareIcon}
              width={20}
              height={20}
              asset={ShareIcon}
            />
          </>
        </CustomTouchableHighlight>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  phraseContainer: {
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
    maxWidth: 700,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    ...DefaultShadow,
  },
  flex: {
    flex: 1,
  },
  bottomView: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 60,
    height: 120,
    resizeMode: 'contain',
  },
  originView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  originTextView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignContent: 'center',
    width: 100,
    marginLeft: 10,
  },
  origin: {
    fontWeight: 'bold',
  },
  ikeda: {},
  shareView: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  shareText: {
    color: Colors.lightBlue,
    marginRight: 5,
  },
});
