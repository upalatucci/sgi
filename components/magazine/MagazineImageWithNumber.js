import React from 'react';
import {Image, View, StyleSheet, Dimensions} from 'react-native';
import Text from '../ui/Text';
import TouchableHighlight from '../CustomTouchableHighlight';
import {Actions} from 'react-native-router-flux';
import {Colors} from '../../styles';

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
      <Image
        source={{uri: props.number ? props.number.cover : null}}
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
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textGray,
  },
  firstMagazineText: {
    color: Colors.orange,
  },
  image: {
    height: 100,
    resizeMode: 'contain',
    borderRadius: 20,
  },
  firstMagazineImage: {
    height: 150,
  },
});
