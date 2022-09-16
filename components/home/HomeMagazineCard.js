import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Text from '../ui/Text';
import {
  deviceSize,
  DEVICE_SIZES,
  MAGAZINE_NAMES,
  MAGAZINE_SUBTITLES,
  MAGAZINE_TYPES,
  cannotViewMagazine,
} from '../../utils';
import TouchableHighlight from '../CustomTouchableHighlight';
import HomeLinearGradient from './HomeLinearGradient';
import {Actions} from 'react-native-router-flux';
import {Colors, FontFamilies, DefaultShadow} from '../../styles';
import {useDispatch, useSelector} from 'react-redux';
import {SHOW_MODAL} from '../../store/mutations';

export default ({magazine, magazineType, onPress, background}) => {
  const dispatch = useDispatch();
  const subInfo = useSelector((state) => state.magazine.subscriptionInfo);

  function goToMagazine() {
    if (
      magazine &&
      subInfo &&
      cannotViewMagazine(subInfo, magazineType, magazine.number)
    ) {
      dispatch({
        type: SHOW_MODAL,
        payload:
          'Il tuo abbonamento non è abilitato a consultare questa rivista',
      });
    } else {
      Actions.magazine({
        magazine,
        magazineType,
      });
    }
  }
  return (
    <TouchableHighlight
      style={styles.margin}
      onPress={() => {
        if (onPress) {
          onPress();
        } else if (Actions.currentScene !== 'magazine' && magazine) {
          goToMagazine();
        }
      }}>
      <HomeLinearGradient
        style={[styles.card, {backgroundColor: Colors.light}]}>
        <Image source={background} style={styles.backgroundImage} />
        <View style={styles.cardText}>
          {magazine?.number_desc ? (
            <Text
              style={[
                styles.cardDate,
                deviceSize === DEVICE_SIZES.SMALL ? styles.cardDateSmall : null,
              ]}
              allowFontScaling={false}>
              {magazine?.number_desc}
            </Text>
          ) : null}
          <Text
            textBreakStrategy="simple"
            style={[
              styles.cardTitle,
              magazineType === MAGAZINE_TYPES.VC ? styles.cardTitleWide : null,
              deviceSize === DEVICE_SIZES.SMALL ? styles.cardTitleSmall : null,
            ]}
            allowFontScaling={false}>
            {MAGAZINE_NAMES[magazineType]}
          </Text>
          <Text
            style={[
              styles.cardSubtitle,
              deviceSize === DEVICE_SIZES.SMALL
                ? styles.cardSubtitleSmall
                : null,
            ]}
            allowFontScaling={false}>
            {MAGAZINE_SUBTITLES[magazineType]}
          </Text>
        </View>
        <View style={styles.magazineImagesContainer}>
          <Image source={{uri: magazine?.cover}} style={styles.magazineImage} />
        </View>
      </HomeLinearGradient>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  margin: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  magazineImage: {
    height: 220,
    width: 150,
    resizeMode: 'contain',
  },
  magazineImagesContainer: {
    position: 'absolute',
    top: 50,
    left: '55%',
    transform: [{rotateZ: '10deg'}],
    zIndex: 0,
  },
  card: {
    ...DefaultShadow,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 140,
    position: 'relative',
    overflow: 'hidden',
  },
  cardText: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  cardTitle: {
    fontFamily: FontFamilies.primary,
    fontSize: 20,
    color: 'white',
    width: '60%',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  cardTitleSmall: {
    fontSize: 16,
  },
  cardTitleWide: {
    width: '100%',
  },
  cardDate: {
    fontFamily: FontFamilies.primary,
    color: '#EDF1F2',
  },
  cardDateSmall: {
    fontSize: 12,
  },
  cardSubtitle: {
    fontFamily: FontFamilies.primary,
    color: 'white',
  },
  cardSubtitleSmall: {
    fontSize: 12,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
