import React, {useRef} from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import SitoStyle from '../utils/sitoStyle';
import VoloContinuoStyle from '../utils/volocontinuoStyle';
import MagazineStyle from '../utils/magazineStyle';
import {useDispatch, useSelector} from 'react-redux';
import {getFontSize} from '../utils';
import CustomTouchableHighlight from './CustomTouchableHighlight';
import {Selector} from '../getSelector';
import {HIGHLIGHT, REMOVE_HIGHLIGHT} from '../store/mutations';
import MarkerIcon from '../assets/marker.png';
import GoBack from '../assets/go-back-arrow.png';
import {useCallback} from 'react';

const contentStyles = {
  volocontinuo: VoloContinuoStyle,
  sito: SitoStyle,
  magazine: MagazineStyle,
};

const CustomWebView = ({
  style,
  content,
  onLoadEnd,
  magazineKey,
  subtractHeight = 80,
  enableHighlight = false,
}) => {
  const dispatch = useDispatch();
  const {highlights, textSize} = useSelector((state) => ({
    highlights: state.magazine.highlights,
    textSize: state.ui.textSize,
  }));

  const webref = useRef();
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  const height = Math.max(windowHeight, windowWidth);

  const handleLoadPageRequest = useCallback((req) => {
    console.log('WebView Load Request', req);
    if (req.navigationType === 'click') {
      Linking.openURL(req.url);
      return false;
    }
    return true;
  }, []);

  const handleOnMessage = useCallback(
    (event) => {
      const dataObj = JSON.parse(event.nativeEvent.data);

      if ('log' in dataObj) {
        console.log(dataObj.log);
      } else {
        dispatch({
          type: HIGHLIGHT,
          payload: {key: magazineKey, value: dataObj},
        });
      }
    },
    [magazineKey, dispatch],
  );

  const hightlight = useCallback(() => {
    if (enableHighlight) {
      webref.current.injectJavaScript('highlightTextHTML()');
    }
  }, [webref, enableHighlight]);

  const removeLastHighlight = useCallback(() => {
    dispatch({
      type: REMOVE_HIGHLIGHT,
      payload: magazineKey,
    });
    webref.current.injectJavaScript('removeHighlight()');
  }, [dispatch, magazineKey]);

  const documentReady = useCallback(() => {
    if (!webref.current) {
      return;
    }

    if (enableHighlight) {
      webref.current.injectJavaScript(
        `
      try {
        const allHighlights = ${JSON.stringify(storedHighlights)}
        allHighlights.forEach(h => restoreHighlight(h))
        window.ReactNativeWebView.postMessage(JSON.stringify({log: "Restored"}))
      }catch(err){
        window.ReactNativeWebView.postMessage(JSON.stringify({log: err}))
      }`,
      );
    }

    if (onLoadEnd) {
      onLoadEnd();
    }
  }, [webref, onLoadEnd, storedHighlights, enableHighlight]);

  const storedHighlights = highlights[magazineKey] ?? [];

  return (
    <>
      {enableHighlight && (
        <View style={styles.buttons}>
          <CustomTouchableHighlight
            onPress={hightlight}
            style={styles.iconContainer}>
            <Image source={MarkerIcon} style={styles.icons} />
          </CustomTouchableHighlight>
          <CustomTouchableHighlight
            onPress={removeLastHighlight}
            style={styles.iconContainer}>
            <Image source={GoBack} style={styles.icons} />
          </CustomTouchableHighlight>
        </View>
      )}
      <WebView
        ref={webref}
        scalesPageToFit={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        useWebkit={true}
        originWhitelist={['*']}
        source={{
          html: `<html>
        <head>
          <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
          <style>${contentStyles[style ?? 'sito']}</style>
          <style> 
            img, iframe, video { display: block; max-width: 90% !important; height: auto; margin: 0 auto; } 
            body { margin: 0 30px 50px; font-size: ${getFontSize(
              textSize,
            )}; word-wrap: break-word; overflow-wrap: break-word; }
          </style>
        </head>
        <body> 
          ${content}
            
          <style>
            span.highlight {
              background-color: yellow;
            }
            
            span.highlight * {
              background-color: yellow;
            }

            span.highlight br {
              background-color: white;
            }
          </style>
          <script>
              ${Selector}

              const rangeSpans = []
              function restoreHighlight(dataObj) {
                try {
                  const range = new Range()

                  const startContainer = document.querySelector(dataObj.startContainerPath).childNodes[dataObj.startContainerIndex]
                  const endContainer = document.querySelector(dataObj.endContainerPath).childNodes[dataObj.endContainerIndex]

                  range.setStart(startContainer, dataObj.startOffset)
                  range.setEnd(endContainer, dataObj.endOffset)

                  highlight(range)
                } catch(err) {
                  window.ReactNativeWebView.postMessage(JSON.stringify({log: err}))
                }
              }

              function highlightTextHTML() {
                const selectionObj = window.getSelection()
                const range = selectionObj.getRangeAt(0)

                const parentStartContainer = range.startContainer.parentElement
                const parentEndContainer = range.endContainer.parentElement
                const data = {
                  startContainerPath: UTILS.cssPath(parentStartContainer),
                  startContainerIndex: getIndexNodeFromParent(range.startContainer),
                  startOffset: range.startOffset,
                  endContainerPath: UTILS.cssPath(parentEndContainer),
                  endContainerIndex: getIndexNodeFromParent(range.endContainer),
                  endOffset: range.endOffset
                }

                window.ReactNativeWebView.postMessage(JSON.stringify(data))

                highlight(range)
              }

              function removeHighlight() {
                const who = rangeSpans.pop()
                var pa= who.parentNode;

                while(who.firstChild){
                 pa.insertBefore(who.firstChild, who);
                }

                for(i=1; i < pa.children.length; i++) {
                  const a = pa.children[i]
                  const b = pa.children[i - 1]

                  if (a.className === b.className && a.tagName === b.tagName) {
                    while(a.firstChild) {
                      b.appendChild(a.firstChild)
                      a.removeChild(a.firstChild)
                    }
                  }
                }
              }

              function highlight(range) {
                if (range.toString() !== "") {
                  var newNode = document.createElement("span");
                  newNode.classList.add('highlight'); 
                  newNode.appendChild(range.extractContents()); 
                  range.insertNode(newNode);
                  rangeSpans.push(newNode)
                }
              }

              function getIndexNodeFromParent(node) {
                const parentElement = node.parentElement
                for(let i = 0; i < parentElement.childNodes.length; i++) {
                  if (node.isSameNode(parentElement.childNodes[i]))
                    return i
                }
              }

          </script>
        </body>
        </html>`,
        }}
        onMessage={handleOnMessage}
        style={{height: height - subtractHeight}}
        onShouldStartLoadWithRequest={handleLoadPageRequest}
        onLoadEnd={documentReady}
      />
    </>
  );
};

const styles = StyleSheet.create({
  buttons: {
    position: 'absolute',
    bottom: 10,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 10,
  },
  icons: {
    width: 26,
    height: 26,
  },
  iconContainer: {
    marginHorizontal: 10,
    overflow: 'hidden',
  },
});
export default CustomWebView;
