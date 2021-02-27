import React, {useState, useEffect, useCallback} from 'react';
<<<<<<< HEAD
import {View, StyleSheet, FlatList, Text} from 'react-native';
import MagazineImage from './MagazineImage';
import {getJsonData} from '../../api';
import MagazineImageWithNumber from './MagazineImageWithNumber';
import {
  Colors,
  PrimaryButtonTitleStyle,
  PrimaryButtonStyle,
=======
import {View, StyleSheet, FlatList, Text, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {getJsonData} from '../../api';
import MagazineImageWithNumber from './MagazineImageWithNumber';
import TouchableHighlight from '../CustomTouchableHighlight';
import {
  Colors,
>>>>>>> bb7dc9d7ddaaba19969fc3fa8b9d5b5dbaa2f38a
} from '../../styles';

export default ({lastNumber, entrypoint, subInfo, magazine = 'nr'}) => {
  const [magazines, setMagazines] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMagazines = useCallback(() => {
    setLoading(true);
    return getJsonData('magazines', subInfo, entrypoint)
      .then((newContent) => {
        setMagazines([...newContent.data]);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [entrypoint, subInfo]);

  useEffect(() => {
    fetchMagazines();
  }, [fetchMagazines]);

  return (
    <View style={[styles.container]}>
      <View style={styles.firstContainer}>
        {lastNumber ? (
<<<<<<< HEAD
          <>
            <MagazineImage
              containerStyle={styles.containerImage}
              number={lastNumber}
              style={styles.image}
              magazine={magazine}
            />
            <View style={styles.container}>
              <Text style={styles.titleText}>{lastNumber.number}</Text>
            </View>
          </>
=======
          <TouchableHighlight 
            style={{flex: 4, flexDirection: "row"}} 
            onPress={() =>
              lastNumber
                ? Actions.magazine({
                    number: lastNumber,
                    magazine: magazine,
                  })
                : null
            }
          >
            <>

              <Image
                style={styles.image}
                source={{uri: lastNumber?.cover}}
              />
              <View style={styles.container}>
                <Text style={styles.titleText}>{lastNumber.number_desc}</Text>
              </View>
            </>
          </TouchableHighlight>
>>>>>>> bb7dc9d7ddaaba19969fc3fa8b9d5b5dbaa2f38a
        ) : null}
      </View>
      <FlatList
        style={styles.scrollView}
        horizontal
        data={magazines.slice(1)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <MagazineImageWithNumber
            style={styles.imageList}
            magazine={magazine}
            number={item}
          />
        )}
        onRefresh={fetchMagazines}
        refreshing={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    flex: 1,
    height: '100%',
    resizeMode: 'contain',
    alignItems: 'flex-start',
  },
<<<<<<< HEAD
  containerImage: {
    flex: 1,
  },
=======
>>>>>>> bb7dc9d7ddaaba19969fc3fa8b9d5b5dbaa2f38a
  imageList: {
    height: '100%',
    width: 100,
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
  scrollView: {
<<<<<<< HEAD
    flex: 2,
=======
    flex: 1,
    minHeight: 150,
>>>>>>> bb7dc9d7ddaaba19969fc3fa8b9d5b5dbaa2f38a
  },
  firstContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
<<<<<<< HEAD
=======
    minHeight: 150,
    marginVertical: 10
>>>>>>> bb7dc9d7ddaaba19969fc3fa8b9d5b5dbaa2f38a
  },
  titleText: {
    fontSize: 32,
    color: Colors.orange,
    marginBottom: 20,
  },
<<<<<<< HEAD
  loginButton: {
    ...PrimaryButtonStyle,
    width: 140,
  },
  loginTextButton: {
    ...PrimaryButtonTitleStyle,
  },
=======
>>>>>>> bb7dc9d7ddaaba19969fc3fa8b9d5b5dbaa2f38a
});
