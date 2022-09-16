import React from 'react';
import {StyleSheet, View} from 'react-native';
import SGILogo from './icons/SGILogoHome';
import TouchableHighlight from './CustomTouchableHighlight';

import ChangeFontSizeContainer from './ChangeFontSizeContainer';
import {Actions} from 'react-native-router-flux';

export default () => (
  <View style={styles.view}>
    <ChangeFontSizeContainer />
    <TouchableHighlight onPress={() => Actions.home()}>
      <SGILogo />
    </TouchableHighlight>
  </View>
);

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 110,
  },
});
