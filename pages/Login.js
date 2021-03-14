import React, {useEffect, useReducer} from 'react';
import {BackHandler, SafeAreaView, StyleSheet} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Loading from '../components/Loading';
import LoginForm from '../components/LoginForm';
import Modal from '../components/Modal';
import {login} from '../services/auth';
import {LOGIN, SET_SUBSCRIPTION_INFO} from '../store/mutations';
import {Colors} from '../styles';

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

const Login = ({
  isLogged,
  setSubscriptionInfo,
  subscriptionInfo,
  nextScene,
  nextSceneProps,
  dispatchLogin,
}) => {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  const onLogin = async (username, password) => {
    dispatch({type: 'loading'});

    const response = await login(username, password);
    if (response.riv_message && response.riv_message.length > 0) {
      dispatch({type: 'error', payload: response.riv_message});
    } else {
      dispatch({type: 'logged', payload: response});
      dispatchLogin();
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

  if (isLogged) {
    Actions[nextScene](nextSceneProps);
  }

  if (state.loading || (state.logged && !subscriptionInfo)) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <LoginForm onLogin={onLogin} />

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
    backgroundColor: Colors.blue,
  },
});

function mapStateToProps(state) {
  return {
    subscriptionInfo: state.magazine.subscriptionInfo,
    isLogged: state.magazine.isLogged,
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
