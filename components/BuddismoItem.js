import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomWebView from './CustomWebView';
import {TitleStyle} from '../styles';

export default ({title, full}) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.container}>
      <CustomWebView content={full} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    ...TitleStyle,
  },
});
