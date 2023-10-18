import React, {useRef, useEffect, useState, useCallback} from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import SitoStyle from '../../utils/sitoStyle';
import VoloContinuoStyle from '../../utils/volocontinuoStyle';
import MagazineStyle from '../../utils/magazineStyle';
import {useSelector} from 'react-redux';
import {getFontSize} from './utils';
import CustomTouchableHighlight from '../CustomTouchableHighlight';
import {Selector} from './getSelector';
import MarkerIcon from '../../assets/marker.png';
import GoBack from '../../assets/go-back-arrow.png';
import ScrollToTopButton from '../ScrollToTopButton';
import {addHighlight, getAllHighlights, removeHightlight} from './highlights';

const contentStyles = {
  volocontinuo: VoloContinuoStyle,
  sito: SitoStyle,
  magazine: MagazineStyle,
};

const CustomWebView = ({
  style,
  content,
  contentHeader,
  onLoadEnd,
  magazineKey,
  subtractHeight = 80,
  enableHighlight = false,
}) => {
  const [percentScroll, setPercentScroll] = useState(0);
  const [highlights, setHighlights] = useState([]);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const {textSize} = useSelector((state) => ({
    textSize: state.ui.textSize,
  }));

  const webref = useRef();
  const {height} = useWindowDimensions();

  const handleLoadPageRequest = useCallback((req) => {
    console.log(req);
    if (req.navigationType === 'click') {
      Linking.openURL(req.url);
      return false;
    }
    return true;
  }, []);

  const handleOnMessage = useCallback(
    async (event) => {
      const dataObj = JSON.parse(event.nativeEvent.data);

      console.log(dataObj);
      if ('log' in dataObj) {
        console.log(dataObj.log);
      } else {
        setHighlights(await addHighlight(magazineKey, dataObj));
      }
    },
    [magazineKey],
  );

  const hightlight = useCallback(() => {
    if (enableHighlight) {
      webref.current.injectJavaScript('highlightTextHTML(); true;');
    }
  }, [webref, enableHighlight]);

  const removeLastHighlight = useCallback(async () => {
    setHighlights(await removeHightlight(magazineKey));
    webref.current.injectJavaScript('removeHighlight(); true;');
  }, [magazineKey]);

  const documentReady = useCallback(() => {
    if (!webref.current) {
      return;
    }

    if (enableHighlight) {
      webref.current.injectJavaScript(
        `
          restoreScroll(${percentScroll})
        try {
          const allHighlights = ${JSON.stringify(highlights)}
          allHighlights.forEach(h => restoreHighlight(h))
          window.ReactNativeWebView.postMessage(JSON.stringify({log: allHighlights}))
        }catch(err){
          window.ReactNativeWebView.postMessage(JSON.stringify({log: err}))
        }
         true;
        `,
      );
    }

    if (onLoadEnd) {
      onLoadEnd();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webref, percentScroll, highlights]);

  const scrollToTop = useCallback(() => {
    console.log(webref);
    if (!webref.current) {
      return;
    }

    webref.current.injectJavaScript(scrollScript);
  }, [webref]);

  const onScroll = useCallback((event) => {
    const {contentOffset, contentSize, layoutMeasurement} = event.nativeEvent;
    const percent =
      Math.round((contentOffset.y / contentSize.height) * 100) / 100;

    if (contentOffset.y > layoutMeasurement.height) {
      setShowScrollTopButton(true);
    } else {
      setShowScrollTopButton(false);
    }

    if (percent !== 0) {
      setPercentScroll(percent);
    }
  }, []);

  useEffect(() => {
    getAllHighlights(magazineKey).then((h) => {
      setHighlights(h);
    });
  }, [magazineKey]);

  return (
    <>
      {showScrollTopButton && <ScrollToTopButton onPress={scrollToTop} />}
      {enableHighlight && (
        <View style={styles.buttons}>
          <CustomTouchableHighlight
            onPress={hightlight}
            style={styles.iconContainer}>
            <Image source={MarkerIcon} style={styles.hightlightIcon} />
          </CustomTouchableHighlight>
          <CustomTouchableHighlight
            onPress={removeLastHighlight}
            style={styles.iconContainer}>
            <Image source={GoBack} style={styles.goBackIcon} />
          </CustomTouchableHighlight>
        </View>
      )}
      <WebView
        ref={webref}
        onScroll={onScroll}
        scalesPageToFit={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        useWebkit={true}
        originWhitelist={['*']}
        source={{
          html: `<html>
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
          ${contentStyles[style ?? 'sito']}
          <style> 
            img, iframe, video { display: block; max-width: 90% !important; height: auto; margin: 0 auto; } 
            .soundcloud-player > * { max-width: 100% !important;}
            body { margin: 0 30px 50px; font-size: ${getFontSize(
              textSize,
            )}; word-wrap: break-word; overflow-wrap: break-word; }
            
            #rn-container {
              margin-bottom: 80px;
            }
          </style>
        </head>
        <body> 
            <div id="rn-container">
              ${contentHeader ? contentHeader : ''}

              ${content}
            </div>
            
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
              
              function restoreScroll(percent) {
                const scrollY = document.body.scrollHeight * percent;
                window.scrollTo({left:0, top: scrollY, behavior: "smooth"});
              }

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
                  endOffset: range.endOffset,
                  text: range.toString()
                }

                window.ReactNativeWebView.postMessage(JSON.stringify(data))

                highlight(range)
              }

              function removeHighlight() {
                const {node, htmlContainer} = rangeSpans.pop()

                document.getElementById("rn-container").innerHTML = htmlContainer
              }

              function highlight(range) {
                if (range.toString() !== "") {
                  const htmlContainer = document.getElementById("rn-container").innerHTML
                  var newNode = document.createElement("span");
                  newNode.classList.add('highlight'); 
                  newNode.appendChild(range.extractContents()); 
                  range.insertNode(newNode);
                  rangeSpans.push({node: newNode, htmlContainer })
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

const scrollScript = `
  try {
    window.scrollTo({top: 0, left: 0, behavior: "smooth"});
  } catch(err) {
    window.scrollTo(0, 0);
  }

  true;
`;

const styles = StyleSheet.create({
  buttons: {
    position: 'absolute',
    bottom: 20,
    width: 110,
    height: 50,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  goBackIcon: {
    width: 26,
    height: 26,
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 5,
  },
  hightlightIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginLeft: 5,
    backgroundColor: 'white',
  },
  iconContainer: {
    marginVertical: 4,
    padding: 6,
    borderRadius: 30,
    overflow: 'hidden',
  },
});
export default CustomWebView;
