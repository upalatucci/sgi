import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Loading from '../components/Loading';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

export default ({pdfUri}) => {
  console.log(pdfUri, 'PDF');

  useEffect(() => {
    console.log('Download');
    const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.pdf`;
    const options = {
      fromUrl: pdfUri,
      toFile: localFile,
      cacheable: true,
    };
    RNFS.downloadFile(options).promise.then((data) => {
      console.log(data);
      FileViewer.open(localFile);
    });
  }, [pdfUri]);

  return (
    <View style={styles.container}>
      <Loading />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
