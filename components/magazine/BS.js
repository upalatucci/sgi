import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {getJsonData, BS_ENTRYPOINT} from '../../api';
import {Colors} from '../../styles';

const BS = ({lastBSImage}) => {
  const [magazines, setMagazines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchMagazines = (nPage) => {
    setLoading(true);
    return getJsonData(
      'articles',
      {
        posts_per_page: 10,
        page: nPage ? nPage : 1,
      },
      BS_ENTRYPOINT,
    )
      .then((newContent) => {
        if (nPage) {
          setMagazines((prevContent) => [...prevContent, ...newContent.data]);
        } else {
          setMagazines([...newContent.data]);
        }
      })
      .finally(() => setLoading(false));
  };

  const fetchMoreMagazines = () => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchMagazines(nextPage);
      return nextPage;
    });
  };

  useEffect(() => {
    fetchMagazines();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{uri: lastBSImage}} style={styles.image} />
      <FlatList
        style={styles.scrollView}
        horizontal
        data={magazines}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <Image source={{uri: item.cover}} style={styles.imageList} />
        )}
        onRefresh={fetchMagazines}
        refreshing={loading}
        onEndReached={fetchMoreMagazines}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

export default connect((state) => {
  return {
    lastBSImage: state.magazine.lastBSImage,
  };
})(BS);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    height: 100,
    width: 100,
  },
  imageList: {
    height: 100,
    width: 100,
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
  scrollView: {
    flex: 3,
    backgroundColor: Colors.gray,
  },
});
