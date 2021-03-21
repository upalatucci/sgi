import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  View,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {getJsonData} from '../api';
import Loading from '../components/Loading';
import {subscriptionDataForMagazine} from '../services/auth';
import {BS_ENTRYPOINT, NR_ENTRYPOINT} from '../api';
import ArticleSection from '../components/magazine/ArticleSection';
import {Colors} from '../styles';
import TouchableHighlight from '../components/CustomTouchableHighlight';
import {downloadAndOpenPDF, MAGAZINE_NAMES} from '../utils';
import {SET_MAGAZINE_CACHE, SHOW_MODAL} from '../store/mutations';
import LinearGradient from 'react-native-linear-gradient';
import {WithLocalSvg} from 'react-native-svg';
import GoToMagazines from '../assets/goToMagazines.svg';
import {backHandler} from '../Routes';

const windowHeight = Dimensions.get('window').height;
const Magazine = React.memo(
  ({
    number,
    magazine,
    subscriptionInfo,
    storedMagazines,
    cacheMagazine,
    launchError,
    isLogged,
  }) => {
    const [magazineContent, setMagazineContent] = useState();
    const [loadingPDF, setLoadingPDF] = useState(false);

    async function downloadPDFRequest() {
      setLoadingPDF(true);
      const magazinePrefix = magazine === 'nr' ? 'NR' : 'BS';
      await downloadAndOpenPDF(
        magazineContent.number.download,
        `${magazinePrefix}${magazineContent.number.number}`,
      );
      setLoadingPDF(false);
    }

    useEffect(() => {
      if (!subscriptionInfo || !magazine || !number) {
        return;
      }

      const cacheKey = `${magazine}-${number.number}`;

      if (storedMagazines[cacheKey]) {
        return setMagazineContent(storedMagazines[cacheKey]);
      }

      getJsonData(
        `number/${number.number}`,
        subscriptionDataForMagazine(subscriptionInfo, magazine),
        magazine === 'nr' ? NR_ENTRYPOINT : BS_ENTRYPOINT,
      ).then((response) => {
        if (response.data.status === 404) {
          Actions.pop();
          launchError(response.message);
        } else {
          if (response.data) {
            setMagazineContent(response.data);
            cacheMagazine(cacheKey, response.data);
          }
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [number, magazine, subscriptionInfo]);

    if (!isLogged) {
      Actions.login({
        nextScene: 'magazine',
        nextSceneProps: {
          number,
          magazine,
        },
      });
    }

    if (subscriptionInfo) {
      const expiredNR =
        magazine === 'nr' && subscriptionInfo.riv_scad_nr < number.number;
      const expiredBS =
        magazine === 'bs' && subscriptionInfo.riv_scad_nr < number.number;

      if (expiredBS || expiredNR) {
        launchError(
          'Il tuo abbonamento non è abilitato a consultare questa rivista',
        );
        backHandler();
        return <Loading />;
      }
    }

    if (!magazineContent || loadingPDF || !isLogged) {
      return <Loading />;
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableHighlight
            onPress={() => Actions.magazines()}
            style={styles.headerItem}>
            <WithLocalSvg
              style={styles.goToMagazinesImage}
              width={40}
              height={40}
              asset={GoToMagazines}
            />
          </TouchableHighlight>
          <Text style={[styles.headerItem, styles.headerTitle]}>
            {MAGAZINE_NAMES[magazine]}
          </Text>
          <Text style={[styles.headerItem, styles.headerNumber]}>
            {number.number}
          </Text>
        </View>
        <Image style={styles.image} source={{uri: number.cover}} />
        <TouchableHighlight onPress={downloadPDFRequest}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[Colors.lightBlue, Colors.darkBlue]}
            style={styles.downloadButton}>
            <Text style={styles.downloadButtonText}>Scarica PDF</Text>
          </LinearGradient>
        </TouchableHighlight>
        {Object.entries(magazineContent.summary).map(([key, section]) => (
          <ArticleSection key={key} section={section} magazine={magazine} />
        ))}
      </ScrollView>
    );
  },
);

function mapStateToProps(state) {
  return {
    subscriptionInfo: state.magazine.subscriptionInfo,
    storedMagazines: state.magazine.cachedMagazines,
    isLogged: state.magazine.isLogged,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    cacheMagazine: (key, numberData) =>
      dispatch({type: SET_MAGAZINE_CACHE, payload: {[key]: numberData}}),
    launchError: (error) => dispatch({type: SHOW_MODAL, payload: error}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Magazine);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  image: {
    height: windowHeight / 3,
    resizeMode: 'center',
    margin: 10,
    borderRadius: 40,
  },
  downloadButton: {
    backgroundColor: Colors.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    alignSelf: 'center',
    width: 120,
    marginTop: 20,
    height: 35,
    marginBottom: 0,
  },
  downloadButtonText: {
    color: 'white',
    fontSize: 16,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '70%',
    textAlign: 'center',
  },
  headerNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.orange,
    textAlign: 'right',
  },
  headerItem: {
    width: '15%',
  },
  goToMagazinesImage: {
    width: 40,
    height: 40,
  },
});
