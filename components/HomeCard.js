import React from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {DefaultShadow} from '../styles';

export default React.memo(
  ({title, backgroundColor, inverse, onPress, image, imageStyle}) => (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#fff"
      onPress={onPress}>
      <View
        style={[
          styles.card,
          {backgroundColor},
          inverse ? styles.inverse : null,
        ]}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.imagesContainer}>
          {typeof image === 'object' ? (
            image.map((i) =>
              i.uri ? (
                <Image
                  source={i}
                  key={i.uri}
                  style={imageStyle ? imageStyle : styles.image}
                />
              ) : null,
            )
          ) : (
            <Image
              source={image}
              style={imageStyle ? imageStyle : styles.image}
            />
          )}
        </View>
      </View>
    </TouchableHighlight>
  ),
);

const styles = StyleSheet.create({
  card: {
    margin: 20,
    ...DefaultShadow,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 160,
  },
  inverse: {
    flexDirection: 'row-reverse',
  },
  image: {
    height: 160,
    width: 150,
    resizeMode: 'cover',
  },
  title: {
    padding: 20,
    fontSize: 28,
    color: 'white',
  },
  imagesContainer: {
    flexDirection: 'row',
  },
});
