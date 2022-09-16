import React, {useEffect, useReducer} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {Actions} from 'react-native-router-flux';
import {WithLocalSvg} from 'react-native-svg';
import {connect} from 'react-redux';
import X from '../assets/x_dark.svg';
import TouchableHighlight from '../components/CustomTouchableHighlight';
import LoginForm from '../components/LoginForm';
import Modal from '../components/Modal';
import {login} from '../services/auth';
import {LOGIN, SET_SUBSCRIPTION_INFO} from '../store/mutations';
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

const Login = ({
  isLogged,
  logging,
  setSubscriptionInfo,
  subscriptionInfo,
  nextScene,
  nextSceneProps,
  dispatchLogin,
}) => {
  const [state, dispatch] = useReducer(loginReducer, getInitState(logging));

  const onLogin = async (username, password) => {
    dispatch({type: 'loading'});

    const response = await login(username, password);
    await analytics().logLogin({method: 'form'});

    if (response.riv_message && response.riv_message.length > 0) {
      dispatch({type: 'error', payload: response.riv_message});
    } else {
      dispatch({type: 'logged', payload: response});
      await Keychain.setGenericPassword(username, password);
      setSubscriptionInfo(response);
      dispatchLogin();
    }
  };

  useEffect(() => {
    if (logging) {
      return;
    }

    if (subscriptionInfo) {
      dispatch({type: 'logged'});
    } else {
      dispatch({type: 'no_logged'});
    }
  }, [logging, subscriptionInfo]);

  useEffect(() => {
    if (isLogged) {
      if (Actions[nextScene]) {
        Actions.push(nextScene, nextSceneProps);
      } else {
        Actions.home();
      }
    }
  }, [isLogged, nextScene, nextSceneProps, state]);

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
        loading={state.loading || (state.logged && !subscriptionInfo)}
      />

      <Modal
        modalVisible={state.error !== null}
        onClose={() => dispatch({type: 'clear_error'})}
        error={state.error}
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

function mapStateToProps(state) {
  return {
    subscriptionInfo: state.magazine.subscriptionInfo,
    isLogged: state.magazine.isLogged,
    logging: state.magazine.logging,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSubscriptionInfo: (subInfo) =>
      dispatch({type: SET_SUBSCRIPTION_INFO, payload: subInfo}),
    dispatchLogin: () => dispatch({type: LOGIN}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
