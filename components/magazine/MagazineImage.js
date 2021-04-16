import React from 'react';
import {Image} from 'react-native';
import {useImageSizeType} from '../../utils/customHooks';
import {MAGAZINE_ASPECT_RATIO} from '../../utils';

export default React.memo((props) => {
  const {aspectRatio} = useImageSizeType(props.number?.cover);

  const aspectRatioStyle = {
    aspectRatio: aspectRatio ?? MAGAZINE_ASPECT_RATIO[props.magazine],
  };

  return (
    <Image
      {...props}
      source={{uri: props.number ? props.number.cover : null}}
      style={
        Array.isArray(props.style)
          ? [...props.style, aspectRatioStyle]
          : [props.style, aspectRatioStyle]
      }
    />
  );
});
