import {useState} from 'react';
import {Image} from 'react-native';

export const IMAGE_SIZE_TYPE = {
  PORTRAIT: 'PORTRAIT',
  LANDSCAPE: 'LANDSCAPE',
};

export function useImageSizeType(imageUrl) {
  const [imageType, setImageType] = useState();

  Image.getSize(imageUrl, (width, height) => {
    setImageType(
      width > height ? IMAGE_SIZE_TYPE.LANDSCAPE : IMAGE_SIZE_TYPE.PORTRAIT,
    );
  });

  return imageType;
}
