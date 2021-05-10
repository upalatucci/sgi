import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {FontFamilies, Colors} from '../../styles';

const Title = (props) => (
  <Text
    {...props}
    style={
      Array.isArray(props.style)
        ? [styles.text, ...props.style]
        : [styles.text, props.style]
    }
    allowFontScaling={props.allowFontScaling ?? false}>
    {props.children}
  </Text>
);

export default Title;

const styles = StyleSheet.create({
  text: {
    fontFamily: FontFamilies.primary,
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
