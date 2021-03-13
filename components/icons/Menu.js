import React from 'react';
import Svg, {Line, G} from 'react-native-svg';

export default () => (
  <Svg width={30} height={7} viewBox="0 0 32 7">
    <G transform="translate(-19.5 -37.5)">
      <Line
        x2={30}
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        transform="translate(20.5 38.5)"
      />
      <Line
        x2={15}
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        transform="translate(20.5 44)"
      />
    </G>
  </Svg>
);
