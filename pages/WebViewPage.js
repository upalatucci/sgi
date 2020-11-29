import React from 'react';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

export default class WebViewPage extends React.Component {
  shouldComponentUpdate(newProps, oldProps) {
    if (oldProps.title !== newProps.title) {
      this.props.navigation.setParams({
        title: newProps.title,
      });
      return true;
    }

    if (oldProps.uri !== newProps.uri) {
      return true;
    }

    return false;
  }

  render() {
    return <WebView source={{uri: this.props.uri}} style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
