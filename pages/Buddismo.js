import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {getJsonData} from '../api';
import BuddismoItem from '../components/BuddismoItem';
import Loading from '../components/Loading';

export default () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJsonData('posts/4016')
      .then((posts) => setContent(posts))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {content ? (
        <FlatList
          data={content.data}
          keyExtractor={(item) => item.title}
          renderItem={({item}) => <BuddismoItem {...item} />}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
});
