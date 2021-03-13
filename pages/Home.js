import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {SGI_ENTRYPOINT} from '../api';
import logo from '../assets/logo.png';
import TouchableHighlight from '../components/CustomTouchableHighlight';
import HomeMagazineCard from '../components/home/HomeMagazineCard';
import {login} from '../services/auth';
import {WithLocalSvg} from 'react-native-svg';
import FraseDelGiornoIcon from '../assets/frasedelgiorno.svg';
import BuddismoIcon from '../assets/buddismo.svg';
import NewsIcon from '../assets/news.svg';
import {
  fetchLastBSImage,
  fetchLastNews,
  fetchLastNRImage,
} from '../store/magazineAction';
import {SET_SUBSCRIPTION_INFO} from '../store/mutations';
import {Colors, DefaultShadow} from '../styles';
import {MAGAZINE_TYPES} from '../utils';

const Home = ({
  lastBS,
  lastNR,
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
  }, [fetchNR, fetchBS, fetchLastNewsAction]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.welcome}>
          <Text style={styles.welcomeTitle}>Buongiorno</Text>
          <Text style={styles.welcomeSubtitle}>
            Benvenuti nell'app dell'Istituto Buddista Italiano Soka Gakkai,
            tramite la quale è possibile essere aggiornati sulle novità e
            consultare le riviste con gli ultimi incoraggiamenti.
          </Text>

          <View style={styles.newsSsection}>
            <TouchableHighlight
              style={styles.cardHighlight}
              onPress={() =>
                Actions.posts({
                  title: 'In primo piano',
                  uri: 'news',
                  entrypoint: SGI_ENTRYPOINT,
                })
              }>
              <View style={[styles.card, {backgroundColor: Colors.light}]}>
                <WithLocalSvg asset={NewsIcon} width={50} height={50} />
                <Text style={[styles.cardTitle]}>In primo piano</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.cardHighlight}
              onPress={() => Actions.buddismo()}>
              <View style={[styles.card, {backgroundColor: Colors.light}]}>
                <WithLocalSvg asset={BuddismoIcon} width={50} height={50} />
                <Text style={[styles.cardTitle]}>Il Buddismo</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.cardHighlight}
              onPress={() => Actions.frasedelgiorno()}>
              <View style={[styles.card, {backgroundColor: Colors.light}]}>
                <WithLocalSvg
                  asset={FraseDelGiornoIcon}
                  width={50}
                  height={50}
                />
                <Text style={[styles.cardTitle]}>La frase del giorno</Text>
              </View>
            </TouchableHighlight>
          </View>
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

        <View style={styles.homeSection}>
          <Text style={styles.homeTitle}>LE ULTIME USCITE</Text>
          <TouchableHighlight onPress={() => Actions.magazines()}>
            <Text style={styles.homeLink}>Sfoglia i numeri precedenti</Text>
          </TouchableHighlight>
        </View>
        <HomeMagazineCard magazine={lastNR} magazineType={MAGAZINE_TYPES.NR} />
        <HomeMagazineCard magazine={lastBS} magazineType={MAGAZINE_TYPES.BS} />
        <HomeMagazineCard magazineType={MAGAZINE_TYPES.VC} />

        {/* <View style={styles.homeSection}>
          <Text style={styles.homeTitle}>LA SOKA GAKKAI ITALIANA NEL WEB</Text>
        </View> */}
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
    padding: 20,
    paddingBottom: 40,
    backgroundColor: 'white',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  welcomeTitle: {
    fontWeight: 'bold',
    fontSize: 26,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#777777',
  },
  newsSsection: {
    marginTop: 20,
    width: '100%',
    height: 120,
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  buddismoImageStyle: {
    height: 120,
    width: 100,
    resizeMode: 'contain',
  },
  cardHighlight: {
    width: '30%',
  },
  card: {
    ...DefaultShadow,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  cardImage: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  cardImageVolo: {
    justifyContent: 'center',
  },
  cardTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  imageVolo: {
    width: '80%',
    maxWidth: 400,
  },
  homeSection: {
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  homeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  homeLink: {
    color: Colors.orange,
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
