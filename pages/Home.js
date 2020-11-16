import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import * as Keychain from 'react-native-keychain';

import {fetchLastNRImage, fetchLastBSImage} from '../store/magazineAction';
import TouchableHighlight from '../components/CustomTouchableHighlight';
import {getJsonData} from '../api';
import {login} from '../services/auth';

import logoSGI from '../assets/logo_SGI_2020.png';
import {TitleStyle, DefaultShadow, Colors, FontFamilies} from '../styles';
import voloContinuoImage from '../assets/il-volo-continuo-logo.png';
import logo from '../assets/logo.png';
import FeatherWrite from '../components/icons/FeatherWrite';
import MagazineImage from '../components/magazine/MagazineImage';
import {SET_SUBSCRIPTION_INFO} from '../store/mutations';

const Home = ({lastBS, lastNR, fetchBS, fetchNR, setSubscriptionInfo}) => {
  const [lastNewsImage, setLastNewsImage] = useState();

  function fetchLastNews() {
    return getJsonData('news', {
      posts_per_page: 1,
    }).then((newContent) => {
      if (
        newContent.data &&
        newContent.data[0].image &&
        newContent.data[0].image.length > 0
      ) {
        setLastNewsImage(newContent.data[0].image);
      }
    });
  }

  useEffect(() => {
    Keychain.resetGenericPassword();

    Keychain.getGenericPassword().then(async (credentials) => {
      if (credentials) {
        const response = await login(
          credentials.username,
          credentials.password,
        );
        setSubscriptionInfo(response);
      }
    });
  }, [setSubscriptionInfo]);

  useEffect(() => {
    fetchBS();
    fetchNR();
    fetchLastNews();
  }, [fetchNR, fetchBS]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.welcome}>
          <Image source={logoSGI} style={styles.image} />
        </View>
        <TouchableHighlight onPress={() => Actions.news()}>
          <View style={[styles.card, {backgroundColor: Colors.light}]}>
            <Text style={[styles.cardTitle, {color: Colors.blue}]}>News</Text>
            <View style={styles.cardImagesContainer}>
              <Image source={{uri: lastNewsImage}} style={styles.cardImage} />
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => Actions.buddismo()}>
          <View style={[styles.card, {backgroundColor: Colors.light}]}>
            <View style={styles.cardImagesContainer}>
              <Image source={logo} style={styles.buddismoImageStyle} />
            </View>
            <Text style={[styles.cardTitle, {color: Colors.blue}]}>
              Buddismo
            </Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => Actions.riviste()}>
          <View style={[styles.card, {backgroundColor: Colors.light}]}>
            <Text style={[styles.cardTitle, {color: Colors.blue}]}>
              Riviste
            </Text>
            <View style={styles.cardImagesContainer}>
              <MagazineImage
                number={lastBS}
                magazine="bs"
                style={styles.magazineImage}
              />
              <MagazineImage
                number={lastNR}
                magazine="nr"
                style={styles.magazineImage}
              />
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => Actions.frasedelgiorno()}>
          <View style={[styles.card, {backgroundColor: Colors.light}]}>
            <View style={styles.cardImagesContainer}>
              <FeatherWrite color={Colors.blue} height={140} width={100} />
            </View>
            <Text style={[styles.cardTitle, {color: Colors.blue}]}>
              Frase Del Giorno
            </Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => Actions.news()}>
          <View
            style={[
              styles.card,
              styles.cardImageVolo,
              {backgroundColor: Colors.blue},
            ]}>
            <Image
              source={voloContinuoImage}
              style={[styles.cardImage, styles.imageVolo]}
            />
          </View>
        </TouchableHighlight>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColorPrimary,
  },
  welcome: {
    height: 160,
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    ...DefaultShadow,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  image: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  welcomeTitle: {
    ...TitleStyle,
    fontSize: 20,
  },
  magazineImage: {
    height: 120,
    width: 100,
    resizeMode: 'contain',
  },
  buddismoImageStyle: {
    height: 120,
    width: 100,
    resizeMode: 'contain',
  },

  card: {
    margin: 20,
    ...DefaultShadow,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 160,
  },
  cardInverse: {
    flexDirection: 'row-reverse',
  },
  cardImage: {
    height: 120,
    width: 150,
    resizeMode: 'contain',
  },
  cardTitle: {
    fontFamily: FontFamilies.primary,
    padding: 20,
    fontSize: 28,
    color: 'white',
  },
  cardImageVolo: {
    justifyContent: 'center',
  },
  imageVolo: {
    width: '80%',
  },
  cardImagesContainer: {
    flexDirection: 'row',
    marginHorizontal: 8,
  },
});

const mapStateToProps = (state) => {
  return {
    lastBS: state.magazine.lastBS,
    lastNR: state.magazine.lastNR,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBS: () => dispatch(fetchLastBSImage()),
    fetchNR: () => dispatch(fetchLastNRImage()),
    setSubscriptionInfo: (subInfo) =>
      dispatch({type: SET_SUBSCRIPTION_INFO, payload: subInfo}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
