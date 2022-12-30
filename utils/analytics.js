import analytics from '@react-native-firebase/analytics';
import {Actions} from 'react-native-router-flux';
import {SGI_ENTRYPOINT} from '../api';

export const sendScreen = async (routeName) => {
  await analytics().logScreenView({
    screen_name: routeName,
    screen_class: routeName,
  });
};

export const sendAnalyticsOnRouteChange = async (currentScene) => {
  const viewProps = currentScene.params;
  console.log(
    currentScene.routeName,
    '#####################',
    currentScene,
    Actions.currentScene,
  );
  switch (Actions.currentScene) {
    case 'article':
      sendScreen(
        `articolo-${viewProps.magazineType}-${viewProps.magazineNumber}-${viewProps.articleTitle}`,
      );
      break;
    case 'magazine':
      sendScreen(
        `rivista-${viewProps.magazineType}-${viewProps.magazine.number}`,
      );
      break;
    case 'postPage':
      sendScreen(
        `${viewProps.entrypoint === SGI_ENTRYPOINT ? 'news' : 'volocontinuo'}-${
          viewProps.id
        }-${viewProps.title}`,
      );
      break;
    case 'frasedelgiorno':
      sendScreen('frasedelgiorno');
      break;
    case 'buddismo':
      sendScreen('buddismo');
      break;
    case 'news':
      sendScreen('news');
      break;
    case 'root':
    case 'MainActivity':
    case 'UIViewController':
    case 'RCTModalHostViewController':
      break;
    default:
      console.log(Actions.currentScene);
      break;
  }
};
