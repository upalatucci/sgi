import md5 from 'md5';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, BackHandler} from 'react-native';
import {WebView} from 'react-native-webview';
import Loading from '../components/Loading';
import * as Keychain from 'react-native-keychain';
import {generateSubscriptionsMAC} from '../services/auth';
import {Actions} from 'react-native-router-flux';

const NR = ({url}) => {
  const webViewRef = useRef();
  const [loading, setLoading] = useState(true);
  const [initialPage, setInitialPage] = useState();

  const handleBackButtonPress = () => {
    try {
      console.log(webViewRef.current?.url);
      webViewRef.current?.goBack();
    } catch (err) {
      console.log('[handleBackButtonPress] Error : ', err.message);
    }

    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonPress,
      );
    };
  }, []);

  useEffect(() => {
    Keychain.getGenericPassword().then((credentials) => {
      if (credentials.password) {
        setInitialPage(
          `https://ilnuovorinascimento.org/guido/log1co.php?u=${credentials.username.toLowerCase()}&p=${md5(
            credentials.password,
          )}&m=${generateSubscriptionsMAC(
            credentials.username,
            credentials.password,
          )}&s=nr`,
        );
      } else {
        Actions.login({nextScene: 'NR', nextSceneProps: {url}});
      }
    });
  }, [url]);

  const onNavigationStateChange = (webViewState) => {
    if (/\/site\/error/.test(webViewState?.url)) {
      setInitialPage('https://ilnuovorinascimento.org');
    }

    console.log('NR navigation state change', webViewState?.url, url);
    if (
      !webViewState?.url?.startsWith(
        'https://ilnuovorinascimento.org/guido/log1co.php',
      ) &&
      webViewState?.url !== url
    ) {
      setInitialPage(url || 'https://ilnuovorinascimento.org');
    }

    webViewRef.current?.injectJavaScript(`
      window.print = () => window.ReactNativeWebView.print()
    `);
  };

  console.log('NR initialPage', initialPage);

  return (
    <>
      {initialPage && (
        <WebView
          ref={webViewRef}
          source={{
            uri: initialPage,
          }}
          style={styles.container}
          onLoadEnd={() => setLoading(false)}
          onLoadStart={() => setLoading(true)}
          onNavigationStateChange={onNavigationStateChange}
          sharedCookiesEnabled={true}
        />
      )}
      {(loading || !initialPage) && <Loading />}
    </>
  );
};

export default NR;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
});
