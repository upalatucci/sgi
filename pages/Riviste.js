import React from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {connect} from 'react-redux';
import {subscriptionDataForMagazine} from '../services/auth';
import {BS_ENTRYPOINT, NR_ENTRYPOINT} from '../api';
import MagazineCarousel from '../components/magazine/MagazineCarousel';
import {Actions} from 'react-native-router-flux';
import Loading from '../components/Loading';
import {isSubscriptionExpired} from '../utils';
import {format, parse} from 'date-fns';
import { SET_MAGAZINE_CACHE } from '../store/mutations';

const Riviste = ({lastBS, lastNR, subscriptionInfo, isLogged}) => {
  if (!isLogged) {
    Actions.login({nextScene: 'magazines'});
    return <Loading />;
  }

  const isExpired = isSubscriptionExpired(subscriptionInfo);

  const subEndDate = parse(
    subscriptionInfo.riv_dig_scad_nr,
    'yyyy-MM-dd',
    new Date(),
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Le riviste</Text>
        <Text style={styles.subInfo}>
          Il tuo abbonamento digitale è {isExpired ? 'scaduto' : 'attivo'}
        </Text>
        {!isExpired && (
          <Text style={styles.subInfo}>
            Ti ricordiamo che scadrà il {format(subEndDate, 'dd/MM/yyyy')}
          </Text>
        )}
        <MagazineCarousel
          entrypoint={NR_ENTRYPOINT}
          lastNumber={lastNR}
          subInfo={subscriptionDataForMagazine(subscriptionInfo, 'nr')}
          magazine="nr"
        />
        <MagazineCarousel
          entrypoint={BS_ENTRYPOINT}
          lastNumber={lastBS}
          subInfo={subscriptionDataForMagazine(subscriptionInfo, 'bs')}
          magazine="bs"
        />
      </ScrollView>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    lastBS: state.magazine.lastBS,
    lastNR: state.magazine.lastNR,
    subscriptionInfo: state.magazine.subscriptionInfo,
    isLogged: state.magazine.isLogged,
  };
}

export default connect(mapStateToProps)(Riviste);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  subInfo: {
    paddingHorizontal: 20,
  },
});
