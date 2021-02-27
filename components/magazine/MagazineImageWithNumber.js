import React from 'react';
import {Image, Text, View, StyleSheet, Dimensions} from 'react-native';
import TouchableHighlight from '../CustomTouchableHighlight';
import {Actions} from 'react-native-router-flux';
import {Colors} from '../../styles';

const windowWidth = Dimensions.get('window').width;
export default React.memo((props) => (
  <TouchableHighlight
    style={props.containerStyle}
    onPress={() =>
      props.number
        ? Actions.magazine({
            number: props.number,
            magazine: props.magazine,
          })
        : null
    }>
    <View style={styles.container}>
      <Image
        {...props}
        source={{uri: props.number ? props.number.cover : null}}
        style={styles.image}
      />
      <Text style={styles.text}>{props.number.number}</Text>
    </View>
  </TouchableHighlight>
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: windowWidth / 3.5,
    padding: 10,
  },
  text: {
<<<<<<< HEAD
    flex: 1,
=======
    height: 30,
>>>>>>> bb7dc9d7ddaaba19969fc3fa8b9d5b5dbaa2f38a
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.orange,
  },
  image: {
<<<<<<< HEAD
    flex: 6,
=======
    flex: 1,
>>>>>>> bb7dc9d7ddaaba19969fc3fa8b9d5b5dbaa2f38a
    resizeMode: 'contain',
  },
});
