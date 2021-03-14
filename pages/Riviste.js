import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {subscriptionDataForMagazine} from '../services/auth';
import {BS_ENTRYPOINT, NR_ENTRYPOINT} from '../api';
import MagazineCarousel from '../components/magazine/MagazineCarousel';
import {Actions} from 'react-native-router-flux';
import Loading from '../components/Loading';

const Riviste = ({lastBS, lastNR, subscriptionInfo, isLogged}) => {
  if (!isLogged) {
    Actions.login({nextScene: 'magazines'});
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
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
});
