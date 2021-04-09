import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Text from './ui/Text';
import {Actions} from 'react-native-router-flux';
import TouchableHighlight from './CustomTouchableHighlight';
import {TitleStyle, Colors} from '../styles';
import {transformDate} from '../utils';
import {useImageSizeType, IMAGE_SIZE_TYPE} from '../utils/customHooks';

const IMAGE_WIDTH = 150;

const ResizableImage = ({image}) => {
  const {imageType, aspectRatio} = useImageSizeType(image);

  return (
    <Image
      source={{uri: image}}
      style={[
        styles.image,
        imageType === IMAGE_SIZE_TYPE.PORTRAIT && aspectRatio
          ? {height: IMAGE_WIDTH / aspectRatio, resizeMode: 'contain'}
          : styles.imageLandscape,
      ]}
    />
  );
};

export default ({title, date, image, id, entrypoint, uri}) => {
  return (
    <TouchableHighlight
      style={styles.container}
      onPress={() => Actions.postPage({id, entrypoint, uri, title})}>
      <View style={[styles.container, styles.newsContainer]}>
        {image ? <ResizableImage image={image} /> : null}
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
  image: {
    height: '100%',
    flexDirection: 'row',
    resizeMode: 'cover',
    borderRadius: 14,
    position: 'absolute',
    width: IMAGE_WIDTH,
    maxHeight: 200,
  },
  subtitle: {
    color: Colors.textGray,
  },
  imageLandscape: {},
  imagePortrait: {
    height: 200,
  },
});
