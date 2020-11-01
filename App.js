import React from 'react';
import {StyleSheet} from 'react-native';
import {Router, Scene, Tabs, Stack} from 'react-native-router-flux';
import News from './pages/News';
import Buddismo from './pages/Buddismo';
import Riviste from './pages/Riviste';
import FraseDelGiorno from './pages/FraseDelGiorno';
import NewsPage from './pages/NewsPage';
import {Colors} from './styles';
import FraseDelGiornoIcon from './components/icons/FraseDelGiornoIcon';
import HomeIcon from './components/icons/HomeIcon';
import LotusIcon from './components/icons/LotusIcon';
import BookIcon from './components/icons/BookIcon';

export default () => {
  return (
    <Router>
      <Stack key="root">
        <Tabs
          key="tab"
          hideNavBar
          activeBackgroundColor="white"
          inactiveTintColor="white"
          inactiveBackgroundColor={Colors.primary}
          navigationBarStyle={styles.navbar}
          titleStyle={styles.title}>
          <Scene key="news" component={News} icon={HomeIcon} title="News" />
          <Scene
            key="buddismo"
            component={Buddismo}
            icon={LotusIcon}
            title="Buddismo"
          />
          <Scene
            key="riviste"
            component={Riviste}
            icon={BookIcon}
            title="Riviste"
          />
          <Scene
            key="frasedelgiorno"
            component={FraseDelGiorno}
            icon={FraseDelGiornoIcon}
            title="Frase del Giorno"
          />
        </Tabs>
        <Scene
          key="newsPage"
          component={NewsPage}
          back
          title="News"
          navigationBarStyle={styles.navbar}
          titleStyle={styles.title}
          backButtonTintColor="white"
        />
      </Stack>
    </Router>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: Colors.primary,
  },
  title: {
    color: 'white',
  },
});
