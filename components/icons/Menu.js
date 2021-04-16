import React from 'react';
import Svg, {Line, G} from 'react-native-svg';

export default () => (
  <Svg width={32} height={25} style={{marginLeft: 6}} viewBox="0 0 32 18">
    <G transform="translate(-19.5 -35)">
      <Line
        x2={30}
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        transform="translate(20.5 36)"
      />
      <Line
        x2={30}
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        transform="translate(20.5 44)"
      />
      <Line
        x2={30}
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        transform="translate(20.5 52)"
      />
    </G>
  </Svg>
);
