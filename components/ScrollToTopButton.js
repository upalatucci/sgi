import React from 'react';
import TouchableHighlight from './CustomTouchableHighlight';
import Up from '../assets/chevron-up-solid.svg';
import {WithLocalSvg} from 'react-native-svg';
import {StyleSheet} from 'react-native';

const ScrollToTopButton = ({onPress, onTopOfTabBar}) => {
  return (
    <TouchableHighlight
      style={[styles.buttonUp, onTopOfTabBar ? styles.onTopOfTabBar : null]}
      onPress={onPress}>
      <WithLocalSvg asset={Up} />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  buttonUp: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    zIndex: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
  },
  onTopOfTabBar: {
    bottom: 70,
  },
});

export default ScrollToTopButton;
