import React from 'react';
import {StyleSheet} from 'react-native';
import {Drawer, Router, Scene, Stack} from 'react-native-router-flux';

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

import ChangeFontSizeContainer from './components/ChangeFontSizeContainer';
import CustomDrawer from './components/Drawer';

function Routes() {
  return (
    <Router>
      <Drawer contentComponent={CustomDrawer}>
        <Stack
          key="root"
          navigationBarStyle={styles.navbar}
          titleStyle={styles.title}
          backButtonTintColor={Colors.primary}>
          <Scene key="home" component={Home} />
          <Scene
            key="posts"
            navigationBarStyle={styles.navbar}
            titleStyle={styles.title}
            component={Posts}
            icon={HomeIcon}
          />
          <Scene
            drawer
            key="buddismo"
            component={Buddismo}
            icon={LotusIcon}
            renderRightButton={ChangeFontSizeContainer}
          />
          <Scene drawer key="magazines" component={Riviste} icon={BookIcon} />
          <Scene
            drawer
            key="frasedelgiorno"
            component={FraseDelGiorno}
            icon={FraseDelGiornoIcon}
          />
          <Scene
            key="postPage"
            component={PostPage}
            drawer
            renderRightButton={ChangeFontSizeContainer}
          />
          <Scene key="magazine" component={Magazine} drawer />
          <Scene
            key="article"
            component={Article}
            drawer
            renderRightButton={ChangeFontSizeContainer}
          />
          <Scene key="webview" component={WebViewPage} drawer />
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
