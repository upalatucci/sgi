import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {getJsonData} from '../api';
import NewsItem from '../components/NewsItem';

export default () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newsPage, setNewsPage] = useState(1);

  const fetchNews = (nPage) => {
    setLoading(true);
    return getJsonData('news', {
      posts_per_page: 10,
      page: nPage ? nPage : 1,
    })
      .then((newContent) => {
        if (nPage) {
          setContent((prevContent) => [...prevContent, ...newContent.data]);
        } else {
          setContent([...newContent.data]);
        }
      })
      .finally(() => setLoading(false));
  };

  const fetchMoreNews = () => {
    setNewsPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchNews(nextPage);
      return nextPage;
    });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={content}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <NewsItem {...item} />}
        onRefresh={fetchNews}
        refreshing={loading}
        onEndReached={fetchMoreNews}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
});
