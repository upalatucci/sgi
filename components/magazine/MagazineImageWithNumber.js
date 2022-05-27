import React from 'react';
import {View, StyleSheet, Dimensions, Platform} from 'react-native';
import Text from '../ui/Text';
import TouchableHighlight from '../CustomTouchableHighlight';
import {Actions} from 'react-native-router-flux';
import {Colors} from '../../styles';
import MagazineImage from './MagazineImage';
import {useDispatch, useSelector} from 'react-redux';
import {cannotViewMagazine} from '../../utils';
import {SHOW_MODAL} from '../../store/mutations';

const windowWidth = Dimensions.get('window').width;
export default ({magazine, magazineType, index}) => {
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
    <TouchableHighlight onPress={goToMagazine}>
      <View
        style={[
          styles.container,
          index === 0 ? styles.firstMagazineContainer : null,
        ]}>
        <MagazineImage
          number={magazine}
          magazineType={magazineType}
          style={[styles.image, index === 0 ? styles.firstMagazineImage : null]}
        />
        <Text
          style={[styles.text, index === 0 ? styles.firstMagazineText : null]}>
          {magazine.number}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

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
