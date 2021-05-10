import React, {useEffect, useRef, useState, useCallback} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {getJsonData} from '../api';
import PostsItem from '../components/PostsItem';
import ScrollToTopButton from '../components/ScrollToTopButton';
import {TitleStyle, Colors} from '../styles';

export default ({uri, entrypoint, title}) => {
  const flatListRef = useRef();
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postsPage, setPostsPage] = useState(1);
  const [showScrollToTopButton, setScrollToTopButton] = useState(false);

  const fetchMorePosts = useCallback(() => {
    setPostsPage(postsPage + 1);
  }, [postsPage]);

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

  const onEndReached = useCallback(() => {
    fetchMorePosts();

    if (!showScrollToTopButton && flatListRef.current) {
      setScrollToTopButton(true);
    }
  }, [fetchMorePosts, showScrollToTopButton]);

  const scrollToTop = useCallback(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({animated: true, index: 0});
      setScrollToTopButton(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        style={styles.list}
        data={content}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <PostsItem {...item} uri={uri} entrypoint={entrypoint} />
        )}
        onRefresh={() => setPostsPage(1)}
        refreshing={loading}
        onEndReached={onEndReached}
        onEndReachedThreshold={2}
      />

      {showScrollToTopButton && <ScrollToTopButton onPress={scrollToTop} />}
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
