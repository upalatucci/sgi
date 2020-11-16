import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {
  DefaultShadow,
  DefaultBorderRadius,
  Colors,
  TitleStyle,
} from '../../styles';
import TouchableHighlight from '../CustomTouchableHighlight';
import {Actions} from 'react-native-router-flux';

export default ({section, magazine}) => {
  const sectionArticles = Object.entries(section.articles);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.category}>
        {sectionArticles.length > 1
          ? section.category.toUpperCase()
          : sectionArticles[0][1].categories
              .map((c) => c.toUpperCase())
              .join(', ')}
      </Text>
      {sectionArticles.map(([key, article]) => (
        <TouchableHighlight
          key={key}
          onPress={() =>
            Actions.article({
              magazine,
              articleId: article.id,
              articleTitle: article.title,
              articleSubtitle: article.subtitle,
            })
          }>
          <View style={styles.container}>
            <Text
              style={[
                styles.title,
                article.subtitle ? null : styles.titleMargin,
              ]}>
              {article.title}
            </Text>
            {article.subtitle ? (
              <Text style={[styles.subtitle, styles.titleMargin]}>
                {article.subtitle}
              </Text>
            ) : null}
            <Text style={styles.excerpt}>
              {article.excerpt.replace(/(\r\n|\n|\r)/gm, ' ')}
            </Text>
          </View>
        </TouchableHighlight>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 20,
    ...DefaultShadow,
    borderRadius: DefaultBorderRadius,
    borderWidth: 1,
    borderColor: Colors.light,
    backgroundColor: Colors.light,
    padding: 15,
  },
  container: {
    flex: 1,
    marginBottom: 8,
  },
  title: {
    ...TitleStyle,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark,
  },
  titleMargin: {
    marginBottom: 6,
  },
  exceprt: {
    fontSize: 18,
    color: Colors.gray,
  },
  category: {
    fontWeight: 'bold',
    color: Colors.gray,
  },
});
