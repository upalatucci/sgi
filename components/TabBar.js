import React, {useState, useCallback, useRef} from 'react';
import {View, SafeAreaView, StyleSheet, Animated, Easing} from 'react-native';
import Text from './ui/Text';
import TouchableHighlight from './CustomTouchableHighlight';

const AnimatedSafeView = Animated.createAnimatedComponent(SafeAreaView);
export default (props) => {
  const [showProfile, setShowProfile] = useState(false);
  const height = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const opacity = useRef(new Animated.Value(0)).current;

  const showAdditionalTabs = useCallback(() => {
    height.setValue(0);
    opacity.setValue(0);

    Animated.timing(height, {
      toValue: -100,
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
  }, [height, opacity]);

  const showProfileWithAnimation = useCallback(() => {
    setShowProfile(!showProfile);
    showAdditionalTabs();
  }, [showAdditionalTabs, showProfile]);

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
          <Text>Home</Text>
        </View>
        <View>
          <Text>Frase</Text>
        </View>
        <View>
          <Text>Riviste</Text>
        </View>
        <TouchableHighlight onPress={showProfileWithAnimation}>
          <Text>Profilo</Text>
        </TouchableHighlight>
      </View>
      {showProfile && (
        <View style={[opacity ? {opacity} : null]}>
          <View>
            <Text>Spazio Aderenti</Text>
          </View>

          <View>
            <Text>Spazio Abbonamenti</Text>
          </View>
        </View>
      )}
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
    paddingTop: 10,
    width: '100%',
    height: 270,
    zIndex: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  view: {},
});
