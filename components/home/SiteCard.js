import React from 'react';
import {View, Text, Linking, StyleSheet} from 'react-native';
import {WithLocalSvg} from 'react-native-svg';
import TouchableHighlight from '../CustomTouchableHighlight';

export default ({title, icon, link}) => (
  <TouchableHighlight
    onPress={() => Linking.openURL(link)}
    style={styles.container}>
    <View style={styles.viewContainer}>
      {title === 'Senzatomica' ? (
        <WithLocalSvg asset={icon} width={50} height={40} />
      ) : (
        <WithLocalSvg asset={icon} width={40} height={40} />
      )}
      <Text style={styles.text} allowFontScaling={false}>
        {title}
      </Text>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
  },
  viewContainer: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
