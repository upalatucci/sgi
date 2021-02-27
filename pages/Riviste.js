import React, {useReducer, useEffect} from 'react';
<<<<<<< HEAD
import {View, StyleSheet} from 'react-native';
=======
import {View, StyleSheet, ScrollView} from 'react-native';
>>>>>>> bb7dc9d7ddaaba19969fc3fa8b9d5b5dbaa2f38a
import {connect} from 'react-redux';
import * as Keychain from 'react-native-keychain';
import {login, subscriptionDataForMagazine} from '../services/auth';
import LoginForm from '../components/LoginForm';
import Modal from '../components/Modal';
import {BS_ENTRYPOINT, NR_ENTRYPOINT} from '../api';
import Loading from '../components/Loading';
import MagazineCarousel from '../components/magazine/MagazineCarousel';
import {SET_SUBSCRIPTION_INFO} from '../store/mutations';

const initialState = {
  logged: false,
  loading: true,
  error: null,
};

function loginReducer(state, action) {
  switch (action.type) {
    case 'no_logged':
      return {
        ...initialState,
        loading: false,
      };
    case 'clear_error':
      return {
        ...state,
        error: null,
      };
    case 'error':
      return {
        ...state,
        error: action.payload,
        loading: false,
        logged: false,
      };
    case 'logged':
      return {
        ...state,
        logged: true,
        error: null,
        loading: false,
      };
    case 'loading':
      return {
        ...state,
        loading: true,
        error: null,
      };
    default:
      return state;
  }
}

const Riviste = ({lastBS, lastNR, subscriptionInfo, setSubscriptionInfo}) => {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  const onLogin = async (username, password) => {
    dispatch({type: 'loading'});

    const response = await login(username, password);
    if (response.riv_message && response.riv_message.length > 0) {
      dispatch({type: 'error', payload: response.riv_message});
    } else {
      dispatch({type: 'logged', payload: response});
      await Keychain.setGenericPassword(username, password);
      setSubscriptionInfo(response);
    }
  };

  useEffect(() => {
    if (subscriptionInfo) {
      dispatch({type: 'logged'});
    } else {
      dispatch({type: 'no_logged'});
    }
  }, [subscriptionInfo]);

  if (state.loading || (state.logged && !subscriptionInfo)) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {!state.logged ? (
        <LoginForm onLogin={onLogin} />
      ) : (
<<<<<<< HEAD
        <View style={styles.container}>
=======
        <ScrollView style={styles.container}>
>>>>>>> bb7dc9d7ddaaba19969fc3fa8b9d5b5dbaa2f38a
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
<<<<<<< HEAD
        </View>
=======
        </ScrollView>
>>>>>>> bb7dc9d7ddaaba19969fc3fa8b9d5b5dbaa2f38a
      )}
      <Modal
        modalVisible={state.error !== null}
        onClose={() => dispatch({type: 'clear_error'})}
        error={state.error}
      />
    </View>
  );
};

function mapStateToProps(state) {
  return {
    lastBS: state.magazine.lastBS,
    lastNR: state.magazine.lastNR,
    subscriptionInfo: state.magazine.subscriptionInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSubscriptionInfo: (subInfo) =>
      dispatch({type: SET_SUBSCRIPTION_INFO, payload: subInfo}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Riviste);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
