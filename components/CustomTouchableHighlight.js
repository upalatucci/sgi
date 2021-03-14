import React from 'react';
import {TouchableHighlight} from 'react-native';

export default (props) => (
  <TouchableHighlight {...props} underlayColor="#fff6" activeOpacity={0.6}>
    {props.children}
  </TouchableHighlight>
);
