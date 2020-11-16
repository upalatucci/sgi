import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import {getJsonData} from '../api';
import Loading from '../components/Loading';
import {subscriptionDataForMagazine} from '../services/auth';
import {BS_ENTRYPOINT, NR_ENTRYPOINT} from '../api';
import CustomHTML from '../components/CustomHTML';
import {Colors, TitleStyle} from '../styles';

const Article = React.memo(
  ({articleId, magazine, articleTitle, articleSubtitle, subscriptionInfo}) => {
    const [articleContent, setArticleContent] = useState();

    useEffect(() => {
      getJsonData(
        `articles/${articleId}`,
        subscriptionDataForMagazine(subscriptionInfo, magazine),
        magazine === 'nr' ? NR_ENTRYPOINT : BS_ENTRYPOINT,
      ).then((response) => {
        if (response.data) {
          setArticleContent(response.data[0]);
        }
      });
    }, [articleId, magazine, subscriptionInfo]);

    if (!articleContent) {
      return <Loading />;
    }

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{articleTitle}</Text>
        <Text style={styles.subtitle}>{articleSubtitle}</Text>
        <CustomHTML content={articleContent.full} />
      </ScrollView>
    );
  },
);

function mapStateToProps(state) {
  return {
    subscriptionInfo: state.magazine.subscriptionInfo,
  };
}

export default connect(mapStateToProps)(Article);

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    ...TitleStyle,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.gray,
  },
});
