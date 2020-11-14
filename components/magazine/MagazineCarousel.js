import React, {useState, useEffect, useCallback} from 'react';
import {View, Image, StyleSheet, FlatList, Text} from 'react-native';
import {getJsonData} from '../../api';

export default ({firstImage, entrypoint, subInfo}) => {
  const [magazines, setMagazines] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMagazines = useCallback(() => {
    setLoading(true);
    return getJsonData('magazines', subInfo, entrypoint)
      .then((newContent) => {
        setMagazines([...newContent.data]);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [entrypoint, subInfo]);

  useEffect(() => {
    fetchMagazines();
  }, [fetchMagazines]);

  return (
    <View style={styles.container}>
      <View style={styles.firstContainer}>
        <Image source={{uri: firstImage}} style={styles.image} />
        <View style={styles.container}>
          <Text>Articoli</Text>
        </View>
      </View>
      <FlatList
        style={styles.scrollView}
        horizontal
        data={magazines.slice(1)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <Image source={{uri: item.cover}} style={styles.imageList} />
        )}
        onRefresh={fetchMagazines}
        refreshing={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    flex: 1,
    height: '100%',
    resizeMode: 'contain',
    alignItems: 'flex-start',
  },
  imageList: {
    height: '100%',
    width: 100,
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
  scrollView: {
    flex: 2,
  },
  firstContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
});
