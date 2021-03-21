import React, {useEffect} from 'react';
import {BackHandler, StyleSheet} from 'react-native';
import {Drawer, Router, Scene, Stack, Actions} from 'react-native-router-flux';

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
import Magazine from './pages/Magazine';
import Login from './pages/Login';

import ChangeFontSizeContainer from './components/ChangeFontSizeContainer';
import CustomDrawer from './components/Drawer';
import Menu from './components/icons/Menu';
import SGILogo from './components/icons/SGILogoHome';

export function backHandler() {
  const routes = Actions.prevState.routes[0].routes;
  const prevRoute = routes[routes.length - 2];

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
      Actions.popAndPush(prevRoute.routeName, prevRoute.params);
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
      <Drawer contentComponent={CustomDrawer} drawerIcon={Menu} key="drawer">
        <Stack
          key="root"
          navigationBarStyle={styles.navbar}
          titleStyle={styles.title}
          backButtonTintColor={Colors.primary}>
          <Scene
            key="home"
            type="reset"
            component={Home}
            onRight={() => Actions.home()}
            renderRightButton={SGILogo}
          />
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
            drawer
            key="buddismo"
            component={Buddismo}
            icon={LotusIcon}
            renderRightButton={ChangeFontSizeContainer}
          />
          <Scene
            drawer
            key="magazines"
            component={Riviste}
            icon={BookIcon}
            onRight={() => Actions.home()}
            renderRightButton={SGILogo}
          />
          <Scene
            drawer
            key="frasedelgiorno"
            component={FraseDelGiorno}
            icon={FraseDelGiornoIcon}
            onRight={() => Actions.home()}
            renderRightButton={SGILogo}
          />
          <Scene
            key="postPage"
            component={PostPage}
            back
            renderRightButton={ChangeFontSizeContainer}
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
            renderRightButton={ChangeFontSizeContainer}
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
      </Drawer>
    </Router>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: 'white',
  },
  title: {
    color: Colors.primary,
  },
});

export default Routes;
