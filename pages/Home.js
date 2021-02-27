import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet, ScrollView, Linking} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import * as Keychain from 'react-native-keychain';

import {
  fetchLastNRImage,
  fetchLastBSImage,
  fetchLastNews,
} from '../store/magazineAction';
import TouchableHighlight from '../components/CustomTouchableHighlight';
import {SGI_ENTRYPOINT, VOLO_ENTRYPOINT} from '../api';
import {login} from '../services/auth';

import logoSGI from '../assets/logo_SGI_2020.png';
import {TitleStyle, DefaultShadow, Colors, FontFamilies} from '../styles';
import voloContinuoImage from '../assets/il-volo-continuo-logo.png';
import logo from '../assets/logo.png';
import FeatherWrite from '../components/icons/FeatherWrite';
import HomeMagazineCard from '../components/home/HomeMagazineCard';
import {SET_SUBSCRIPTION_INFO} from '../store/mutations';
import { MAGAZINE_TYPES } from '../utils';

const Home = ({
  lastBS,
  lastNR,
  lastNews,
  fetchBS,
  fetchNR,
  fetchLastNewsAction,
  setSubscriptionInfo,
}) => {
  useEffect(() => {
    // Keychain.resetGenericPassword();

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
    fetchLastNewsAction();
  }, [fetchNR, fetchBS, fetchLastNewsAction]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.welcome}>
          <Image source={logoSGI} style={styles.image} />
        </View>
        <View style={styles.newsSsection}>
  
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
              <Image source={logo} style={styles.cardImage} />
              <Text style={[styles.cardTitle]}>
                News
              </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.cardHighlight}
            onPress={() => Actions.buddismo()}>
            <View style={[styles.card, {backgroundColor: Colors.light}]}>
              <Image source={logo} style={styles.cardImage} />
              <Text style={[styles.cardTitle]}>
                Buddismo
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        {/* <TouchableHighlight
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
            <View>
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
        </TouchableHighlight> */}

        <HomeMagazineCard magazine={lastNR} magazineType={MAGAZINE_TYPES.NR} />
        <HomeMagazineCard magazine={lastBS} magazineType={MAGAZINE_TYPES.BS} />
        
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

        {/* <TouchableHighlight
          style={styles.cardHighlight}
          onPress={() => Actions.frasedelgiorno()}>
          <View style={[styles.card, {backgroundColor: Colors.light}]}>
            <View>
              <FeatherWrite color={Colors.blue} height={120} width={100} />
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
        </TouchableHighlight> */}
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
  newsSsection: {
    marginTop: 20,
    width: "100%",
    height: 200,
    backgroundColor: Colors.secondary,
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center"
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
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    width: "100%",
  }, 
  cardImage: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  cardImageVolo: {
    justifyContent: 'center',
  },
  imageVolo: {
    width: '80%',
    maxWidth: 400,
  },
});

const mapStateToProps = (state) => {
  return {
    lastBS: state.magazine.lastBS,
    lastNR: state.magazine.lastNR,
    lastNews: state.magazine.lastNews,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBS: () => dispatch(fetchLastBSImage()),
    fetchNR: () => dispatch(fetchLastNRImage()),
    fetchLastNewsAction: () => dispatch(fetchLastNews()),
    setSubscriptionInfo: (subInfo) =>
      dispatch({type: SET_SUBSCRIPTION_INFO, payload: subInfo}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
