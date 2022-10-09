import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Loading from '../components/Loading';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

export default ({pdfUri}) => {
  const [error, setError] = useState();
  console.log(pdfUri, 'PDF');

  useEffect(() => {
    setError(null);

    console.log('Download');
    const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.pdf`;
    const options = {
      fromUrl: pdfUri,
      toFile: localFile,
      cacheable: true,
    };
    RNFS.downloadFile(options)
      .promise.then((data) => {
        console.log(data);
        FileViewer.open(localFile).catch(setError);
      })
      .catch(setError);
  }, [pdfUri]);

  return (
    <View style={styles.container}>
      {error ? (
        <View>
          <Text style={styles.errorTitle}>Errore!</Text>
          <Text style={styles.errorMessage}>{error.message}</Text>
        </View>
      ) : (
        <Loading />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  errorTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 18,
  },
});
