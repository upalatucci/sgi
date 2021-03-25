import React from 'react';
import {StyleSheet, View, Text, Linking} from 'react-native';
import {Colors, DefaultShadow} from '../styles';
import TouchableHighlight from '../components/CustomTouchableHighlight';

export default ({principalText, links, fontSize}) => {
  return (
    <View style={styles.card}>
      <Text style={[styles.principalText, styles.text, {fontSize}]}>
        {principalText}
      </Text>
      <View style={styles.linksView}>
        <Text style={[styles.links, {fontSize}]}>Guarda sul sito:</Text>
        <View style={styles.touchLinks}>
          {links.map(({text, url}) => (
            <TouchableHighlight
              key={url}
              style={styles.touchLink}
              onPress={() => Linking.openURL(url)}>
              <Text style={[styles.link, {fontSize}]}>{text}</Text>
            </TouchableHighlight>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    ...DefaultShadow,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: 'white',
  },
  linksView: {
    flexDirection: 'row',
  },
  touchLinks: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  touchLink: {},
  links: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  link: {
    color: Colors.orange,
    textDecorationColor: Colors.orange,
    textDecorationLine: 'underline',
    marginHorizontal: 4,
  },
  principalText: {
    marginBottom: 10,
  },
});
