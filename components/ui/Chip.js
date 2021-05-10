import React from 'react';
import {View, StyleSheet} from 'react-native';
import Home from '../../pages/Home';
import HomeLinearGradient from '../home/HomeLinearGradient';
import Text from './Text';
import TouchableHighlight from '../CustomTouchableHighlight';

export const CHIPS_HEIGHT = 30;
export default ({label, selected, onClick}) => {
  if (selected) {
    return (
      <TouchableHighlight onPress={onClick} style={styles.container}>
        <HomeLinearGradient style={styles.background}>
          <Text style={[styles.label, styles.selectedLabel]}>{label}</Text>
        </HomeLinearGradient>
      </TouchableHighlight>
    );
  } else {
    return (
      <TouchableHighlight onPress={onClick} style={styles.container}>
        <Text style={[styles.label, styles.notSelectedLabel]}>{label}</Text>
      </TouchableHighlight>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '30%',
    maxWidth: 250,
    height: CHIPS_HEIGHT,
    borderRadius: 20,
    overflow: 'hidden',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  background: {
    height: '100%',
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    textAlign: 'center',
    fontSize: 12,
  },
  selectedLabel: {
    color: 'white',
  },
  notSelectedLabel: {
    color: 'black',
  },
});
