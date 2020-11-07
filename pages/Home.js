import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import logo from '../assets/logo_SGI_2020.png';
import {TitleStyle, DefaultShadow, Colors} from '../styles';
import HomeCard from '../components/HomeCard';
import newsImage from '../assets/news-image.png';

export default () => (
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
        image={newsImage}
        onPress={() => Actions.riviste()}
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
});
