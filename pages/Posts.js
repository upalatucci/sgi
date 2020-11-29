import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {getJsonData} from '../api';
import PostsItem from '../components/PostsItem';

export default ({uri, entrypoint, title, navigation}) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postsPage, setPostsPage] = useState(1);

  const fetchMorePosts = () => {
    setPostsPage(postsPage + 1);
  };

  useEffect(() => {
    setLoading(true);
    getJsonData(
      uri,
      {
        posts_per_page: 10,
        page: postsPage,
      },
      entrypoint,
    )
      .then((newContent) => {
        if (postsPage > 1) {
          setContent((prevContent) => [...prevContent, ...newContent.data]);
        } else {
          setContent([...newContent.data]);
        }
      })
      .finally(() => setLoading(false));
  }, [uri, entrypoint, postsPage]);

  useEffect(() => {
    navigation.setParams({
      title,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  useEffect(() => {
    setContent([]);
    setPostsPage(1);
  }, [uri, entrypoint]);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={content}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <PostsItem {...item} uri={uri} entrypoint={entrypoint} />
        )}
        onRefresh={() => setPostsPage(1)}
        refreshing={loading}
        onEndReached={fetchMorePosts}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  list: {
    flex: 1,
  },
});