import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Colors} from '../../styles';
import {possibleTextSizes} from '../../utils';
import TouchableHighlight from '../CustomTouchableHighlight';
import {SET_TEXT_SIZE} from '../../store/mutations';

function FontSizeIcon({textSize, changeTextSize}) {
  return (
    <TouchableHighlight onPress={changeTextSize}>
      <View style={styles.container}>
        <Text
          style={[
            styles.textsmall,
            textSize === possibleTextSizes[0] ? styles.selected : null,
          ]}>
          A
        </Text>
        <Text
          style={[
            styles.textmedium,
            textSize === possibleTextSizes[1] ? styles.selected : null,
          ]}>
          A
        </Text>
        <Text
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
    marginRight: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-evenly',
  },
  textsmall: {
    fontSize: 16,
    color: Colors.gray,
  },
  textmedium: {
    fontSize: 24,
    color: Colors.gray,
  },
  textlarge: {
    fontSize: 32,
    color: Colors.gray,
  },
  selected: {
    fontWeight: 'bold',
    color: Colors.primary,
  },
});

function mapStateToProps(state) {
  return {
    textSize: state.ui.textSize,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeTextSize: () => dispatch({type: SET_TEXT_SIZE}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FontSizeIcon);
