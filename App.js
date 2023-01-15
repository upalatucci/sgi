import React, {useEffect} from 'react';
import {Actions} from 'react-native-router-flux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import magazineReducer from './store/magazineRecuder';
import uiRecuder from './store/uiRecuder';
import GlobalModal from './components/GlobalModal';
import {ErrorBoundary} from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import Routes from './Routes';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Linking} from 'react-native';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['subscriptionInfo', 'lastNR', 'lastBS', 'lastNews', 'highlights'],
};

const persistedMagazineReducer = persistReducer(persistConfig, magazineReducer);
const persistedUiReducer = persistReducer(
  {
    ...persistConfig,
    whitelist: ['textSize'],
  },
  uiRecuder,
);

const rootReduced = combineReducers({
  magazine: persistedMagazineReducer,
  ui: persistedUiReducer,
});

const store = createStore(rootReduced, compose(applyMiddleware(thunk)));
const persistor = persistStore(store);
// persistor.purge();

export default () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
              Actions.home();
            }}>
            <GlobalModal />
            <Routes />
          </ErrorBoundary>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};
