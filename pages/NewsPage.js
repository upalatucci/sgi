import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {getJsonData} from '../api';
import Loading from '../components/Loading';
import CustomHTML from '../components/CustomHTML';

export default (props) => {
  const {id} = props;
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getJsonData(`news/${id}`)
      .then((news) => setContent(news))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView style={styles.container}>
      {content ? (
        <CustomHTML content={content.data[0].full + '<br><br>'} />
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
});
