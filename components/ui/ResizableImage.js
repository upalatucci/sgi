import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {useImageSizeType, IMAGE_SIZE_TYPE} from '../../utils/customHooks';

export default ({image, imageWidth}) => {
  const {imageType, aspectRatio} = useImageSizeType(image);

  return (
    <Image
      source={{uri: image}}
      style={[
        styles.image,
        {width: imageWidth},
        imageType === IMAGE_SIZE_TYPE.PORTRAIT && aspectRatio
          ? {height: imageWidth / aspectRatio, resizeMode: 'contain'}
          : styles.imageLandscape,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    height: '100%',
    flexDirection: 'row',
    resizeMode: 'cover',
    borderRadius: 14,
    position: 'absolute',
    maxHeight: 200,
  },
});
