import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {getJsonData} from '../api';
import Loading from '../components/Loading';
import {subscriptionDataForMagazine} from '../services/auth';
import {BS_ENTRYPOINT, NR_ENTRYPOINT} from '../api';
import CustomWebView from '../components/CustomWebView';
import {Colors, TitleStyle} from '../styles';
import {SET_ARTICLE_CACHE} from '../store/mutations';

const Article = React.memo(
  ({
    articleId,
    magazine,
    articleTitle,
    articleSubtitle,
    subscriptionInfo,
    storedArticles,
    cacheArticle,
  }) => {
    const [articleContent, setArticleContent] = useState();

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
        <CustomWebView
          content={`
          <div class="post-category entry-category"></div>
          <h1 class="entry-title">${articleTitle}</h1>
          <div class="post-teaser entry-teaser">${articleSubtitle}</div>
          <div class="post-content entry-content">
            ${articleContent.full}
          </div>`}
          style="magazine"
        />
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
