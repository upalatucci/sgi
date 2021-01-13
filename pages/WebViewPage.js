import React from 'react';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import Loading from '../components/Loading';

export default class WebViewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  shouldComponentUpdate(newProps, newState) {
    if (newState.loading !== this.state.loading) {
      return true;
    }

    if (this.props.title !== newProps.title) {
      this.props.navigation.setParams({
        title: newProps.title,
      });
      return true;
    }

    if (this.props.uri !== newProps.uri) {
      this.setState({loading: true});
      return true;
    }

    return false;
  }

  endLoading = () => {
    if (this.state.loading) {
      this.setState({loading: false});
    }
  };

  render() {
    return (
      <>
        <WebView
          source={{uri: this.props.uri}}
          style={styles.container}
          onLoadEnd={this.endLoading}
          injectedJavaScript={
            'document.body.style.overflowX = "none"          '
          }
        />
        {this.state.loading ? <Loading /> : null}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
});
