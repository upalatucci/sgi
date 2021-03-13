import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

export default ({children, style}) => (
  <LinearGradient
    start={{x: 0, y: 0}}
    end={{x: 1, y: 0}}
    colors={['#0090AE', '#004664']}
    {...{style}}>
    {children}
  </LinearGradient>
);
