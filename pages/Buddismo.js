import React, {useEffect, useState} from 'react';
import {ScrollView, SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {getJsonData} from '../api';
import Loading from '../components/Loading';
import CustomWebView from '../components/CustomWebView';
import {TitleStyle} from '../styles';

export default () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJsonData('posts/4016')
      .then((posts) => setContent(posts.data[0]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {content ? (
        <CustomWebView content={`<h1>${content.title}</h1>${content.full}`} />
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
