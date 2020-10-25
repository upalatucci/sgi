import React from 'react';
import {Router, Scene, Tabs, Stack} from 'react-native-router-flux';
import News from './pages/News';
import Buddismo from './pages/Buddismo';
import Riviste from './pages/Riviste';
import FraseDelGiorno from './pages/FraseDelGiorno';
import NewsPage from './pages/NewsPage';
import IconTab from './components/IconTab';
import {Colors} from './styles';

export default () => {
  return (
    <Router>
      <Stack key="root">
        <Tabs
          key="tab"
          hideNavBar
          activeBackgroundColor="white"
          inactiveTintColor="white"
          inactiveBackgroundColor={Colors.primary}>
          <Scene
            key="news"
            component={News}
            icon={IconTab}
            iconName="home"
            title="News"
          />
          <Scene
            key="buddismo"
            component={Buddismo}
            icon={IconTab}
            iconName="newspaper"
            title="Buddismo"
          />
          <Scene
            key="riviste"
            component={Riviste}
            icon={IconTab}
            iconName="book-outline"
            title="Riviste"
          />
          <Scene
            key="frasedelgiorno"
            component={FraseDelGiorno}
            icon={IconTab}
            title="Frase del Giorno"
          />
        </Tabs>
        <Scene key="newsPage" component={NewsPage} back title="News" />
      </Stack>
    </Router>
  );
};
