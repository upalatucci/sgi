import React from 'react';
import {View, StyleSheet, Dimensions, Platform} from 'react-native';
import Text from '../ui/Text';
import TouchableHighlight from '../CustomTouchableHighlight';
import {Actions} from 'react-native-router-flux';
import {Colors} from '../../styles';
import MagazineImage from './MagazineImage';

const windowWidth = Dimensions.get('window').width;
export default React.memo((props) => (
  <TouchableHighlight
    onPress={() =>
      props.number
        ? Actions.magazine({
            number: props.number,
            magazine: props.magazine,
          })
        : null
    }>
    <View
      style={[
        styles.container,
        props.index === 0 ? styles.firstMagazineContainer : null,
      ]}>
      <MagazineImage
        number={props.number}
        magazine={props.magazine}
        style={[
          styles.image,
          props.index === 0 ? styles.firstMagazineImage : null,
        ]}
      />
      <Text
        style={[
          styles.text,
          props.index === 0 ? styles.firstMagazineText : null,
        ]}>
        {props.number.number}
      </Text>
    </View>
  </TouchableHighlight>
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: windowWidth / 4,
    maxWidth: 200,
    padding: 10,
  },
  firstMagazineContainer: {
    width: windowWidth / 2.6,
  },
  text: {
    height: 30,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textGray,
  },
  firstMagazineText: {
    color: Colors.orange,
    fontSize: 18,
  },
  image: {
    height: 80,
    resizeMode: 'contain',
    borderRadius: Platform.select({
      android: 30,
      ios: 20,
    }),
    alignSelf: 'center',
  },
  firstMagazineImage: {
    height: 130,
    borderRadius: Platform.select({
      android: 35,
      ios: 20,
    }),
    marginLeft: 0,
  },
});
