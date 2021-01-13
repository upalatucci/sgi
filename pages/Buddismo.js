import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {getJsonData} from '../api';
import Loading from '../components/Loading';
import CustomWebView from '../components/CustomWebView';

export default () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJsonData('posts/4016')
      .then((posts) => setContent(posts.data[0]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loading />}
      {content ? (
        <CustomWebView
          content={`<br/><h1>${content.title}</h1>${content.full}`}
          onLoadEnd={() => setLoading(true)}
        />
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
