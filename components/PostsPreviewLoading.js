import React, {useCallback, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Animated,
  Easing,
} from 'react-native';
import {Colors} from '../styles';
import {TEXT_HEIGHT} from './PostsPreview';

export default ({height}) => {
  const {width: screenWidth} = useWindowDimensions();

  const loadingValue = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const loading = useCallback(() => {
    loadingValue.setValue(0);

    Animated.timing(loadingValue, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => loading());
  }, [loadingValue]);

  useEffect(() => {
    loading();
  }, [loading]);

  const loadingInterpolation = loadingValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.3, 0],
  });

  return (
    <View style={[styles.container, {width: screenWidth * 0.85, height}]}>
      <Animated.View
        style={[
          {height: height - TEXT_HEIGHT, opacity: loadingInterpolation},
          styles.background,
        ]}
      />
      <View style={[{height: TEXT_HEIGHT}, styles.textContainer]}>
        <Animated.View
          style={[styles.textBackground, {opacity: loadingInterpolation}]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
  },
  background: {
    backgroundColor: Colors.gray,
    borderRadius: 20,
  },
  textBackground: {
    backgroundColor: Colors.gray,
    height: 20,
    width: '100%',
  },
  textContainer: {
    marginTop: 10,
  },
});
