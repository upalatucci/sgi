import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Image, Dimensions, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {getJsonData} from '../api';
import Loading from '../components/Loading';
import {subscriptionDataForMagazine} from '../services/auth';
import {BS_ENTRYPOINT, NR_ENTRYPOINT} from '../api';
import ArticleSection from '../components/magazine/ArticleSection';
import {PrimaryButtonStyle, PrimaryButtonTitleStyle} from '../styles';
import TouchableHighlight from '../components/CustomTouchableHighlight';
import {downloadAndOpenPDF} from '../utils';

const windowHeight = Dimensions.get('window').height;
const Magazine = React.memo(({number, magazine, subscriptionInfo}) => {
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

    getJsonData(
      `number/${number.number}`,
      subscriptionDataForMagazine(subscriptionInfo, magazine),
      magazine === 'nr' ? NR_ENTRYPOINT : BS_ENTRYPOINT,
    ).then((response) => {
      if (response.data) {
        setMagazineContent(response.data);
      }
    });
  }, [number, magazine, subscriptionInfo]);

  if (!subscriptionInfo) {
    Actions.magazines({onBack: () => Actions.home()});
  }

  if (!magazineContent || loadingPDF) {
    return <Loading />;
  }

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={{uri: number.cover}} />
      <TouchableHighlight
        onPress={downloadPDFRequest}
        style={styles.loginButton}>
        <Text style={styles.loginTextButton}>Scarica PDF</Text>
      </TouchableHighlight>
      {Object.entries(magazineContent.summary).map(([key, section]) => (
        <ArticleSection key={key} section={section} magazine={magazine} />
      ))}
    </ScrollView>
  );
});

function mapStateToProps(state) {
  return {
    subscriptionInfo: state.magazine.subscriptionInfo,
  };
}

export default connect(mapStateToProps)(Magazine);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: windowHeight / 3,
    resizeMode: 'center',
    margin: 10,
  },
  loginButton: {
    ...PrimaryButtonStyle,
    alignSelf: 'center',
    width: 200,
    marginTop: 20,
    marginBottom: 0,
  },
  loginTextButton: {
    ...PrimaryButtonTitleStyle,
  },
});
