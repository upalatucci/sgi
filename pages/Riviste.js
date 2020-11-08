import React, {useEffect, useReducer} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SubscriptionContext from '../contexts/SubscriptionContext';
import {login, generateSignToken} from '../services/auth';
// import Loading from '../components/Loading';
import LoginForm from '../components/LoginForm';
import ErrorModal from '../components/ErrorModal';

function loginReducer(state, action) {
  switch (action.type) {
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

const initialState = {
  logged: false,
  loading: false,
  error: null,
  subscriptionInfo: null,
};

export default () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  useEffect(() => {
    // const credentials = fetchAuthInfoFromStorage();
    // console.log(credentials);
    // if (credentials) {
    //   login(...credentials);
    // }
  }, []);

  const onLogin = async (username, password) => {
    dispatch({type: 'loading'});

    const response = await login(username, password);
    if (response.riv_message && response.riv_message.length > 0) {
      dispatch({type: 'error', payload: response.riv_message});
    } else {
      // await Keychain.setGenericPassword(username, password);
      dispatch({type: 'logged', payload: response});
    }
  };

  return (
    <SubscriptionContext.Provider value={state.subscriptionInfo}>
      <View style={styles.container}>
        {!state.logged ? (
          <LoginForm onLogin={onLogin} />
        ) : (
          <View style={styles.container}>
            <Text>{JSON.stringify(state.subscriptionInfo)}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
