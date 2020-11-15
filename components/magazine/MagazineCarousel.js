import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import MagazineImage from './MagazineImage';
import {getJsonData} from '../../api';

export default ({lastNumber, entrypoint, subInfo, magazine = 'nr'}) => {
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
        <MagazineImage
          containerStyle={styles.containerImage}
          number={lastNumber}
          style={styles.image}
          magazine={magazine}
        />
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
          <MagazineImage
            style={styles.imageList}
            magazine={magazine}
            number={item}
          />
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
  containerImage: {
    flex: 1,
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
