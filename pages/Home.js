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
import {fetchLastNRImage, fetchLastBSImage} from '../store/magazineAction';
import TouchableHighlight from '../components/CustomTouchableHighlight';
import {getJsonData} from '../api';

import logoSGI from '../assets/logo_SGI_2020.png';
import {TitleStyle, DefaultShadow, Colors, FontFamilies} from '../styles';
import voloContinuoImage from '../assets/il-volo-continuo-logo.png';
import logo from '../assets/logo.png';
import FeatherWrite from '../components/icons/FeatherWrite';

const Home = ({lastBSImage, lastNRImage, fetchBS, fetchNR}) => {
  const [lastNewsImage, setLastNewsImage] = useState();

  function fetchLastNews() {
    getJsonData('news', {
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
              {lastNewsImage ? (
                <Image source={{uri: lastNewsImage}} style={styles.cardImage} />
              ) : null}
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
              <Image source={{uri: lastBSImage}} style={styles.magazineImage} />
              <Image source={{uri: lastNRImage}} style={styles.magazineImage} />
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
    height: 160,
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
    lastBSImage: state.magazine.lastBSImage,
    lastNRImage: state.magazine.lastNRImage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBS: () => dispatch(fetchLastBSImage()),
    fetchNR: () => dispatch(fetchLastNRImage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
