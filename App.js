import React from 'react';
import {StyleSheet} from 'react-native';
import {Router, Scene, Tabs, Stack} from 'react-native-router-flux';
import News from './pages/News';
import Buddismo from './pages/Buddismo';
import Riviste from './pages/Riviste';
import FraseDelGiorno from './pages/FraseDelGiorno';
import NewsPage from './pages/NewsPage';
import Home from './pages/Home';
import {Colors} from './styles';
import FraseDelGiornoIcon from './components/icons/FraseDelGiornoIcon';
import HomeIcon from './components/icons/HomeIcon';
import LotusIcon from './components/icons/LotusIcon';
import BookIcon from './components/icons/BookIcon';

export default () => {
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
          key="news"
          navigationBarStyle={styles.navbar}
          titleStyle={styles.title}
          component={News}
          icon={HomeIcon}
          title="News"
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
          key="riviste"
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
        <Scene key="newsPage" component={NewsPage} back title="News" />
      </Stack>
    </Router>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: 'white',
  },
  title: {
    color: Colors.primary,
  },
});
