import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {getJsonData} from '../api';
import BuddismoItem from '../components/BuddismoItem';
import Loading from '../components/Loading';

export default () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJsonData('posts/4016')
      .then((posts) => setContent(posts))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView style={styles.container}>
      {content ? <BuddismoItem {...content.data[0]} /> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
});
