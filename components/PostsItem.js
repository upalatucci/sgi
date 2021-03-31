import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import TouchableHighlight from './CustomTouchableHighlight';
import {TitleStyle, Colors} from '../styles';
import {transformDate} from '../utils';
import {useImageSizeType, IMAGE_SIZE_TYPE} from '../utils/customHooks';

const ResizableImage = ({image}) => {
  const imageSize = useImageSizeType(image);
  return (
    <Image
      source={{uri: image}}
      style={[
        styles.image,
        imageSize === IMAGE_SIZE_TYPE.PORTRAIT
          ? styles.imagePortrait
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
        <View style={[styles.container, styles.textContainer]}>
          <Text style={styles.subtitle}>{transformDate(date)}</Text>
          <Text style={styles.title}>{title}</Text>
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
    marginLeft: 164,
  },
  newsContainer: {
    minHeight: 150,
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
    width: 150,
  },
  subtitle: {
    color: Colors.textGray,
  },
  imageLandscape: {},
  imagePortrait: {
    height: 200,
  },
});
