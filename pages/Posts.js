import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {getJsonData} from '../api';
import PostsItem from '../components/PostsItem';
import {TitleStyle, Colors} from '../styles';

export default ({uri, entrypoint, title}) => {
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
    paddingHorizontal: 10,
    backgroundColor: Colors.background,
  },
  list: {
    flex: 1,
  },
  title: {
    ...TitleStyle,
    paddingHorizontal: 10,
    color: Colors.dark,
  },
});
