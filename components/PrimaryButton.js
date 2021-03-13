import React from 'react';
import {Text, StyleSheet} from 'react-native';
import TouchableHighlight from './CustomTouchableHighlight';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../styles';

export default ({onPress, text, style, textStyle}) => (
  <TouchableHighlight onPress={onPress} {...{style}}>
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={[Colors.lightBlue, Colors.darkBlue]}
      style={[styles.buttonContainer, style]}>
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </LinearGradient>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    alignSelf: 'center',
    width: 120,
    height: 35,
    marginBottom: 0,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
