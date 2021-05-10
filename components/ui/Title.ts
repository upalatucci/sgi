import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {FontFamilies, TitleStyle} from '../../styles';

export default (props) => (
  <Text
    {...props}
    style={
      Array.isArray(props.style)
        ? [...props.style, styles.text]
        : [props.style, styles.text]
    }
    allowFontScaling={props.allowFontScaling ?? false}>
    {props.children}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: FontFamilies.primary,
    ...TitleStyle
  },
});
