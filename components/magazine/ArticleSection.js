import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from '../ui/Text';
import {
  DefaultShadow,
  DefaultBorderRadius,
  Colors,
  TitleStyle,
} from '../../styles';
import TouchableHighlight from '../CustomTouchableHighlight';
import {Actions} from 'react-native-router-flux';
import CustomHTML from '../CustomHTML';

export default ({section, magazine}) => {
  const sectionArticles = Object.entries(section.articles);

  console.log(sectionArticles);
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.category}>
        {sectionArticles.length > 1
          ? section.category.toUpperCase()
          : sectionArticles[0][1].categories[0]}
      </Text>
      {sectionArticles.map(([key, article]) => {
        const formattedExcerpt = article.excerpt
          .trim()
          .replace(/(\r\n|\n|\r|<br ?\/>)/gm, ' ');
        return (
          <TouchableHighlight
            key={key}
            onPress={() =>
              Actions.article({
                magazine,
                articleId: article.id,
                articleTitle: article.title,
                articleSubtitle: article.subtitle,
                category: article.categories[0],
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
                  {article.subtitle.replace(/&nbsp/gm, '')}
                </Text>
              ) : null}
              {formattedExcerpt.length ? (
                <CustomHTML content={formattedExcerpt} />
              ) : null}
            </View>
          </TouchableHighlight>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 20,
    marginVertical: 10,
    ...DefaultShadow,
    borderRadius: DefaultBorderRadius,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
    padding: 15,
  },
  container: {
    flex: 1,
    marginBottom: 14,
  },
  title: {
    ...TitleStyle,
    color: 'black',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark,
    marginBottom: 3,
  },
  titleMargin: {
    marginBottom: 6,
  },
  category: {
    fontWeight: 'bold',
    color: Colors.lightBlue,
  },
  image: {
    position: 'absolute',
    height: 150,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
});
