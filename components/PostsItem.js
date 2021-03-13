import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import TouchableHighlight from './CustomTouchableHighlight';
import {TitleStyle, Colors} from '../styles';

export default ({title, date, image, excerpt, id, entrypoint, uri}) => (
  <TouchableHighlight
    style={styles.container}
    onPress={() => Actions.postPage({id, entrypoint, uri, title})}>
    <View style={[styles.container, styles.newsContainer]}>
      <Image source={image ? {uri: image} : null} style={styles.image} />
      <View style={[styles.container, styles.textContainer]}>
        <Text style={styles.subtitle}>{date}</Text>
        <Text style={styles.title}>{title}</Text>
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
    marginTop: 10,
  },
  newsContainer: {
    height: 150,
    marginBottom: 30,
    paddingHorizontal: 8,
    paddingVertical: 6,
    flexDirection: 'row',
  },
  image: {
    width: 150,
    height: 150,
    flexDirection: 'row',
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 10,
  },
  subtitle: {
    color: Colors.gray,
  },
});
