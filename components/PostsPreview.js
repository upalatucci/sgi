import React from 'react';
import {View, StyleSheet, Image, useWindowDimensions} from 'react-native';
import Text from './ui/Text';
import {Actions} from 'react-native-router-flux';
import TouchableHighlight from './CustomTouchableHighlight';

export const TEXT_HEIGHT = 100;
export default ({title, date, image, id, entrypoint, uri, excerpt, height}) => {
  const {width: screenWidth} = useWindowDimensions();

  return (
    <TouchableHighlight
      style={{height}}
      onPress={() => Actions.postPage({id, entrypoint, uri, title})}>
      <View style={[styles.newsContainer, {width: screenWidth * 0.85, height}]}>
        {image ? (
          <Image
            source={{uri: image}}
            style={[styles.image, {height: height - TEXT_HEIGHT}]}
          />
        ) : null}
        <View
          style={[styles.textContainer, !image ? styles.textNoImage : null]}>
          <Text style={styles.title} allowFontScaling={false} numberOfLines={1}>
            {title}
          </Text>
          <Text
            style={styles.subtitle}
            allowFontScaling={false}
            numberOfLines={2}>
            {excerpt.trim()}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 3,
    marginBottom: 6,
    fontWeight: 'bold',
  },
  textContainer: {
    marginTop: 10,
    height: TEXT_HEIGHT,
  },
  textNoImage: {},
  newsContainer: {
    marginRight: 20,
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    borderRadius: 20,
  },
});
