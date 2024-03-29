import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
  SafeAreaView,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import {getJsonData} from '../api';
import Loading from '../components/Loading';
import {subscriptionDataForMagazine} from '../services/auth';
import {BS_ENTRYPOINT, NR_ENTRYPOINT} from '../api';
import ArticleSection from '../components/magazine/ArticleSection';
import {Colors} from '../styles';
import TouchableHighlight from '../components/CustomTouchableHighlight';
import {cannotViewMagazine, downloadAndOpenPDF, MAGAZINE_NAMES} from '../utils';
import {SET_MAGAZINE_CACHE, SHOW_MODAL} from '../store/mutations';
import {WithLocalSvg} from 'react-native-svg';
import GoToMagazines from '../assets/components.svg';
import Pdf from '../assets/pdf.svg';
import MagazineImage from '../components/magazine/MagazineImage';
import Text from '../components/ui/Text';
import PdfError from '../components/PdfError';

const windowHeight = Dimensions.get('window').height;
const Magazine = React.memo(({magazine, magazineType}) => {
  const dispatch = useDispatch();
  const {subscriptionInfo, storedMagazines, isLogged} = useSelector(
    (state) => ({
      subscriptionInfo: state.magazine.subscriptionInfo,
      storedMagazines: state.magazine.cachedMagazines,
      isLogged: state.magazine.isLogged,
    }),
  );
  const [magazineContent, setMagazineContent] = useState();
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [pdfError, setError] = useState();

  async function downloadPDFRequest() {
    setLoadingPDF(true);
    let response;

    if (!magazineContent?.number?.download) {
      response = await readMagazine();

      if (response) {
        const cacheKey = `${magazineType}-${magazine.number}`;
        dispatch({
          type: SET_MAGAZINE_CACHE,
          payload: {[cacheKey]: response.data},
        });
      }
    }

    const magazinePrefix = magazineType === 'nr' ? 'NR' : 'BS';
    await downloadAndOpenPDF(
      response?.data?.number?.download || magazineContent.number.download,
      `${magazinePrefix}${magazineContent.number.number}.pdf`,
    ).catch(setError);
    setLoadingPDF(false);
  }

  const readMagazine = () => {
    return getJsonData(
      `number/${magazine.number}`,
      subscriptionDataForMagazine(subscriptionInfo, magazineType),
      magazineType === 'nr' ? NR_ENTRYPOINT : BS_ENTRYPOINT,
    ).then((response) => {
      if (response.data.status === 404) {
        Actions.pop();
        dispatch({type: SHOW_MODAL, payload: response.message});
      } else {
        if (response.data) {
          setMagazineContent(response.data);

          return response;
        }
      }
    });
  };

  useEffect(() => {
    if (!subscriptionInfo || !magazineType || !magazine) {
      return;
    }

    const cacheKey = `${magazineType}-${magazine.number}`;

    if (storedMagazines[cacheKey]) {
      return setMagazineContent(storedMagazines[cacheKey]);
    }

    readMagazine().then((response) => {
      if (response) {
        dispatch({
          type: SET_MAGAZINE_CACHE,
          payload: {[cacheKey]: response.data},
        });
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [magazine, magazineType, subscriptionInfo]);

  if (!isLogged) {
    Actions.login({
      nextScene: 'magazine',
      nextSceneProps: {
        magazine,
        magazineType,
      },
    });
  }

  if (subscriptionInfo) {
    if (cannotViewMagazine(subscriptionInfo, magazineType, magazine.number)) {
      dispatch({
        type: SHOW_MODAL,
        payload:
          'Il tuo abbonamento non è abilitato a consultare questa rivista',
      });
      Actions.home();
      return <Loading />;
    }
  }

  if (!magazineContent || loadingPDF || !isLogged) {
    return <Loading />;
  }

  if (pdfError) {
    return <PdfError error={pdfError} onClick={downloadPDFRequest} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle]} allowFontScaling={false}>
            {MAGAZINE_NAMES[magazineType]}
          </Text>
          <View style={styles.headerIcons}>
            <TouchableHighlight
              onPress={() => Actions.jump('magazines')}
              style={styles.headerItem}>
              <WithLocalSvg
                style={styles.goToMagazinesImage}
                width={30}
                height={30}
                asset={GoToMagazines}
              />
            </TouchableHighlight>
            <TouchableHighlight
              onPress={downloadPDFRequest}
              style={styles.headerItem}>
              <WithLocalSvg
                style={styles.goToMagazinesImage}
                width={30}
                height={30}
                asset={Pdf}
              />
            </TouchableHighlight>
          </View>
        </View>
        <MagazineImage
          style={styles.image}
          number={magazine}
          magazine={magazineType}
        />
        <Text style={[styles.number]}>{magazine.number}</Text>
        <Text style={[styles.number, styles.numberDesc]}>
          {magazine?.number_desc}
        </Text>
        {Object.entries(magazineContent.summary).map(([key, section]) => (
          <ArticleSection
            key={key}
            section={section}
            magazineType={magazineType}
            magazineNumber={magazine.number}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
});

export default Magazine;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  image: {
    height: windowHeight / 3,
    maxHeight: 400,
    resizeMode: 'contain',
    margin: 10,
    borderRadius: 40,
    alignSelf: 'center',
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
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.orange,
    textAlign: 'center',
    marginTop: 10,
  },
  numberDesc: {
    color: 'black',
    fontWeight: '300',
    fontSize: 14,
    marginTop: 0,
    marginBottom: 20,
  },
  headerItem: {
    marginLeft: 20,
  },
  headerIcons: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  goToMagazinesImage: {
    width: 30,
    height: 30,
  },
});
