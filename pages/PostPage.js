import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {getJsonData, SGI_ENTRYPOINT} from '../api';
import {connect} from 'react-redux';
import Loading from '../components/Loading';
import CustomWebView from '../components/CustomWebView';
import {SET_POST_CACHE} from '../store/mutations';
import {formatDateNews} from '../utils';

function PostPage(props) {
  const {id, uri, entrypoint, storedPosts, cachePost} = props;
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  function processContent(data) {
    let postData = data.full.replace(/(\n\r|\n|\r)/gm, '<br/>');

    if (entrypoint !== SGI_ENTRYPOINT) {
      return postData;
    } else {
      return (
        `<h1 class="entry-title">${data.title}</h1>
        <p class="post-meta">${formatDateNews(
          data.date,
        )} <strong>${data.categories.join(', ')}</strong></p>` + postData
      );
    }
  }

  useEffect(() => {
    const cacheKey = `${uri}-${id}`;

    if (storedPosts[cacheKey]) {
      return setContent(storedPosts[cacheKey]);
    }

    getJsonData(`${uri}/${id}`, null, entrypoint).then((news) => {
      console.log(news.data);
      const processedPost = processContent(news.data[0]);
      setContent(processedPost);
      cachePost(cacheKey, processedPost);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, uri, entrypoint]);

  console.log(content);

  return (
    <SafeAreaView style={styles.flex}>
      {content && (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.container}>
          <CustomWebView
            subtractHeight={100}
            content={content + '<br/><br/>'}
            style={entrypoint === SGI_ENTRYPOINT ? 'sito' : 'volocontinuo'}
            onLoadEnd={() => setLoading(false)}
          />
        </ScrollView>
      )}
      {loading && <Loading />}
    </SafeAreaView>
  );
}

function mapStateToProps(state) {
  return {
    subscriptionInfo: state.magazine.subscriptionInfo,
    storedPosts: state.magazine.cachedPosts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    cachePost: (key, numberData) =>
      dispatch({type: SET_POST_CACHE, payload: {[key]: numberData}}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    justifyContent: 'flex-start',
  },
  title: {
    marginTop: 20,
    fontSize: 22,
    marginBottom: 30,
  },
  webview: {
    height: 400,
    width: '100%',
  },
});
