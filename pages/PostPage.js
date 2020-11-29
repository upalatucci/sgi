import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {getJsonData} from '../api';
import Loading from '../components/Loading';
import CustomHTML from '../components/CustomHTML';

export default (props) => {
  const {id, uri, entrypoint, title} = props;
  const [content, setContent] = useState(null);

  useEffect(() => {
    getJsonData(`${uri}/${id}`, null, entrypoint).then((news) =>
      setContent(news),
    );
  }, [id, uri, entrypoint]);

  useEffect(() => {
    props.navigation.setParams({
      title,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  if (!content) {
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
