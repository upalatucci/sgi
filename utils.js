import {Parser} from 'htmlparser2';
import {format} from 'date-fns';
import {it} from 'date-fns/locale';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

export async function convertHTMLToText(htmlMessage) {
  return new Promise((resolve) => {
    let message = '';

    const parser = new Parser({
      ontext: (text) => (message += text),
      onend: () => resolve(message),
    });
    parser.write(htmlMessage);
    parser.end();
  });
}

export function italianFormat(date, dateFormat) {
  return format(date, dateFormat, {locale: it});
}

export function downloadAndOpenPDF(pdfUri, name) {
  return new Promise((resolve) => {
    const localFile = `${RNFS.DocumentDirectoryPath}/${name}.pdf`;
    const options = {
      fromUrl: pdfUri,
      toFile: localFile,
      cacheable: true,
    };
    RNFS.downloadFile(options).promise.then((data) => {
      console.log(data);
      FileViewer.open(localFile);
      resolve();
    });
  });
}
