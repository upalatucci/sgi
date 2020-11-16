import React from 'react';
import {Image} from 'react-native';
import TouchableHighlight from '../CustomTouchableHighlight';
import {Actions} from 'react-native-router-flux';

export default React.memo((props) => (
  <TouchableHighlight
    style={props.containerStyle}
    onPress={() =>
      props.number
        ? Actions.magazine({
            number: props.number,
            magazine: props.magazine,
          })
        : null
    }>
    <Image
      {...props}
      source={{uri: props.number ? props.number.cover : null}}
    />
  </TouchableHighlight>
));
