import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {getJsonData, SGI_ENTRYPOINT} from '../api';
import {connect} from 'react-redux';
import Loading from '../components/Loading';
import CustomWebView from '../components/CustomWebView';
import {SET_POST_CACHE} from '../store/mutations';

function PostPage(props) {
  const {id, uri, entrypoint, storedPosts, cachePost} = props;
  const [content, setContent] = useState(null);

  useEffect(() => {
    const cacheKey = `${uri}-${id}`;

    if (storedPosts[cacheKey]) {
      return setContent(storedPosts[cacheKey]);
    }

    getJsonData(`${uri}/${id}`, null, entrypoint).then((news) => {
      const newsData = news.data[0].full.replace(/(\n\r|\n|\r)/gm, '<br/>');
      setContent(newsData);
      cachePost(cacheKey, newsData);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, uri, entrypoint]);

  if (!content) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.flex}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}>
        <CustomWebView
          content={content + '<br/><br/>'}
          style={entrypoint === SGI_ENTRYPOINT ? 'sito' : 'volocontinuo'}
        />
      </ScrollView>
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
    paddingHorizontal: 10,
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
