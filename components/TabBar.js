import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Animated,
  Easing,
  Linking,
} from 'react-native';
import Text from './ui/Text';
import TouchableHighlight from './CustomTouchableHighlight';
import HomeIcon from '../assets/tabs/home.svg';
import UserIcon from '../assets/tabs/user.svg';
import FeatherIcon from '../assets/tabs/feather.svg';
import BookIcon from '../assets/tabs/book-open.svg';
import {WithLocalSvg} from 'react-native-svg';
import {Actions} from 'react-native-router-flux';
import {Colors} from '../styles';
import {useDispatch, useSelector} from 'react-redux';
import {LOGOUT} from '../store/mutations';

const AnimatedSafeView = Animated.createAnimatedComponent(SafeAreaView);
export default (props) => {
  const isLogged = useSelector((state) => state.magazine.isLogged);
  const dispatch = useDispatch();
  const height = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const opacity = useRef(new Animated.Value(0)).current;
  const [tabOpen, setTabOpen] = useState(false);

  const homeSelected = props.navigation.state.index === 0;
  const newsSelected = props.navigation.state.index === 1;
  const fraseDelGiornoSelected = props.navigation.state.index === 2;
  const rivisteSelected = props.navigation.state.index === 3;

  const toggleAdditionalTabs = useCallback(() => {
    if (!tabOpen) {
      height.setValue(0);
      opacity.setValue(0);

      Animated.timing(height, {
        toValue: -90,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();

      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
    } else {
      Animated.timing(height, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();

      Animated.timing(opacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
    }

    setTabOpen(!tabOpen);
  }, [height, opacity, tabOpen]);

  const withProfileClose = (navigationAction) => {
    return () => {
      if (tabOpen) {
        toggleAdditionalTabs();
      }
      navigationAction();
    };
  };

  const loginOrOut = () => {
    console.log(isLogged);
    if (isLogged) {
      dispatch({type: LOGOUT});
      withProfileClose(Actions.home)();
    } else {
      withProfileClose(Actions.login)();
    }
  };

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
          <TouchableHighlight onPress={withProfileClose(Actions.home)}>
            <View style={styles.tabView}>
              <WithLocalSvg
                width={20}
                height={20}
                asset={HomeIcon}
                color={homeSelected ? Colors.lightBlue : Colors.textGray}
              />
              <Text
                style={[
                  styles.tabText,
                  {color: homeSelected ? Colors.lightBlue : Colors.textGray},
                ]}>
                Home
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight onPress={withProfileClose(Actions.news)}>
            <View style={styles.tabView}>
              <WithLocalSvg
                width={20}
                height={20}
                asset={HomeIcon}
                color={newsSelected ? Colors.lightBlue : Colors.textGray}
              />
              <Text
                style={[
                  styles.tabText,
                  {color: newsSelected ? Colors.lightBlue : Colors.textGray},
                ]}>
                News
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight
            onPress={withProfileClose(Actions.frasedelgiorno)}>
            <View style={styles.tabView}>
              <WithLocalSvg
                width={20}
                height={20}
                asset={FeatherIcon}
                color={
                  fraseDelGiornoSelected ? Colors.lightBlue : Colors.textGray
                }
              />
              <Text
                style={[
                  styles.tabText,
                  {
                    color: fraseDelGiornoSelected
                      ? Colors.lightBlue
                      : Colors.textGray,
                  },
                ]}>
                Frasi del giorno
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight onPress={withProfileClose(Actions.magazines)}>
            <View style={styles.tabView}>
              <WithLocalSvg
                width={20}
                height={20}
                asset={BookIcon}
                color={rivisteSelected ? Colors.lightBlue : Colors.textGray}
              />
              <Text
                style={[
                  styles.tabText,
                  {color: rivisteSelected ? Colors.lightBlue : Colors.textGray},
                ]}>
                Riviste
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <TouchableHighlight onPress={toggleAdditionalTabs}>
          <View style={styles.tabView}>
            <WithLocalSvg
              width={20}
              height={20}
              asset={UserIcon}
              color={tabOpen ? Colors.lightBlue : Colors.textGray}
            />
            <Text
              style={[
                styles.tabText,
                {color: tabOpen ? Colors.lightBlue : Colors.textGray},
              ]}>
              Profilo
            </Text>
          </View>
        </TouchableHighlight>
      </View>
      <Animated.View
        style={[styles.userSpaceStyle, opacity ? {opacity} : null]}>
        <TouchableHighlight
          onPress={() =>
            tabOpen &&
            Linking.openURL('https://servizi.sgi-italia.org/aderenti/')
          }>
          <Text style={styles.menuText}>Spazio Aderenti</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() =>
            tabOpen &&
            Linking.openURL('https://servizi.sgi-italia.org/abbonamenti/')
          }>
          <Text style={styles.menuText}>Spazio Abbonamenti</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={loginOrOut}>
          <Text style={[styles.menuText]}>{isLogged ? 'Logout' : 'Login'}</Text>
        </TouchableHighlight>
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
    bottom: -220,
    paddingHorizontal: 10,
    paddingTop: 13,
    width: '100%',
    height: 280,
    zIndex: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  userSpaceStyle: {
    height: 80,
    justifyContent: 'space-evenly',
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  menuText: {
    color: Colors.textGray,
    paddingVertical: 10,
  },
  tabView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 4,
    minWidth: 50,
  },
  tabText: {
    textAlign: 'center',
    fontSize: 10,
  },
});
