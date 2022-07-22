import analytics from '@react-native-firebase/analytics';
import {SGI_ENTRYPOINT} from '../api';

export const sendScreen = async (routeName) => {
  await analytics().logScreenView({
    screen_name: routeName,
    screen_class: routeName,
  });
};

export const sendAnalyticsOnRouteChange = async (currentScene) => {
  const viewProps = currentScene.params;
  switch (currentScene.routeName) {
    case 'article':
      sendScreen(
        `articolo-${viewProps.magazine}-${viewProps.articleId}-${viewProps.articleTitle}`,
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
    default:
      sendScreen(currentScene.routeName);
      console.log(currentScene.routeName);
      break;
  }
};
