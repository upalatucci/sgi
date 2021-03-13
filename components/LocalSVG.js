import React, {useState, useEffect} from 'react';
import {SvgCss} from 'react-native-svg';
import loadLocalResource from 'react-native-local-resource';

export function LocalSvg({asset, ...rest}) {
  const [xml, setXml] = useState(null);
  useEffect(() => {
    loadLocalResource(asset).then(setXml);
  }, [asset]);
  return <SvgCss xml={xml} {...rest} />;
}
