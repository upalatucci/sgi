import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
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
    magazineType,
    magazineNumber,
    articleTitle,
    articleSubtitle,
    category,
  }) => {
    const {subscriptionInfo, storedArticles} = useSelector((state) => ({
      subscriptionInfo: state.magazine.subscriptionInfo,
      storedArticles: state.magazine.cachedArticles,
    }));

    const dispatch = useDispatch();
    const [articleContent, setArticleContent] = useState();
    const [loading, setLoading] = useState(true);
    const cacheKey = `${magazineType}-${magazineNumber}-${articleTitle}`;

    function shareArticle() {}

    useEffect(() => {
      if (!subscriptionInfo || !magazineType || !articleId) {
        return;
      }

      if (storedArticles[cacheKey]) {
        console.log(storedArticles[cacheKey]);
        return setArticleContent(storedArticles[cacheKey]);
      }

      getJsonData(
        `articles/${articleId}`,
        subscriptionDataForMagazine(subscriptionInfo, magazineType),
        magazineType === 'nr' ? NR_ENTRYPOINT : BS_ENTRYPOINT,
      ).then((response) => {
        console.log('full article', response.data[0].full);
        if (response.data) {
          console.log(response.data);
          setArticleContent(response.data[0]);
          dispatch({
            type: SET_ARTICLE_CACHE,
            payload: {[cacheKey]: response.data[0]},
          });
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [articleId, magazineType, subscriptionInfo]);

    if (!subscriptionInfo) {
      Actions.magazines({onBack: () => Actions.home()});
    }

    if (!articleContent) {
      return <Loading />;
    }

    const highlightMagazineKey = `${cacheKey}-${magazineNumber}-${articleTitle}`;
    return (
      <SafeAreaView style={styles.flex}>
        {articleContent && (
          <CustomWebView
            magazineKey={highlightMagazineKey}
            contentHeader={`<div class="post-category entry-category">${category}</div>
            <h1 class="entry-title">${articleTitle}</h1>
            <div class="post-teaser entry-teaser">${articleSubtitle}</div>
            <img class="post-img" src="${articleContent.image}" />`}
            content={`
              <div class="post-content entry-content">
                ${articleContent.full}
              </div>
            `}
            style="magazine"
            onLoadEnd={() => {
              setLoading(false);
            }}
            enableHighlight={false}
          />
        )}
        {loading && <Loading />}
      </SafeAreaView>
    );
  },
);

export default Article;

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
