import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IconColors} from '../../styles';

export default ({focused}) => {
  const fill = focused ? IconColors.focused : IconColors.notFocused;

  return (
    <Svg viewBox="0 0 144 112" width={35} height={35}>
      <Path
        stroke={fill}
        strokeWidth={2}
        d="M 72 104 A 50 50 0 0 1 72 24 A 50 50 0 0 1 72 104 Z"
        transform="rotate(-60 72 104)"
      />
      <Path
        stroke={fill}
        strokeWidth={2}
        d="M 72 104 A 50 50 0 0 1 72 24 A 50 50 0 0 1 72 104 Z"
        transform="rotate(60 72 104)"
      />
      <Path
        stroke={fill}
        strokeWidth={2}
        d="M 72 104 A 55 55 0 0 1 72 14 A 55 55 0 0 1 72 104 Z"
        transform="rotate(-30 72 104)"
      />
      <Path
        stroke={fill}
        strokeWidth={2}
        d="M 72 104 A 55 55 0 0 1 72 14 A 55 55 0 0 1 72 104 Z"
        transform="rotate(30 72 104)"
      />
      <Path
        stroke={fill}
        strokeWidth={2}
        d="M 72 104 A 60 60 0 0 1 72 4 A 60 60 0 0 1 72 104 Z"
      />
    </Svg>
  );
};
