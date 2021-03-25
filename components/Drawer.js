import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Linking,
  Platform,
} from 'react-native';
import TouchableHighlight from './CustomTouchableHighlight';
import {Actions} from 'react-native-router-flux';
import {SGI_ENTRYPOINT} from '../api';
import {WithLocalSvg} from 'react-native-svg';
import X from '../assets/x.svg';
import {connect} from 'react-redux';
import {LOGOUT} from '../store/mutations';
import GestureRecognizer from 'react-native-swipe-gestures';

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
      <GestureRecognizer
        style={styles.container}
        onSwipeLeft={() => Actions.drawerClose()}>
        <View>
          <TouchableHighlight
            style={styles.xTouchWidth}
            onPress={() => Actions.pop()}>
            <WithLocalSvg style={styles.x} width={20} height={20} asset={X} />
          </TouchableHighlight>
        </View>
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
              ios: 'Pubblicazioni',
              android: 'Spazio Abbonamenti',
            })}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() =>
            Linking.openURL('https://servizi.sgi-italia.org/aderenti/')
          }>
          <Text style={styles.text}>Spazio Aderenti</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={loginOrOut}>
          <Text style={styles.text}>{isLogged ? 'Logout' : 'Login'}</Text>
        </TouchableHighlight>
        <Text style={styles.version}>
          {Platform.select({
            ios: "2.0.5 25",
            android: "2.0.0 200"
          })}
        </Text>
      </GestureRecognizer>
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
    backgroundColor: '#47A3C4',
  },
  text: {
    paddingVertical: 20,
    marginHorizontal: 15,
    color: 'white',
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
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
});
