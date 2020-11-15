import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

export default ({category, section}) => {
  console.log(section);
  return (
    <View style={styles.container}>
      {Object.entries(section.articles).map(([key, article]) => (
        <View style={styles.container} key={key}>
          <Text>{article.title}</Text>
          {article.subtitle ? <Text>{article.subtitle}</Text> : null}
          <Text>{article.excerpt}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
