import React, {useState, useCallback, useRef} from 'react';
import {View, SafeAreaView, StyleSheet, Animated, Easing} from 'react-native';
import Text from './ui/Text';
import TouchableHighlight from './CustomTouchableHighlight';
import HomeIcon from '../assets/tabs/home.svg';
import UserIcon from '../assets/tabs/user.svg';
import FeatherIcon from '../assets/tabs/feather.svg';
import BookIcon from '../assets/tabs/book-open.svg';
import {WithLocalSvg} from 'react-native-svg';
import {Actions} from 'react-native-router-flux';
import {Colors} from '../styles';

const AnimatedSafeView = Animated.createAnimatedComponent(SafeAreaView);
export default (props) => {
  const height = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const opacity = useRef(new Animated.Value(0)).current;
  const [tabOpen, setTabOpen] = useState(false);

  const showAdditionalTabs = useCallback(() => {
    if (!tabOpen) {
      height.setValue(0);
      opacity.setValue(0);

      Animated.timing(height, {
        toValue: -50,
        duration: 700,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();

      Animated.timing(opacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
    } else {
      Animated.timing(height, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();

      Animated.timing(opacity, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
    }

    setTabOpen(!tabOpen);
  }, [height, opacity, tabOpen]);

  const showProfileWithAnimation = useCallback(() => {
    showAdditionalTabs();
  }, [showAdditionalTabs]);

  return (
    <AnimatedSafeView
      style={[
        styles.container,
        height
          ? {
              transform: [
                {
                  translateY: height,
                },
              ],
            }
          : null,
      ]}>
      <View style={styles.tabsContainer}>
        <View>
          <TouchableHighlight onPress={() => Actions.home()}>
            <WithLocalSvg asset={HomeIcon} />
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight onPress={() => Actions.frasedelgiorno()}>
            <WithLocalSvg asset={FeatherIcon} />
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight onPress={() => Actions.magazines()}>
            <WithLocalSvg asset={BookIcon} />
          </TouchableHighlight>
        </View>
        <TouchableHighlight onPress={showProfileWithAnimation}>
          <WithLocalSvg asset={UserIcon} />
        </TouchableHighlight>
      </View>
      <Animated.View
        style={[styles.userSpaceStyle, opacity ? {opacity} : null]}>
        <Text style={styles.menuText}>Spazio Aderenti</Text>
        <Text style={styles.menuText}>Spazio Abbonamenti</Text>
      </Animated.View>
    </AnimatedSafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    bottom: -200,
    paddingHorizontal: 10,
    paddingTop: 13,
    width: '100%',
    height: 250,
    zIndex: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  userSpaceStyle: {
    height: 60,
    justifyContent: 'space-evenly',
  },
  menuText: {
    color: Colors.textGray,
  },
});
