import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import Text from '../ui/Text';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../styles';
import TouchableHighlight from '../CustomTouchableHighlight';
import {SET_TEXT_SIZE} from '../../store/mutations';
import {possibleTextSizes} from '../../store/uiRecuder';

function FontSizeIcon() {
  const textSize = useSelector((state) => state.ui.textSize);
  const dispatch = useDispatch();

  const changeTextSize = useCallback(() => dispatch({type: SET_TEXT_SIZE}), [
    dispatch,
  ]);
  return (
    <TouchableHighlight onPress={changeTextSize}>
      <View style={styles.container}>
        <Text
          allowFontScaling={false}
          style={[
            styles.textsmall,
            textSize === possibleTextSizes[0] ? styles.selected : null,
          ]}>
          A
        </Text>
        <Text
          allowFontScaling={false}
          style={[
            styles.textmedium,
            textSize === possibleTextSizes[1] ? styles.selected : null,
          ]}>
          A
        </Text>
        <Text
          allowFontScaling={false}
          style={[
            styles.textlarge,
            textSize === possibleTextSizes[2] ? styles.selected : null,
          ]}>
          A
        </Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = new StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    marginRight: 0,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-evenly',
  },
  textsmall: {
    fontSize: 14,
    color: Colors.gray,
  },
  textmedium: {
    fontSize: 20,
    color: Colors.gray,
  },
  textlarge: {
    fontSize: 28,
    color: Colors.gray,
  },
  selected: {
    fontWeight: 'bold',
    color: Colors.primary,
  },
});

export default FontSizeIcon;
