import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {getJsonData} from '../api';
import NewsItem from '../components/NewsItem';
import Loading from '../components/Loading';

export default () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newsPage, setNewsPage] = useState(10);

  useEffect(() => {
    setLoading(true);
    getJsonData('news', {posts_per_page: newsPage})
      .then((news) => setContent(news))
      .finally(() => setLoading(false));
  }, [newsPage]);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {content ? (
        <FlatList
          data={content.data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <NewsItem {...item} />}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
});
