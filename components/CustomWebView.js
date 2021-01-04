import React from 'react';
import {View, StyleSheet, Dimensions, Linking} from 'react-native';
import {WebView} from 'react-native-webview';
import SitoStyle from '../utils/sitoStyle';
import VoloContinuoStyle from '../utils/volocontinuoStyle';
import MagazineStyle from '../utils/magazineStyle';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const minorSize = Math.min(deviceHeight, deviceWidth);

const contentStyles = {
  volocontinuo: VoloContinuoStyle,
  sito: SitoStyle,
  magazine: MagazineStyle,
};

export default ({style, content}) => {
  function handleExternalUrl(req) {
    Linking.openURL(req.url);
    return false;
  }

  return (
    <WebView
      scalesPageToFit={true}
      source={{
        html: `<html>
        <head>
          <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
          <style>${contentStyles[style ? style : 'sito']}"</style>
          <style> img, video { display: block; max-width: 80% !important; height: auto; margin: 0 auto; } body { margin: 0 30px 50px }</style>
        </head>
        <body> 
          ${content}
        </body>
        </html>`,
      }}
      style={{height: deviceHeight - 70}}
      onShouldStartLoadWithRequest={handleExternalUrl}
    />
  );
};
