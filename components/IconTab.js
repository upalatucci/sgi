import React from 'react';
import {TouchableHighlight} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

export default ({iconName}) => (
  <TouchableHighlight>
    <Icon name={iconName} size={28} />
  </TouchableHighlight>
);
