import React from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'
import { MAGAZINE_NAMES } from '../../utils'
import TouchableHighlight from '../CustomTouchableHighlight';
import HomeLinearGradient from './HomeLinearGradient';
import MagazineImage from '../magazine/MagazineImage';
import {Actions} from 'react-native-router-flux';
import {Colors, FontFamilies, DefaultShadow} from '../../styles';

export default ({magazine, magazineType}) => (
  <TouchableHighlight
    style={{margin: 20}}
    onPress={() => {
      if(!magazine)
        return
      else {
        if (Actions.currentScene !== "magazine")
          Actions.magazine({
            number: magazine,
            magazine: magazineType,
          })
      }
    }}>
    <HomeLinearGradient style={[styles.card, {backgroundColor: Colors.light}]}>
      <View style={styles.cardText}>
        <Text style={[styles.cardSubTitle]}>
          {magazine?.number_desc}
        </Text>
        <Text style={[styles.cardTitle]}>
          {MAGAZINE_NAMES[magazineType]}
        </Text>
      </View>
      <View style={styles.magazineImagesContainer}>
        <Image
          source={{uri: magazine?.cover}}
          style={styles.magazineImage}
        />
      </View>
    </HomeLinearGradient>
  </TouchableHighlight>
)

const styles = StyleSheet.create({
  magazineImage: {
    height: 220,
    width: 200,
    resizeMode: 'contain',
  },
  magazineImagesContainer: {
    position: "absolute",
    top: 70,
    left: "40%",
    transform: [{rotateZ: "10deg"}],
    zIndex: 0
  },
  card: {
    ...DefaultShadow,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 160,
    position: "relative",
    overflow: "hidden"
  },
  cardText: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
    zIndex: 1
  },
  cardTitle: {
    fontFamily: FontFamilies.primary,
    flexWrap: "wrap",
    flex: 1,
    fontSize: 24,
    color: 'white',
  },
  cardSubTitle: {
    fontFamily: FontFamilies.primary,
    color: "white"
  },
})