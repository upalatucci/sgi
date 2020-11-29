import React from 'react';
import HTML from 'react-native-render-html';
import {View, StyleSheet, Dimensions, Linking} from 'react-native';
import {Colors} from '../styles';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const minorSize = Math.min(deviceHeight, deviceWidth);
export default (props) => (
  <HTML
    renderers={{
      hr: () => <View style={styles.hr} key={Math.random()} />,
    }}
    tagsStyles={{
      a: {textDecorationLine: null, color: Colors.primary},
      h3: {marginBottom: 0},
      ...props.additionalTagsStyles,
    }}
    staticContentMaxWidth={minorSize}
    imagesMaxWidth={minorSize}
    {...props}
    html={props.content.replace(
      /width=['"].*?['"]/gm,
      `width="${
        minorSize * 0.9
      }" style="margin-left: auto; margin-right: auto;"`,
    )}
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
