import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {Actions} from 'react-native-router-flux';
import {WithLocalSvg} from 'react-native-svg';
import {connect, useDispatch, useSelector} from 'react-redux';
import X from '../assets/x_dark.svg';
import TouchableHighlight from '../components/CustomTouchableHighlight';
import LoginForm from '../components/LoginForm';
import Modal from '../components/Modal';
import {login} from '../services/auth';
import {
  LOGGING,
  LOGIN,
  LOGOUT,
  SET_SUBSCRIPTION_INFO,
} from '../store/mutations';
import {Colors} from '../styles';
import analytics from '@react-native-firebase/analytics';

const initialState = {
  logged: false,
  loading: true,
  error: null,
};

function getInitState(logging) {
  return {
    ...initialState,
    loading: logging || initialState.loading,
  };
}

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

const Login = ({nextScene, nextSceneProps}) => {
  const {subscriptionInfo, isLogged, logging} = useSelector((state) => ({
    subscriptionInfo: state.magazine.subscriptionInfo,
    isLogged: state.magazine.isLogged,
    logging: state.magazine.logging,
  }));

  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const redirect = useCallback(() => {
    if (Actions[nextScene]) {
      Actions.popAndPush(nextScene, nextSceneProps);
    } else {
      Actions.home();
    }
  }, [nextScene, nextSceneProps]);

  const onLogin = async (username, password) => {
    dispatch({type: LOGGING});

    const response = await login(username, password);

    if (response.riv_message && response.riv_message.length > 0) {
      dispatch({type: LOGOUT});
      setError(response.riv_message);
    } else {
      await analytics().logLogin({method: 'form'});
      await Keychain.setGenericPassword(username, password);
      dispatch({type: SET_SUBSCRIPTION_INFO, payload: response});
      dispatch({type: LOGIN});
    }
  };

  useEffect(() => {
    if (isLogged) {
      redirect();
    }
  }, [isLogged, redirect]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.xView}>
        <TouchableHighlight
          style={styles.xTouchWidth}
          onPress={() => Actions.home()}>
          <WithLocalSvg style={styles.x} width={20} height={20} asset={X} />
        </TouchableHighlight>
      </View>
      <LoginForm
        onLogin={onLogin}
        loading={logging || (isLogged && !subscriptionInfo)}
      />

      <Modal
        modalVisible={error !== null}
        onClose={() => setError(null)}
        error={error}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBlue,
  },
  xView: {
    position: 'absolute',
    width: 40,
    height: 40,
    top: 40,
    left: 10,
  },
  xTouchWidth: {
    width: '100%',
    height: '100%',
    padding: 10,
  },
});

export default Login;
