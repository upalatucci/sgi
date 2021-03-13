import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, FlatList, Text, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {getJsonData} from '../../api';
import MagazineImageWithNumber from './MagazineImageWithNumber';
import TouchableHighlight from '../CustomTouchableHighlight';
import {Colors} from '../../styles';

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
    <View style={[styles.container]}>
      <FlatList
        style={styles.scrollView}
        horizontal
        data={magazines}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <MagazineImageWithNumber
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
  imageList: {
    height: '100%',
    width: 100,
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
  scrollView: {
    flex: 1,
    minHeight: 150,
  },
  firstContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    minHeight: 150,
    marginVertical: 10,
  },
  titleText: {
    fontSize: 32,
    color: Colors.orange,
    marginBottom: 20,
  },
});
