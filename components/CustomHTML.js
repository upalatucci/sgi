import React from 'react';
import HTML from 'react-native-render-html';
import {View, StyleSheet, Dimensions, Linking} from 'react-native';
import {Colors} from '../styles';

const deviceWidth = Dimensions.get('window').width;
export default (props) => (
  <HTML
    renderers={{
      hr: () => <View style={styles.hr} key={Math.random()} />,
    }}
    tagsStyles={{
      p: {marginBottom: -10},
      a: {textDecorationLine: null, color: Colors.primary},
      li: {marginBottom: -40},
      h3: {marginBottom: -40},
      ...props.additionalTagsStyles,
    }}
    staticContentMaxWidth={deviceWidth}
    imagesMaxWidth={deviceWidth}
    {...props}
    html={props.content.replace(/width=['"].*?['"]/, '')}
    onLinkPress={(event, href) => Linking.openURL(href)}
  />
);

const styles = StyleSheet.create({
  hr: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.primary,
  },
});
