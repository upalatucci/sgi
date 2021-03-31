import React from 'react';
import {Actions} from 'react-native-router-flux';
import {Image, StyleSheet} from 'react-native';
import TouchableHighlight from '../CustomTouchableHighlight';
import {Colors} from '../../styles';

function goHome() {
  if (Actions.currentScene !== 'home') {
    Actions.home();
  }
}
export default () => (
  <TouchableHighlight onPress={goHome} style={styles.container}>
    <Image source={require('../../assets/sgi.png')} style={styles.image} />
  </TouchableHighlight>
);

const styles = new StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderColor: Colors.darkBlue,
    borderWidth: 2,
    borderRadius: 40,
    padding: 5,
    marginBottom: 4
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
