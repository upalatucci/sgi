import {format, parse} from 'date-fns';
import React from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {SGI_ENTRYPOINT} from '../../api';
import {Colors} from '../../styles';
import TouchableHighlight from '../CustomTouchableHighlight';
import Text from '../ui/Text';

export default ({title, id, date}) => (
  <TouchableHighlight
    style={[styles.container, {width: useWindowDimensions().width * 0.43}]}
    onPress={() =>
      Actions.postPage({
        id: id,
        entrypoint: SGI_ENTRYPOINT,
        uri: 'news',
        title: title,
      })
    }>
    <>
      <Text style={styles.date}>
        {format(parse(date, 'dd/MM/yyyy', new Date()), 'dd.MM.yyyy')}
      </Text>
      <Text style={styles.title} numberOfLines={3}>
        {title}
      </Text>
    </>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.background,
    height: '100%',
    borderRadius: 8,
    marginLeft: 8,
  },
  date: {
    position: 'absolute',
    top: 8,
    right: 12,
    fontSize: 10,
  },
  title: {
    marginTop: 14,
    fontSize: 14,
  },
});
