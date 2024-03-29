import {Parser} from 'htmlparser2';
import {format, parse, startOfMonth} from 'date-fns';
import {it} from 'date-fns/locale';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import {Dimensions, Platform} from 'react-native';

export async function convertHTMLToText(htmlMessage) {
  const noStyleHTML = htmlMessage.replace(/<style[^]+?<\/style>/g, '');
  return new Promise((resolve) => {
    let message = '';

    const parser = new Parser({
      ontext: (text) => (message += text),
      onend: () => resolve(message),
    });
    parser.write(noStyleHTML);
    parser.end();
  });
}

export function italianFormat(date, dateFormat) {
  return format(date, dateFormat, {locale: it});
}

export function downloadAndOpenPDF(pdfUri, name) {
  return new Promise((resolve, reject) => {
    const localFile = `${RNFS.DocumentDirectoryPath}/${name}.pdf`;
    const options = {
      fromUrl: pdfUri,
      toFile: localFile,
      cacheable: true,
    };
    RNFS.downloadFile(options)
      .promise.then((data) => {
        console.log(data);
        FileViewer.open(localFile, {showAppsSuggestions: true})
          .then(resolve)
          .catch(reject);
      })
      .catch(reject);
  });
}

const monthNames = [
  'gennaio',
  'febbraio',
  'marzo',
  'aprile',
  'maggio',
  'giugno',
  'luglio',
  'agosto',
  'settembre',
  'ottobre',
  'novembre',
  'dicembre',
];

export function transformDate(dateString) {
  const [day, month, year] = dateString.split('/');
  const date = new Date(year, month - 1, day);
  return `${date.getDate()} ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()}`;
}

export const MAGAZINE_TYPES = {
  NR: 'nr',
  BS: 'bs',
  VC: 'vc',
};

export const MAGAZINE_NAMES = {
  [MAGAZINE_TYPES.NR]: 'Il Nuovo Rinascimento',
  [MAGAZINE_TYPES.BS]: 'Buddismo e Società',
  [MAGAZINE_TYPES.VC]: 'ILVOLOCONTINUO.IT',
};

export const MAGAZINE_SUBTITLES = {
  [MAGAZINE_TYPES.VC]: 'Il giornale online del gruppo giovani',
};

export const MAGAZINE_DESCRIPTION = {
  [MAGAZINE_TYPES.NR]:
    'È la prima rivista nata in Italia, nel 1982, per rispondere alle domande sul Buddismo di Nichiren Daishonin. Oggi settimanale digitale, raccoglie scritti di Daisaku Ikeda, articoli di approfondimento, testimonianze di vita e di fede e notizie sulle attività della Soka Gakkai in Italia e nel mondo.',
  [MAGAZINE_TYPES.BS]:
    'Bimestrale pubblicato dal 1986 al 2000 con il nome di DuemilaUno e oggi mensile, approfondisce temi legati alla filosofia buddista e all’attualità. Riporta gli scritti di Nichiren Daishonin commentati da Daisaku Ikeda, che costituiscono il materiale di studio mensile e uno speciale monografico, corredato in genere da una o più interviste.',
};

export const MAGAZINE_ASPECT_RATIO = {
  [MAGAZINE_TYPES.BS]: 264 / 339,
  [MAGAZINE_TYPES.NR]: 265 / 374,
};

export const SGI_SITES = [
  {
    icon: require('../assets/sites/senzatomica.svg'),
    title: 'Senzatomica',
    link: 'https://www.senzatomica.it/',
  },
  {
    icon: require('../assets/sites/esperia.svg'),
    title: 'Esperia',
    link: 'https://esperiashop.it/',
  },
  {
    icon: require('../assets/sites/ottopermille.svg'),
    title: '8x1000',
    link: 'https://ottopermille.sokagakkai.it/',
  },
  {
    icon: require('../assets/sites/ilvolocontinuo.svg'),
    title: 'Il Volo Continuo',
    link: 'https://www.ilvolocontinuo.it/',
  },
];

if (Platform.OS !== 'ios') {
  SGI_SITES.push({
    icon: require('../assets/sites/bs.svg'),
    title: 'Buddismo e Società',
    link: 'https://buddismoesocieta.org/',
  });
  SGI_SITES.push({
    icon: require('../assets/sites/nr.svg'),
    title: 'Il Nuovo Rinascimento',
    link: 'https://ilnuovorinascimento.org/',
  });
}

export const DEVICE_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
};

const deviceWidth = Dimensions.get('window').width;
console.log('Device WIdth: ', deviceWidth);

export let deviceSize =
  deviceWidth > 360 ? DEVICE_SIZES.MEDIUM : DEVICE_SIZES.SMALL;

export function isSubscriptionExpired(subInfo) {
  const endDate = parse(subInfo.riv_dig_scad_nr, 'yyyy-MM-dd', new Date());
  const nowDate = startOfMonth(new Date());

  return endDate < nowDate;
}

export function formatDateNews(dateString) {
  return format(parse(dateString, 'dd/MM/yyyy', new Date()), 'dd MMMM yyyy', {
    locale: it,
  });
}

export function cannotViewMagazine(subInfo, magazine, number) {
  const expiredNR =
    magazine === MAGAZINE_TYPES.NR &&
    parseInt(subInfo.riv_dig_last_nr, 10) < parseInt(number, 10);
  const expiredBS =
    magazine === MAGAZINE_TYPES.BS &&
    parseInt(subInfo.riv_dig_last_bs, 10) < parseInt(number, 10);

  return expiredBS || expiredNR;
}
