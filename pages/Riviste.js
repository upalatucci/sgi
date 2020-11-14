import React, {useEffect, useReducer} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import * as Keychain from 'react-native-keychain';
import SubscriptionContext from '../contexts/SubscriptionContext';
import {login, generateSignToken} from '../services/auth';
import LoginForm from '../components/LoginForm';
import ErrorModal from '../components/ErrorModal';
import {BS_ENTRYPOINT, NR_ENTRYPOINT} from '../api';
import Loading from '../components/Loading';
import MagazineCarousel from '../components/magazine/MagazineCarousel';

const initialState = {
  logged: false,
  loading: true,
  error: null,
  subscriptionInfo: null,
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
        subscriptionInfo: null,
        logged: false,
      };
    case 'logged':
      return {
        ...state,
        logged: true,
        error: null,
        loading: false,
        subscriptionInfo: {
          ...action.payload,
          sign_nr: generateSignToken(action.payload),
          sign_bs: generateSignToken(action.payload, 'bs'),
        },
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

const Riviste = ({lastBSImage, lastNRImage}) => {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  console.log(state.subscriptionInfo);
  useEffect(() => {
    Keychain.getGenericPassword().then(async (credentials) => {
      if (credentials) {
        const response = await login(
          credentials.username,
          credentials.password,
        );
        dispatch({type: 'logged', payload: response});
      } else {
        dispatch({type: 'no_logged'});
      }
    });
  }, []);

  const onLogin = async (username, password) => {
    dispatch({type: 'loading'});

    const response = await login(username, password);
    if (response.riv_message && response.riv_message.length > 0) {
      dispatch({type: 'error', payload: response.riv_message});
    } else {
      dispatch({type: 'logged', payload: response});
      await Keychain.setGenericPassword(username, password);
    }
  };

  if (state.loading) {
    return <Loading />;
  }

  return (
    <SubscriptionContext.Provider value={state.subscriptionInfo}>
      <View style={styles.container}>
        {!state.logged ? (
          <LoginForm onLogin={onLogin} />
        ) : (
          <View style={styles.container}>
            <MagazineCarousel
              entrypoint={NR_ENTRYPOINT}
              firstImage={lastNRImage}
              subInfo={{
                riv_nome: state.subscriptionInfo.riv_nome,
                riv_cognome: state.subscriptionInfo.riv_cognome,
                sign: state.subscriptionInfo.sign_nr,
                riv_dig_scad: state.subscriptionInfo.riv_dig_scad_nr,
                riv_cod_abb: state.subscriptionInfo.riv_codabb,
              }}
            />
            <MagazineCarousel
              entrypoint={BS_ENTRYPOINT}
              firstImage={lastBSImage}
              subInfo={{
                riv_nome: state.subscriptionInfo.riv_nome,
                riv_cognome: state.subscriptionInfo.riv_cognome,
                sign: state.subscriptionInfo.sign_bs,
                riv_dig_scad: state.subscriptionInfo.riv_dig_scad_bs,
                riv_cod_abb: state.subscriptionInfo.riv_codabb,
              }}
            />
          </View>
        )}
        <ErrorModal
          modalVisible={state.error !== null}
          onClose={() => dispatch({type: 'clear_error'})}
          error={state.error}
        />
      </View>
    </SubscriptionContext.Provider>
  );
};

const mapStateToProps = (state) => {
  return {
    lastBSImage: state.magazine.lastBSImage,
    lastNRImage: state.magazine.lastNRImage,
  };
};

export default connect(mapStateToProps)(Riviste);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
