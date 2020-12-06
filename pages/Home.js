import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ScrollView, Linking} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import * as Keychain from 'react-native-keychain';

import {fetchLastNRImage, fetchLastBSImage} from '../store/magazineAction';
import TouchableHighlight from '../components/CustomTouchableHighlight';
import {getJsonData, SGI_ENTRYPOINT, VOLO_ENTRYPOINT} from '../api';
import {login} from '../services/auth';

import logoSGI from '../assets/logo_SGI_2020.png';
import {TitleStyle, DefaultShadow, Colors, FontFamilies} from '../styles';
import voloContinuoImage from '../assets/il-volo-continuo-logo.png';
import logo from '../assets/logo.png';
import FeatherWrite from '../components/icons/FeatherWrite';
import MagazineImage from '../components/magazine/MagazineImage';
import {SET_SUBSCRIPTION_INFO} from '../store/mutations';

const Home = ({lastBS, lastNR, fetchBS, fetchNR, setSubscriptionInfo}) => {
  const [lastNews, setLastNews] = useState();

  function fetchLastNews() {
    return getJsonData('news', {
      posts_per_page: 1,
    }).then((newContent) => {
      if (newContent.data && newContent.data.length > 0) {
        setLastNews(newContent.data[0]);
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
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.welcome}>
          <Image source={logoSGI} style={styles.image} />
        </View>
        <TouchableHighlight
          style={styles.cardHighlight}
          onPress={() =>
            Actions.posts({
              title: 'News',
              uri: 'news',
              entrypoint: SGI_ENTRYPOINT,
            })
          }>
          <View style={[styles.card, {backgroundColor: Colors.light}]}>
            <Text style={[styles.cardTitle, {color: Colors.blue}]}>News</Text>
            <View style={styles.cardImagesContainer}>
              <TouchableHighlight
                style={styles.cardHighlight}
                onPress={() =>
                  lastNews
                    ? Actions.postPage({
                        id: lastNews.id,
                        entrypoint: SGI_ENTRYPOINT,
                        uri: 'news',
                        title: lastNews.title,
                      })
                    : null
                }>
                <Image
                  source={{uri: lastNews ? lastNews.image : null}}
                  style={styles.cardImage}
                />
              </TouchableHighlight>
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.cardHighlight}
          onPress={() => Actions.buddismo()}>
          <View style={[styles.card, {backgroundColor: Colors.light}]}>
            <View style={styles.cardImagesContainer}>
              <Image source={logo} style={styles.buddismoImageStyle} />
            </View>
            <Text style={[styles.cardTitle, {color: Colors.blue}]}>
              Buddismo
            </Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.cardHighlight}
          onPress={() => Actions.magazines()}>
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

        <TouchableHighlight
          style={styles.cardHighlight}
          onPress={() => Actions.frasedelgiorno()}>
          <View style={[styles.card, {backgroundColor: Colors.light}]}>
            <View style={styles.cardImagesContainer}>
              <FeatherWrite color={Colors.blue} height={140} width={100} />
            </View>
            <Text style={[styles.cardTitle, {color: Colors.blue}]}>
              Frase Del Giorno
            </Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.cardHighlight}
          onPress={() =>
            Actions.posts({
              title: 'Il Volo Continuo',
              uri: 'posts',
              entrypoint: VOLO_ENTRYPOINT,
            })
          }>
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

        <TouchableHighlight
          style={styles.cardHighlight}
          onPress={() =>
            Actions.webview({
              title: 'Spazio Aderenti',
              uri: 'https://servizi.sgi-italia.org/aderenti/',
            })
          }>
          <View style={[styles.card, {backgroundColor: Colors.light}]}>
            <Text style={[styles.cardTitle, {color: Colors.blue}]}>
              Spazio Aderenti
            </Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.cardHighlight}
          onPress={() =>
            Linking.openURL('https://servizi.sgi-italia.org/abbonamenti/')
          }>
          <View style={[styles.card, {backgroundColor: Colors.light}]}>
            <Text style={[styles.cardTitle, {color: Colors.blue}]}>
              Spazio Abbonamenti
            </Text>
          </View>
        </TouchableHighlight>
      </ScrollView>
    </View>
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
  cardHighlight: {
    margin: 20,
  },
  card: {
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
    maxWidth: 400,
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
