import React from 'react';
import {StyleSheet} from 'react-native';
import {Router, Scene, Stack} from 'react-native-router-flux';
import {connect} from 'react-redux';

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

import ChangeFontSize from './components/ChangeFontSize';
import {SET_TEXT_SIZE} from './store/mutations';

function Routes({textSize, changeTextSize}) {
  console.log('TextSize Routes', textSize);
  return (
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
          renderRightButton={ChangeFontSize}
          textSize={textSize}
          onRight={changeTextSize}
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

function mapStateToProps(state) {
  return {
    textSize: state.ui.textSize,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeTextSize: () => dispatch({type: SET_TEXT_SIZE}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
