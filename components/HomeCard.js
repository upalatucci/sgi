import React from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {DefaultShadow} from '../styles';

export default ({title, backgroundColor, inverse, onPress, image}) => (
  <TouchableHighlight
    activeOpacity={0.6}
    underlayColor="#fff"
    onPress={onPress}>
    <View
      style={[styles.card, {backgroundColor}, inverse ? styles.inverse : null]}>
      <Text style={styles.title}>{title}</Text>
      <Image source={image} style={styles.image} />
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  card: {
    margin: 20,
    ...DefaultShadow,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 160,
  },
  inverse: {
    flexDirection: 'row-reverse',
  },
  image: {
    height: 160,
    width: 150,
    resizeMode: 'cover',
  },
  title: {
    padding: 20,
    fontSize: 28,
    color: 'white',
  },
});
