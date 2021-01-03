import React, {useEffect, useState} from 'react';
import {ScrollView, SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {getJsonData} from '../api';
import Loading from '../components/Loading';
import CustomWebView from '../components/CustomWebView';
import {TitleStyle} from '../styles';

export default () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJsonData('posts/4016')
      .then((posts) => setContent(posts.data[0]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        {content ? (
          <View style={styles.container}>
            <Text style={styles.title}>{content.title}</Text>
            <View style={styles.container}>
              <CustomWebView content={content.full} />
            </View>
          </View> 
          ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    ...TitleStyle,
  },
  container: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
});
