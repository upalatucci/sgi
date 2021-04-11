import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Platform,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import CustomTouchableHighlight from './CustomTouchableHighlight';
import {BackButton} from 'react-native-router-flux/src/NavBar';
import BackButtonImage from '../assets/backButton.png';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

function getPortraitIosHeight(topInsets) {
  if (topInsets > 20) {
    return 40 + topInsets;
  } else {
    return 44 + topInsets;
  }
}

export default (props) => {
  const {top: topInsets} = useSafeAreaInsets();
  const {width: screenWidth, height: screenHeight} = useWindowDimensions();

  const isLandscape = screenWidth > screenHeight;

  const headerHeight = Platform.select({
    ios: isLandscape ? 50 + topInsets : getPortraitIosHeight(topInsets),
    android: 50,
  });

  return (
    <>
      <StatusBar barStyle="light-content" />
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
    padding: 10,
  },
  backButtonStyle: {
    marginTop: 6,
    marginLeft: 5,
  },
  rightContainer: {},
});
