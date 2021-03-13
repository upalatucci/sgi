import React from 'react';
import {Actions} from 'react-native-router-flux';
import {Image, StyleSheet} from 'react-native';
import TouchableHighlight from '../CustomTouchableHighlight';

export default () => (
  <TouchableHighlight onPress={() => Actions.home()}>
    <Image source={require('../../assets/sgi.png')} style={styles.container} />
  </TouchableHighlight>
);

const styles = new StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});
