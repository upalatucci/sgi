import React, {useState} from 'react';
import {Dimensions, Linking} from 'react-native';
import {WebView} from 'react-native-webview';
import SitoStyle from '../utils/sitoStyle';
import VoloContinuoStyle from '../utils/volocontinuoStyle';
import MagazineStyle from '../utils/magazineStyle';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const maxSize = Math.max(deviceHeight, deviceWidth);

const contentStyles = {
  volocontinuo: VoloContinuoStyle,
  sito: SitoStyle,
  magazine: MagazineStyle,
};

export default ({style, content}) => {
  const [height, setHeight] = useState(maxSize);

  Dimensions.addEventListener('change', ({window}) => {
    const max = Math.max(window.height, window.width);
    setHeight(max);
  });

  function handleExternalUrl(req) {
    console.log(req);
    return false;
  }

  console.log('Height window', height);
  return (
    <WebView
      scalesPageToFit={true}
      originWhitelist={[]}
      source={{
        html: `<html>
        <head>
          <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
          <style>${contentStyles[style ? style : 'sito']}</style>
          <style> 
            img, iframe, video { display: block; max-width: 90% !important; height: auto; margin: 0 auto; } 
            body { margin: 0 30px 50px; font-size: 100%; word-wrap: break-word; overflow-wrap: break-word; }
          </style>
        </head>
        <body> 
          ${content}
        </body>
        </html>`,
      }}
      style={{height: height - 80}}
      onShouldStartLoadWithRequest={handleExternalUrl}
    />
  );
};
