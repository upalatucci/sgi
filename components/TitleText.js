import React from 'react';
import {StyleSheet} from 'react-native';
import Text from './ui/Text';
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
