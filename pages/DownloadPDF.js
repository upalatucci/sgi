import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';

import Pdf from 'react-native-pdf';

export default ({pdfUri}) => {
  console.log(pdfUri, 'PDF');
  return (
    <View style={styles.container}>
      <Pdf
        source={{
          uri: pdfUri,
          cache: true,
        }}
        style={styles.pdf}
      />
    </View>
  );
};

// import RNFS from 'react-native-fs';
// import FileViewer from 'react-native-file-viewer';
// import { Platform } from 'react-native';

// const url = 'https://github.com/vinzscam/react-native-file-viewer/raw/master/docs/react-native-file-viewer-certificate.pdf';

// // Feel free to change main path according to your requirements.
// // IMPORTANT: A file extension is always required on iOS.
// // You might encounter issues if the file extension isn't included
// // or if the extension doesn't match the mime type of the file.
// const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.pdf`;

// const options = {
//   fromUrl: url,
//   toFile: localFile
// };
// RNFS.downloadFile(options).promise
// .then(() => FileViewer.open(localFile))

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
