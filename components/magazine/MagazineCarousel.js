import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {getJsonData} from '../../api';
import MagazineImageWithNumber from './MagazineImageWithNumber';
import {Colors} from '../../styles';
import {
  MAGAZINE_DESCRIPTION,
  MAGAZINE_NAMES,
  MAGAZINE_TYPES,
} from '../../utils';

export default ({entrypoint, subInfo, magazine = MAGAZINE_TYPES.NR}) => {
  const [magazines, setMagazines] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMagazines = useCallback(() => {
    if (!subInfo) {
      return;
    }

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
        contentContainerStyle={styles.scrollViewContent}
        horizontal
        data={magazines}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item, index}) => (
          <MagazineImageWithNumber
            magazine={magazine}
            number={item}
            index={index}
          />
        )}
        onRefresh={fetchMagazines}
        refreshing={loading}
      />
      <View style={styles.containerText}>
        <Text style={styles.magazineTitle}>{MAGAZINE_NAMES[magazine]}</Text>
        <Text style={styles.magazineDesc}>
          {MAGAZINE_DESCRIPTION[magazine]}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerText: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  scrollView: {
    flex: 1,
    minHeight: 220,
  },
  firstContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    minHeight: 220,
    marginVertical: 10,
  },
  magazineTitle: {
    fontSize: 20,
    color: Colors.lightBlue,
  },
  magazineDesc: {
    color: Colors.textGray,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
});
