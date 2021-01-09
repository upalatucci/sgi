import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';
import SitoStyle from '../utils/sitoStyle';
import VoloContinuoStyle from '../utils/volocontinuoStyle';
import MagazineStyle from '../utils/magazineStyle';
import {connect} from 'react-redux';
import {getFontSize} from '../utils';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const maxSize = Math.max(deviceHeight, deviceWidth);

const contentStyles = {
  volocontinuo: VoloContinuoStyle,
  sito: SitoStyle,
  magazine: MagazineStyle,
};

const CustomWebView = ({style, content, textSize}) => {
  const [height, setHeight] = useState(maxSize);

  Dimensions.addEventListener('change', ({window}) => {
    const max = Math.max(window.height, window.width);
    setHeight(max);
  });

  console.log('TextSize', textSize);

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
            body { margin: 0 30px 50px; font-size: ${getFontSize(
              textSize,
            )}; word-wrap: break-word; overflow-wrap: break-word; }
          </style>
        </head>
        <body> 
          ${content}
        </body>
        </html>`,
      }}
      style={{height: height - 80}}
      onShouldStartLoadWithRequest={() => false}
    />
  );
};

function mapStateToProps(state) {
  return {
    textSize: state.ui.textSize,
  };
}

export default connect(mapStateToProps)(CustomWebView);
