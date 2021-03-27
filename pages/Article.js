import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {getJsonData} from '../api';
import Loading from '../components/Loading';
import {subscriptionDataForMagazine} from '../services/auth';
import {BS_ENTRYPOINT, NR_ENTRYPOINT} from '../api';
import CustomWebView from '../components/CustomWebView';
import {Colors, TitleStyle} from '../styles';
import {SET_ARTICLE_CACHE} from '../store/mutations';
<<<<<<< HEAD
import ChangeFontSizeContainer from '../components/ChangeFontSizeContainer';
import {WithLocalSvg} from 'react-native-svg';
import GoToMagazines from '../assets/goToMagazines.svg';
import ShareIcon from '../assets/share.svg';
import TouchableHighlight from '../components/CustomTouchableHighlight';
import {categoriesArrayToString} from '../utils';
=======
>>>>>>> 6f41b5a19ce009d1b5d0a7ba2cc67e7a0bf6c2c0

const Article = React.memo(
  ({
    articleId,
    magazine,
    articleTitle,
    articleSubtitle,
    categories,
    subscriptionInfo,
    storedArticles,
    cacheArticle,
  }) => {
    const [articleContent, setArticleContent] = useState();
    const [loading, setLoading] = useState(true)

    function shareArticle() {}

    useEffect(() => {
      if (!subscriptionInfo || !magazine || !articleId) {
        return;
      }

      const cacheKey = `${magazine}-${articleId}`;

      console.log(storedArticles[cacheKey], storedArticles);
      if (storedArticles[cacheKey]) {
        return setArticleContent(storedArticles[cacheKey]);
      }

      getJsonData(
        `articles/${articleId}`,
        subscriptionDataForMagazine(subscriptionInfo, magazine),
        magazine === 'nr' ? NR_ENTRYPOINT : BS_ENTRYPOINT,
      ).then((response) => {
        if (response.data) {
          setArticleContent(response.data[0]);
          cacheArticle(cacheKey, response.data[0]);
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [articleId, magazine, subscriptionInfo]);

    if (!subscriptionInfo) {
      Actions.magazines({onBack: () => Actions.home()});
    }

    if (!articleContent) {
      return <Loading />;
    }

    return (
      <SafeAreaView style={styles.flex}>
        {articleContent && (
          <CustomWebView
            subtractHeight={100}
            content={`
          <div class="post-category entry-category">${categoriesArrayToString(
            categories,
            magazine,
          )}</div>
          <h1 class="entry-title">${articleTitle}</h1>
          <div class="post-teaser entry-teaser">${articleSubtitle}</div>
          <div class="post-content entry-content">
            ${articleContent.full}
          </div>`}
            style="magazine"
            onLoadEnd={() => {setLoading(false)}}
          />
        )}
        {loading && <Loading /> }
      </SafeAreaView>
    );
  },
);

function mapStateToProps(state) {
  return {
    subscriptionInfo: state.magazine.subscriptionInfo,
    storedArticles: state.magazine.cachedArticles,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    cacheArticle: (key, numberData) =>
      dispatch({type: SET_ARTICLE_CACHE, payload: {[key]: numberData}}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  title: {
    ...TitleStyle,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.gray,
  },
});
