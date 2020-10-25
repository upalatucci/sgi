import React from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {TitleStyle} from '../styles';

export default ({title, date, image, excerpt, id}) => (
  <TouchableHighlight
    style={styles.container}
    onPress={() => Actions.newsPage({id})}>
    <View style={[styles.container, styles.newsContainer]}>
      {/* {image && image !== '' ? (
        <Image source={{uri: image}} style={styles.image} />
      ) : null} */}
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.container, styles.textContainer]}>
        <Text>
          {excerpt
            .trim()
            .replace('&nbsp;', '')
            .replace(/(\r\n|\n|\r)/gm, '')}
        </Text>
      </View>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    ...TitleStyle,
    marginTop: 3,
    marginBottom: 6,
  },
  textContainer: {
    marginBottom: 10,
  },
  newsContainer: {
    marginBottom: 30,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  image: {
    width: '100%',
    height: 100,
  },
});
