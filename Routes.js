import React, {useEffect} from 'react';
import {BackHandler, StyleSheet} from 'react-native';
import {Router, Scene, Stack, Actions} from 'react-native-router-flux';

import {Colors} from './styles';
import HomeIcon from './components/icons/HomeIcon';
import BookIcon from './components/icons/BookIcon';
import WebViewPage from './pages/WebViewPage';
import DownloadPDF from './pages/DownloadPDF';

import Posts from './pages/Posts';
import Buddismo from './pages/Buddismo';
import Riviste from './pages/Riviste';
import FraseDelGiorno from './pages/FraseDelGiorno';
import PostPage from './pages/PostPage';
import Home from './pages/Home';
import Article from './pages/Article';
import News from './pages/News';
import Magazine from './pages/Magazine';
import Login from './pages/Login';

import SGILogo from './components/icons/SGILogoHome';
import MultiUtilsRightButton from './components/MultiUtilsRightButtons';

import NavBar from './components/NavBar';
import TabBar from './components/TabBar';
import {sendAnalyticsOnRouteChange} from './utils/analytics';

export function backHandler() {
  console.log('BACK', Actions.currentScene);
  if (Actions.currentScene === 'homepage' || !Actions.prevState) {
    BackHandler.exitApp();
    return;
  }

  if (Actions.currentScene === 'login') {
    Actions.home();
    return;
  }

  const routes = Actions.prevState.routes[0].routes;
  let prevRoute;

  if (!routes) {
    Actions.home();
    return;
  }

  if (routes.length >= 2) {
    prevRoute = routes[routes.length - 2];
  } else {
    prevRoute = routes[routes.length - 1];
  }

  if (prevRoute && prevRoute.routeName === 'login') {
    Actions.home();
    return;
  }

  if (prevRoute) {
    Actions.popAndPush(prevRoute.routeName, prevRoute.params);
  } else {
    Actions.home();
  }
}

function Routes() {
  useEffect(() => {
    const backHandlerListener = BackHandler.addEventListener(
      'hardwareBackPress',
      backHandler,
    );
    return () => backHandlerListener.remove();
  }, []);

  return (
    <Router
      onStateChange={(e) => {
        if (!e.routes) {
          return;
        }
        const routesLength = e.routes.length;

        const currentScene = routesLength > 0 && e.routes[routesLength - 1];
        if (currentScene) {
          sendAnalyticsOnRouteChange(currentScene);
        }
      }}>
      <Stack
        key="root"
        navigationBarStyle={styles.navbar}
        navBar={NavBar}
        titleStyle={styles.title}
        backButtonTintColor={Colors.primary}>
        <Scene
          key="home"
          type="reset"
          hideNavBar
          tabBarComponent={TabBar}
          tabBarPosition="bottom"
          wrap={false}>
          <Scene
            key="homepage"
            type="reset"
            component={Home}
            hideNavBar
            title="Home"
          />
          <Scene
            key="news"
            back
            navigationBarStyle={styles.navbar}
            titleStyle={styles.title}
            component={News}
            icon={HomeIcon}
            hideNavBar
          />

          <Scene
            key="frasedelgiorno"
            component={FraseDelGiorno}
            hideNavBar
            onRight={() => Actions.home()}
            renderRightButton={SGILogo}
            title="Frase del Giorno"
          />

          <Scene
            key="magazines"
            component={Riviste}
            icon={BookIcon}
            title="Riviste"
            hideNavBar
          />
        </Scene>
        <Scene key="login" component={Login} hideNavBar type="reset" />

        <Scene
          key="magazine"
          component={Magazine}
          back
          onRight={() => Actions.home()}
          renderRightButton={SGILogo}
        />
        <Scene
          key="article"
          component={Article}
          back
          renderRightButton={MultiUtilsRightButton}
        />

        <Scene
          key="postPage"
          component={PostPage}
          back
          renderRightButton={MultiUtilsRightButton}
        />

        <Scene
          key="posts"
          navigationBarStyle={styles.navbar}
          titleStyle={styles.title}
          component={Posts}
          icon={HomeIcon}
          onRight={() => Actions.home()}
          renderRightButton={SGILogo}
          back
        />

        <Scene
          key="buddismo"
          component={Buddismo}
          onRight={() => Actions.home()}
          renderRightButton={SGILogo}
        />

        <Scene
          key="webview"
          component={WebViewPage}
          back
          onRight={() => Actions.home()}
          renderRightButton={SGILogo}
        />
        <Scene
          key="downloadPdf"
          component={DownloadPDF}
          back
          title="PDF Rivista"
        />
      </Stack>
    </Router>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f4',
  },
  title: {
    color: Colors.primary,
  },
});

export default Routes;
