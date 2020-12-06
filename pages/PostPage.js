import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {getJsonData} from '../api';
import Loading from '../components/Loading';
import CustomHTML from '../components/CustomHTML';

export default (props) => {
  const {id, uri, entrypoint, title} = props;
  const [content, setContent] = useState(null);

  useEffect(() => {
    getJsonData(`${uri}/${id}`, null, entrypoint).then((news) =>
      setContent(news.data[0].full.replace(/(\n\r|\n|\r)/gm, '<br/>')),
    );
  }, [id, uri, entrypoint]);

  if (!content) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.flex}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}>
        <CustomHTML
          content={content + '<br/><br/>'}
          additionalTagsStyles={{
            h3: {fontSize: 18, color: 'black'},
            a: {fontSize: 18, textDecorationLine: null},
            img: {resizeMode: 'contain'},
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 10,
  },
  container: {
    justifyContent: 'flex-start',
  },
  title: {
    marginTop: 20,
    fontSize: 22,
    marginBottom: 30,
  },
  webview: {
    height: 400,
    width: '100%',
  },
});
