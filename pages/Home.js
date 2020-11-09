import React, {useEffect} from 'react';
import {View, Image, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {fetchLastNRImage, fetchLastBSImage} from '../store/magazineAction';

import logo from '../assets/logo_SGI_2020.png';
import {TitleStyle, DefaultShadow, Colors} from '../styles';
import HomeCard from '../components/HomeCard';
import newsImage from '../assets/news-image.png';

const Home = ({lastBSImage, lastNRImage, fetchBS, fetchNR}) => {
  useEffect(() => {
    fetchBS();
    fetchNR();
  }, [fetchNR, fetchBS]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.welcome}>
          <Image source={logo} style={styles.image} />
        </View>
        <HomeCard
          title={'News'}
          backgroundColor="#F6C28B"
          image={newsImage}
          onPress={() => Actions.news()}
        />
        <HomeCard
          title={'Buddismo'}
          backgroundColor="#F6C28B"
          image={newsImage}
          onPress={() => Actions.buddismo()}
          inverse
        />
        <HomeCard
          title={'Riviste'}
          backgroundColor="#F6C28B"
          image={[{uri: lastBSImage}, {uri: lastNRImage}]}
          onPress={() => Actions.riviste()}
          imageStyle={styles.magazineImage}
        />
        <HomeCard
          title={'Frase Del Giorno'}
          backgroundColor="#F6C28B"
          image={newsImage}
          onPress={() => Actions.frasedelgiorno()}
          inverse
        />
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
