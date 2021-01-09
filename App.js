import React from 'react';
import {StyleSheet} from 'react-native';
import {Router, Scene, Stack, Actions} from 'react-native-router-flux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import magazineReducer from './store/magazineRecuder';
import uiRecuder from './store/uiRecuder';
import Posts from './pages/Posts';
import Buddismo from './pages/Buddismo';
import Riviste from './pages/Riviste';
import FraseDelGiorno from './pages/FraseDelGiorno';
import PostPage from './pages/PostPage';
import Home from './pages/Home';
import Article from './pages/Article';
import Magazine from './pages/Magazine';
import {Colors} from './styles';
import FraseDelGiornoIcon from './components/icons/FraseDelGiornoIcon';
import HomeIcon from './components/icons/HomeIcon';
import LotusIcon from './components/icons/LotusIcon';
import BookIcon from './components/icons/BookIcon';
import WebViewPage from './pages/WebViewPage';
import DownloadPDF from './pages/DownloadPDF';
import GlobalModal from './components/GlobalModal';
import {ErrorBoundary} from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['subscriptionInfo', 'lastNR', 'lastBS', 'lastNews'],
};

const persistedMagazineReducer = persistReducer(persistConfig, magazineReducer);

const rootReduced = combineReducers({
  magazine: persistedMagazineReducer,
  ui: uiRecuder,
});

const store = createStore(rootReduced, compose(applyMiddleware(thunk)));
const persistor = persistStore(store);
// persistor.purge();

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          Actions.home();
        }}>
        <GlobalModal />
        <Router>
          <Stack
            key="root"
            navigationBarStyle={styles.navbar}
            titleStyle={styles.title}
            backButtonTintColor={Colors.primary}>
            <Scene key="home" component={Home} title="Home" hideNavBar />
            <Scene
              back
              key="posts"
              navigationBarStyle={styles.navbar}
              titleStyle={styles.title}
              component={Posts}
              icon={HomeIcon}
              title="Posts"
            />
            <Scene
              back
              key="buddismo"
              component={Buddismo}
              icon={LotusIcon}
              title="Buddismo"
            />
            <Scene
              back
              key="magazines"
              component={Riviste}
              icon={BookIcon}
              title="Riviste"
            />
            <Scene
              back
              key="frasedelgiorno"
              component={FraseDelGiorno}
              icon={FraseDelGiornoIcon}
              title="Frase del Giorno"
            />
            <Scene key="postPage" component={PostPage} back title="Post" />
            <Scene key="magazine" component={Magazine} back title="Rivista" />
            <Scene key="article" component={Article} back title="Articolo" />
            <Scene key="webview" component={WebViewPage} back title="Pagina" />
            <Scene
              key="downloadPdf"
              component={DownloadPDF}
              back
              title="PDF Rivista"
            />
          </Stack>
        </Router>
      </ErrorBoundary>
    </PersistGate>
  </Provider>
);

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: 'white',
  },
  title: {
    color: Colors.primary,
  },
});
