import {lastMaganize, lastNews} from '../api';
import {login} from '../services/auth';
import {
  SET_LASR_NR_IMAGE,
  SET_LASR_BS_IMAGE,
  SET_LAST_NEWS,
  LOGIN,
  SET_SUBSCRIPTION_INFO,
  LOGGING,
  LOGOUT,
} from './mutations';
import * as Keychain from 'react-native-keychain';

export function fetchLastNRImage() {
  return (dispatch) => {
    return lastMaganize('nr')
      .then((response) => {
        console.log(response);
        dispatch({type: SET_LASR_NR_IMAGE, payload: response.data.number});
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function fetchLastBSImage() {
  return (dispatch) => {
    return lastMaganize('bs').then((response) =>
      dispatch({type: SET_LASR_BS_IMAGE, payload: response.data.number}),
    );
  };
}

export function fetchLastNews() {
  return (dispatch) => {
    return lastNews().then((response) => {
      if (response.data && response.data.length > 0) {
        dispatch({type: SET_LAST_NEWS, payload: response.data});
      }
    });
  };
}

export function fetchLogin() {
  return (dispatch) => {
    Keychain.getGenericPassword().then(async (credentials) => {
      if (credentials) {
        dispatch({type: LOGGING});
        try {
          const subInfo = await login(
            credentials.username,
            credentials.password,
          );
          dispatch({type: LOGIN});
          dispatch({type: SET_SUBSCRIPTION_INFO, payload: subInfo});
        } catch (err) {
          dispatch({type: LOGOUT});
        }
      }
    });
  };
}
