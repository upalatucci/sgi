import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import TouchableHighlight from './CustomTouchableHighlight';
import {TitleStyle, Colors} from '../styles';
import {transformDate} from '../utils';

export default ({title, date, image, id, entrypoint, uri}) => (
  <TouchableHighlight
    style={styles.container}
    onPress={() => Actions.postPage({id, entrypoint, uri, title})}>
    <View style={[styles.container, styles.newsContainer]}>
      {image ? (
        <Image source={image ? {uri: image} : null} style={styles.image} />
      ) : null}
      <View style={[styles.container, styles.textContainer]}>
        <Text style={styles.subtitle}>{transformDate(date)}</Text>
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
    marginLeft: 14,
  },
  newsContainer: {
    minHeight: 150,
    marginBottom: 30,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 14,
  },
  image: {
    width: 150,
    height: '100%',
    flexDirection: 'row',
    resizeMode: 'cover',
    borderRadius: 14,
  },
  subtitle: {
    color: Colors.textGray,
  },
});
