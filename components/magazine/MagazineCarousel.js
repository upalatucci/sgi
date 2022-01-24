import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Text from '../ui/Text';
import {getJsonData} from '../../api';
import MagazineImageWithNumber from './MagazineImageWithNumber';
import {Colors} from '../../styles';
import {
  MAGAZINE_DESCRIPTION,
  MAGAZINE_NAMES,
  MAGAZINE_TYPES,
} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {SET_MAGAZINE_CACHE} from '../../store/mutations';

export default ({entrypoint, subInfo, magazine = MAGAZINE_TYPES.NR}) => {
  const dispatch = useDispatch();
  const cachedMagazines = useSelector(
    (state) => state.magazine.cachedMagazines,
  );

  const [magazines, setMagazines] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMagazines = useCallback(() => {
    if (!subInfo) {
      return;
    }
    const cacheKey = `all-${magazine}`;

    console.log(cachedMagazines);
    if (cachedMagazines[cacheKey]) {
      setMagazines(cachedMagazines[cacheKey]);
      setLoading(false);
      return;
    }

    setLoading(true);
    return getJsonData('magazines', subInfo, entrypoint)
      .then((newContent) => {
        setMagazines(newContent.data);
        dispatch({
          type: SET_MAGAZINE_CACHE,
          payload: {[cacheKey]: newContent.data},
        });
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entrypoint, subInfo]);

  useEffect(() => {
    fetchMagazines();
  }, [fetchMagazines]);

  return (
    <View style={[styles.container]}>
      <FlatList
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={magazines}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item, index}) => (
          <MagazineImageWithNumber
            magazineType={magazine}
            magazine={item}
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
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.lightBlue,
    marginBottom: 2,
  },
  magazineDesc: {
    color: Colors.textGray,
    fontSize: 14,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
});
