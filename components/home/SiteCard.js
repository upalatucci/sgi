import React from 'react';
import {View, Linking, StyleSheet, Image} from 'react-native';
import Text from '../ui/Text';
import {WithLocalSvg} from 'react-native-svg';
import TouchableHighlight from '../CustomTouchableHighlight';
import senzatomica from '../../assets/sites/senzatomica.png';

export default ({title, icon, link}) => (
  <TouchableHighlight
    onPress={() => Linking.openURL(link)}
    style={styles.container}>
    <View style={styles.viewContainer}>
      {title === 'Senzatomica' ? (
        <Image source={senzatomica} style={styles.senzatomica} />
      ) : (
        <WithLocalSvg asset={icon} width={40} height={40} />
      )}
      <Text style={styles.text} allowFontScaling={true}>
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
  senzatomica: {
    resizeMode: 'contain',
    width: 80,
    height: 40,
  },
});
