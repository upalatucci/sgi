import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {TitleStyle} from '../styles';

export default (props) => (
  <Text {...props} style={[styles.title, ...props.style]}>
    {props.children}
  </Text>
);

const styles = StyleSheet.create({
  title: {
    ...TitleStyle,
  },
});
