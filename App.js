import React from 'react';
import {Router, Scene, Tabs} from 'react-native-router-flux';
import News from './pages/News';
import Buddismo from './pages/Buddismo';
import Riviste from './pages/Riviste';
import FraseDelGiorno from './pages/FraseDelGiorno';
import IconTab from './components/IconTab';

export default () => {
  return (
    <Router>
      <Tabs
        key="root"
        hideNavBar
        activeBackgroundColor="white"
        inactiveTintColor="white"
        inactiveBackgroundColor="#3F85AF">
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
    </Router>
  );
};
