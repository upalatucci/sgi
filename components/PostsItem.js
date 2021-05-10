import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from './ui/Text';
import {Actions} from 'react-native-router-flux';
import TouchableHighlight from './CustomTouchableHighlight';
import {TitleStyle, Colors} from '../styles';
import {transformDate} from '../utils';
import ResizableImage from './ui/ResizableImage';

const IMAGE_WIDTH = 150;

export default ({title, date, image, id, entrypoint, uri}) => {
  return (
    <TouchableHighlight
      style={styles.container}
      onPress={() => Actions.postPage({id, entrypoint, uri, title})}>
      <View style={[styles.container, styles.newsContainer]}>
        {image ? (
          <ResizableImage image={image} imageWidth={IMAGE_WIDTH} />
        ) : null}
        <View
          style={[
            styles.container,
            styles.textContainer,
            image ? styles.textLeft : styles.textNoImage,
          ]}>
          <Text style={styles.subtitle} allowFontScaling={false}>
            {transformDate(date)}
          </Text>
          <Text style={styles.title} allowFontScaling={false}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    ...TitleStyle,
    marginTop: 3,
    marginBottom: 6,
  },
  textContainer: {
    marginTop: 10,
  },
  textLeft: {
    marginLeft: 164,
  },
  textNoImage: {
    marginLeft: 10,
  },
  newsContainer: {
    minHeight: IMAGE_WIDTH,
    marginBottom: 30,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 14,
    paddingRight: 4,
    overflow: 'hidden',
  },
  subtitle: {
    color: Colors.textGray,
  },
});
