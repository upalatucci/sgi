import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Linking,
  Platform,
  ScrollView,
} from 'react-native';
import TouchableHighlight from './CustomTouchableHighlight';
import {Actions} from 'react-native-router-flux';
import {SGI_ENTRYPOINT} from '../api';
import {WithLocalSvg} from 'react-native-svg';
import X from '../assets/x.svg';
import {connect} from 'react-redux';
import {LOGOUT} from '../store/mutations';
import Text from './ui/Text';

const Drawer = ({isLogged, logout}) => {
  const loginOrOut = () => {
    console.log(isLogged);
    if (isLogged) {
      logout();
      Actions.home();
    } else {
      Actions.login();
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableHighlight
          style={styles.xTouchWidth}
          onPress={() => Actions.pop()}>
          <WithLocalSvg style={styles.x} width={20} height={20} asset={X} />
        </TouchableHighlight>
      </View>
      <ScrollView style={styles.scrollView}>
        <TouchableHighlight onPress={() => Actions.home()}>
          <Text style={styles.text}>Home</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => Actions.buddismo()}>
          <Text style={styles.text}>Buddismo</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() =>
            Actions.posts({
              title: 'In primo piano',
              uri: 'news',
              entrypoint: SGI_ENTRYPOINT,
            })
          }>
          <Text style={styles.text}>In primo piano</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => Actions.magazines()}>
          <Text style={styles.text}>Le riviste</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() =>
            Linking.openURL('https://servizi.sgi-italia.org/abbonamenti/')
          }>
          <Text style={styles.text}>
            {Platform.select({
              ios: 'Servizi riviste',
              android: 'Spazio abbonamenti',
            })}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() =>
            Linking.openURL('https://servizi.sgi-italia.org/aderenti/')
          }>
          <Text style={styles.text}>Spazio aderenti</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={loginOrOut}>
          <Text style={[styles.text, styles.lastText]}>
            {isLogged ? 'Logout' : 'Login'}
          </Text>
        </TouchableHighlight>
        <Text style={styles.version}>2.0.19 219</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogged: state.magazine.isLogged,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch({type: LOGOUT}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00A2C3',
  },
  text: {
    paddingVertical: 15,
    marginHorizontal: 15,
    color: 'white',
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  lastText: {
    marginBottom: 30,
  },
  xTouchWidth: {
    width: 60,
  },
  x: {
    margin: 15,
    fontSize: 30,
    color: 'white',
    width: 20,
  },
  version: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    color: 'white',
  },
  scrollView: {
    flex: 1,
  },
});
