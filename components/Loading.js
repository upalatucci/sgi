import React, {useEffect, useRef, useCallback} from 'react';
import {View, Text, StyleSheet, Animated, Easing} from 'react-native';

export default ({absolutePositioning = true, withText = true}) => {
  const rotation = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const spin = useCallback(() => {
    rotation.setValue(0);

    Animated.timing(rotation, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => spin());
  }, [rotation]);

  useEffect(() => {
    spin();
  }, [spin]);

  const spinAnimation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View
      style={[
        styles.container,
        absolutePositioning ? styles.containerAbsolutePosition : null,
      ]}>
      <Animated.View
        style={[
          styles.spinner,
          rotation
            ? {
                transform: [
                  {
                    rotate: spinAnimation,
                  },
                ],
              }
            : null,
        ]}
      />
      {withText ? <Text style={styles.text}>Loading...</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    width: 50,
    height: 50,
    borderRadius: 40,
    borderColor: 'rgb(200, 200, 200)',
    borderTopColor: 'rgb(100, 100, 100)',
    borderWidth: 5,
  },
  containerAbsolutePosition: {
    position: 'absolute',
  },
});
