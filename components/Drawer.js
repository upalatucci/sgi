import React from 'react';
import {View, StyleSheet, Text, Linking} from 'react-native';
import TouchableHighlight from './CustomTouchableHighlight';
import {Actions} from 'react-native-router-flux';
import {SGI_ENTRYPOINT} from '../api';

export default () => (
  <View style={styles.container}>
    <View>
      <TouchableHighlight onPress={() => Actions.pop()}>
        <Text style={styles.x}>X</Text>
      </TouchableHighlight>
    </View>
    <TouchableHighlight onPress={() => Actions.home()}>
      <Text style={styles.text}>Home</Text>
    </TouchableHighlight>
    <TouchableHighlight onPress={() => Actions.buddismo()}>
      <Text style={styles.text}>Buddismo</Text>
    </TouchableHighlight>
    <TouchableHighlight
      onPress={() =>
        Actions.posts({
          title: 'In primo piano',
          uri: 'news',
          entrypoint: SGI_ENTRYPOINT,
        })
      }>
      <Text style={styles.text}>In primo piano</Text>
    </TouchableHighlight>
    <TouchableHighlight onPress={() => Actions.magazines()}>
      <Text style={styles.text}>Le riviste</Text>
    </TouchableHighlight>
    <TouchableHighlight
      onPress={() =>
        Linking.openURL('https://servizi.sgi-italia.org/abbonamenti/')
      }>
      <Text style={styles.text}>Abbonamenti</Text>
    </TouchableHighlight>
    <TouchableHighlight
      onPress={() =>
        Actions.webview({
          title: 'Spazio Aderenti',
          uri: 'https://servizi.sgi-italia.org/aderenti/',
        })
      }>
      <Text style={styles.text}>Aderenti</Text>
    </TouchableHighlight>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#47A3C4',
  },
  text: {
    paddingVertical: 20,
    marginHorizontal: 15,
    color: 'white',
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#68C8DB',
  },
  x: {
    paddingVertical: 10,
    marginHorizontal: 15,
    fontSize: 30,
    color: 'white',
  },
});
