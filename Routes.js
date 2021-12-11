import React, {useEffect} from 'react';
import {BackHandler, StyleSheet} from 'react-native';
import {
  Drawer,
  Router,
  Scene,
  Stack,
  Actions,
  Tabs,
} from 'react-native-router-flux';

import {Colors} from './styles';
import FraseDelGiornoIcon from './components/icons/FraseDelGiornoIcon';
import HomeIcon from './components/icons/HomeIcon';
import LotusIcon from './components/icons/LotusIcon';
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

import CustomDrawer from './components/Drawer';
import Menu from './components/icons/Menu';
import SGILogo from './components/icons/SGILogoHome';
import MultiUtilsRightButton from './components/MultiUtilsRightButtons';

import NavBar from './components/NavBar';
import TabBar from './components/TabBar';

export function backHandler() {
  const routes = Actions.prevState.routes[0].routes;
  let prevRoute = routes[routes.length - 2];

  if (prevRoute && prevRoute.routeName === 'login') {
    Actions.home();
    return;
  }

  switch (Actions.currentScene) {
    case 'home':
      BackHandler.exitApp();
      break;
    case 'login':
      Actions.home();
      break;
    default:
      if (prevRoute) {
        Actions.popAndPush(prevRoute.routeName, prevRoute.params);
      } else {
        Actions.home();
      }
      break;
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
    <Router>
      <Stack
        key="root"
        navigationBarStyle={styles.navbar}
        navBar={NavBar}
        titleStyle={styles.title}
        backButtonTintColor={Colors.primary}>
        <Tabs
          key="home"
          type="reset"
          hideNavBar
          tabBarComponent={TabBar}
          tabBarPosition="bottom">
          <Scene
            key="homepage"
            type="reset"
            component={Home}
            hideNavBar
            title="Home"
          />

          <Scene
            key="frasedelgiorno"
            component={FraseDelGiorno}
            hideNavBar={true}
            onRight={() => Actions.home()}
            renderRightButton={SGILogo}
            title="Frase del Giorno"
          />

          <Scene
            key="magazines"
            component={Riviste}
            icon={BookIcon}
            title="Riviste"
            hideNavBar={true}
          />
        </Tabs>
        <Scene key="login" component={Login} hideNavBar type="reset" />
        <Scene
          key="posts"
          navigationBarStyle={styles.navbar}
          titleStyle={styles.title}
          component={Posts}
          icon={HomeIcon}
          onRight={() => Actions.home()}
          renderRightButton={SGILogo}
        />
        <Scene
          key="news"
          back
          navigationBarStyle={styles.navbar}
          titleStyle={styles.title}
          component={News}
          icon={HomeIcon}
          onRight={() => Actions.home()}
          renderRightButton={SGILogo}
        />
        <Scene
          back
          key="buddismo"
          component={Buddismo}
          onRight={() => Actions.home()}
          renderRightButton={SGILogo}
        />
        <Scene
          key="postPage"
          component={PostPage}
          back
          renderRightButton={MultiUtilsRightButton}
        />
        <Scene
          key="magazine"
          component={Magazine}
          drawer
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
          key="webview"
          component={WebViewPage}
          drawer
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
