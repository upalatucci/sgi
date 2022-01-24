import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  SafeAreaView,
} from 'react-native';
import {getJsonData, SGI_ENTRYPOINT} from '../api';
import PostsItem from '../components/PostsItem';
import ScrollToTopButton from '../components/ScrollToTopButton';
import {Colors} from '../styles';
import Title from '../components/ui/Title';
import Chip from '../components/ui/Chip';
import PostsPreview from '../components/PostsPreview';
import PostsPreviewLoading from '../components/PostsPreviewLoading';

const CHIPS = {
  ALL: 0,
  EVIDENZA: 1,
  COMUNICATI: 2,
};

function isEvidenza(item) {
  return item.categories.find((c) => c === 'In Evidenza');
}

function isComunicato(item) {
  return item.categories.find((c) => c === 'Comunicati');
}

function filterNews(chipSelected) {
  return ({item}) => {
    if (chipSelected === CHIPS.EVIDENZA && !isEvidenza(item)) {
      return null;
    } else if (chipSelected === CHIPS.COMUNICATI && !isComunicato(item)) {
      return null;
    } else {
      return <PostsItem {...item} uri={'news'} entrypoint={SGI_ENTRYPOINT} />;
    }
  };
}

const PREVIEW_HEIGHT = 350;

export default () => {
  const {height: screenHeight} = useWindowDimensions();
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
      'news',
      {
        posts_per_page: 10,
        page: postsPage,
      },
      SGI_ENTRYPOINT,
    )
      .then((newContent) => {
        if (postsPage > 1) {
          setContent((prevContent) => [...prevContent, ...newContent.data]);
        } else {
          setContent([...newContent.data]);
        }
      })
      .finally(() => setLoading(false));
  }, [postsPage]);

  useEffect(() => {
    setContent([]);
    setPostsPage(1);
  }, []);

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
          <PostsItem {...item} uri={'news'} entrypoint={SGI_ENTRYPOINT} />
        )}
        onRefresh={() => setPostsPage(1)}
        refreshing={loading}
        onEndReached={onEndReached}
        onEndReachedThreshold={2}
      />
      {showScrollToTopButton && <ScrollToTopButton onPress={scrollToTop} onTopOfTabBar={true} />}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollview: {
    backgroundColor: Colors.background,
  },
  container: {
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.background,
    flex: 1,
  },
  preview: {
    height: PREVIEW_HEIGHT,
  },
  title: {
    color: 'black',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  chips: {
    flexDirection: 'row',
    marginBottom: 4,
    backgroundColor: Colors.background,
  },
  list: {
    flex: 1
  }
});
