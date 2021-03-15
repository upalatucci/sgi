import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View, Image} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {SGI_ENTRYPOINT, VOLO_ENTRYPOINT} from '../api';
import TouchableHighlight from '../components/CustomTouchableHighlight';
import HomeMagazineCard from '../components/home/HomeMagazineCard';
import {login} from '../services/auth';
import FraseDelGiornoIcon from '../assets/frasedelgiorno.png';
import BuddismoIcon from '../assets/buddismo.png';
import NewsIcon from '../assets/news.png';
import {
  fetchLastBSImage,
  fetchLastNews,
  fetchLastNRImage,
} from '../store/magazineAction';
import {SET_SUBSCRIPTION_INFO} from '../store/mutations';
import {Colors, DefaultShadow} from '../styles';
import {MAGAZINE_NAMES, MAGAZINE_TYPES, SGI_SITES} from '../utils';
import SiteCard from '../components/home/SiteCard';

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
                <Image source={NewsIcon} style={styles.cardImage} />
                <Text style={[styles.cardTitle]}>In primo piano</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.cardHighlight}
              onPress={() => Actions.buddismo()}>
              <View style={[styles.card, {backgroundColor: Colors.light}]}>
                <Image source={BuddismoIcon} style={styles.cardImage} />
                <Text style={[styles.cardTitle]}>Il Buddismo</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.cardHighlight}
              onPress={() => Actions.frasedelgiorno()}>
              <View style={[styles.card, {backgroundColor: Colors.light}]}>
                <Image source={FraseDelGiornoIcon} style={styles.cardImage} />
                <Text style={[styles.cardTitle]}>La frase del giorno</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.homeSection}>
          <Text style={styles.homeTitle}>LE ULTIME USCITE</Text>
          <TouchableHighlight onPress={() => Actions.magazines()}>
            <Text style={styles.homeLink}>Sfoglia i numeri precedenti</Text>
          </TouchableHighlight>
        </View>
        <HomeMagazineCard magazine={lastNR} magazineType={MAGAZINE_TYPES.NR} />
        <HomeMagazineCard magazine={lastBS} magazineType={MAGAZINE_TYPES.BS} />
        <HomeMagazineCard
          magazineType={MAGAZINE_TYPES.VC}
          background={require('../assets/ilvolocontinuo.it.png')}
          onPress={() =>
            Actions.posts({
              title: MAGAZINE_NAMES.VC,
              uri: 'posts',
              entrypoint: VOLO_ENTRYPOINT,
            })
          }
        />

        <View style={styles.homeSection}>
          <Text style={styles.homeTitle}>LA SOKA GAKKAI ITALIANA NEL WEB</Text>
        </View>
        <ScrollView
          style={styles.siteScroll}
          horizontal={true}
          contentContainerStyle={styles.siteScrollContainer}>
          {SGI_SITES.map((site) => (
            <SiteCard {...site} key={site.title} />
          ))}
        </ScrollView>
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
    marginBottom: 30,
    ...DefaultShadow,
  },
  welcomeTitle: {
    fontWeight: 'bold',
    fontSize: 26,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: Colors.textGray,
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
  cardImageVolo: {
    justifyContent: 'center',
  },
  cardTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  cardImage: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
  imageVolo: {
    width: '80%',
    maxWidth: 400,
  },
  homeSection: {
    paddingTop: 20,
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
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  siteScroll: {
    height: 150,
  },
  siteScrollContainer: {
    paddingHorizontal: 10,
    alignItems: 'center',
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
