import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Image, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {getJsonData} from '../api';
import Loading from '../components/Loading';
import {subscriptionDataForMagazine} from '../services/auth';
import {BS_ENTRYPOINT, NR_ENTRYPOINT} from '../api';
import ArticleSection from '../components/magazine/ArticleSection';

const windowHeight = Dimensions.get('window').height;
const Magazine = React.memo(({number, magazine, subscriptionInfo}) => {
  const [magazineContent, setMagazineContent] = useState();

  useEffect(() => {
    getJsonData(
      `number/${number.number}`,
      subscriptionDataForMagazine(subscriptionInfo, magazine),
      magazine === 'nr' ? NR_ENTRYPOINT : BS_ENTRYPOINT,
    ).then((response) => {
      if (response.data) {
        setMagazineContent(response.data);
      }
    });
  }, [number, magazine, subscriptionInfo]);

  if (!magazineContent) {
    return <Loading />;
  }

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={{uri: number.cover}} />
      {Object.entries(magazineContent.summary).map(([key, section]) => (
        <ArticleSection key={key} section={section} magazine={magazine} />
      ))}
    </ScrollView>
  );
});

function mapStateToProps(state) {
  return {
    subscriptionInfo: state.magazine.subscriptionInfo,
  };
}

export default connect(mapStateToProps)(Magazine);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: windowHeight / 3,
    resizeMode: 'center',
    margin: 10,
  },
});
