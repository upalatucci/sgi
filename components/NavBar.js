import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import CustomTouchableHighlight from './CustomTouchableHighlight';
import {BackButton} from 'react-native-router-flux/src/NavBar';
import BackButtonImage from '../assets/backButton.png';

export default (props) => {
  const headerHeight = Platform.select({
    ios: 80,
    android: 50,
  });

  return (
    <>
      <StatusBar />
      <View style={[styles.container, {height: headerHeight}]}>
        <LinearGradient
          style={styles.linearGradinet}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#fff', '#F4F4F4']}>
          {props.back ? (
            <BackButton
              {...props}
              backButtonImage={BackButtonImage}
              leftButtonStyle={styles.backButtonStyle}
            />
          ) : (
            <CustomTouchableHighlight
              style={styles.drawerIconContainer}
              onPress={() => Actions.drawerOpen()}>
              {props.drawerIcon(props)}
            </CustomTouchableHighlight>
          )}

          <CustomTouchableHighlight onPress={props.onRight}>
            <>{props.renderRightButton(props)}</>
          </CustomTouchableHighlight>
        </LinearGradient>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f4',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  linearGradinet: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: 4,
  },
  drawerIconContainer: {
    marginBottom: 10,
    marginLeft: 10,
  },
  backButtonStyle: {
    marginTop: 6,
    marginLeft: 5,
  },
  rightContainer: {},
});
