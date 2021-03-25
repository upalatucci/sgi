import React from 'react';
import {View, StyleSheet} from 'react-native';
import FontSizeIcon from './icons/FontSizeIcon';

export default function ChangeFontSizeContainer({style}) {
  return (
    <View style={[styles.container, style]}>
      <FontSizeIcon />
    </View>
  );
}

const styles = new StyleSheet.create({
  container: {
    width: 60,
    height: '100%',
    marginRight: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-evenly',
  },
});
