import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import NewsCard from './NewsCard';
import Loading from '../Loading';

export default ({lastNews}) => (
  <View style={styles.container}>
    {lastNews ? (
      <FlatList
        style={styles.list}
        data={lastNews}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <NewsCard {...item} />}
      />
    ) : (
      <Loading
        absolutePositioning={false}
        style={styles.newsLoading}
        withText={false}
      />
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});
