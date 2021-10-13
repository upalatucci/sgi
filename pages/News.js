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
  const [chipSelected, SetChipSelected] = useState(CHIPS.ALL);
  const [flatListScroll, setFlatListScroll] = useState(false);

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

  const onScroll = useCallback((event) => {
    const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;

    if (contentOffset.y + layoutMeasurement.height >= contentSize.height) {
      setFlatListScroll(true);
    }
  }, []);

  const onScrollFlatList = useCallback((event) => {
    const {contentOffset} = event.nativeEvent;
    if (contentOffset.y === 0) {
      setFlatListScroll(false);
    }
  }, []);

  return (
    <SafeAreaView>
        <FlatList
          ref={flatListRef}
          style={[styles.list, {height: screenHeight - 140}]}
          stickyHeaderIndices={[0]}
          scrollEventThrottle={5}
          data={content}
          keyExtractor={(item) => item.id.toString()}
          renderItem={filterNews(chipSelected)}
          onRefresh={() => setPostsPage(1)}
          refreshing={loading}
          onEndReached={onEndReached}
          onEndReachedThreshold={2}
          nestedScrollEnabled={flatListScroll}
          onScroll={onScrollFlatList}
          showsVerticalScrollIndicator={false}
          scrollEnabled={flatListScroll}
        />
        {showScrollToTopButton && <ScrollToTopButton onPress={scrollToTop} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollview: {
    backgroundColor: Colors.background,
  },
  container: {
    paddingHorizontal: 10,
    backgroundColor: Colors.background,
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
});
