import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {format} from 'date-fns';
import {getJsonData, VOLO_ENTRYPOINT} from '../api';
import Loading from '../components/Loading';
import CustomHTML from '../components/CustomHTML';

export default () => {
  const [content, setContent] = useState();

  useEffect(() => {
    const nowString = format(new Date(), 'dd/MM/yyyy');

    getJsonData('frase', {}, VOLO_ENTRYPOINT)
      .then((response) =>
        setContent(response.data.find((p) => p.date === nowString)),
      )
      .catch((err) => console.log(err));
  }, []);

  if (!content) {
    return <Loading />;
  } else {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <CustomHTML
          content={content.full}
          additionalTagsStyles={{
            p: {marginBottom: 30, fontSize: 18},
            strong: {fontSize: 20},
          }}
        />
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    marginHorizontal: 40,
  },
});
