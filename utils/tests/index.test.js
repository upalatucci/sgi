import {convertHTMLToText} from '..';
import {htmlToConvert} from './mocks';

jest.createMockFromModule('react-native-fs');

describe('test index', () => {
  describe('convertHTMLToText', async () => {
    const text = await convertHTMLToText(htmlToConvert);

    expect(text).toBe(
      'Ai miei cari amici della SGI in Europa,grazie infinite per il vostro impegno nel realizzare questo corso estivo, una tradizione della SGI.Nichiren Daishonin è senza dubbio a conoscenza delle nobili azioni che state compiendo mentre vi impegnate, in questi tempi sempre più difficili, a realizzare l’ideale di kosen-rufu, che equivale alla pace nel mondo.La “ricompensa visibile” che deriva da queste azioni di “virtù invisibile” si manifesterà immancabilmente.Nichiren Daishonin afferma: «Per coloro che hanno una fede profonda è come se la notte fosse illuminata dalla luna piena» (L’essenza del capitolo “Re della Medicina”, RSND, 1, 81). La Legge mistica è una profonda filosofia di speranza e saggezza che disperde ogni oscurità e illumina la vita e la società.Ora più che mai, continuiamo insieme a diffondere ampiamente i dialoghi per la pace, un compito affidato cinquant’anni fa da Arnold Toynbee alla Soka Gakkai, con la grande speranza che avremmo aperto e mostrato il cammino!Desidero che avanziate con gioia, saggezza e in armonia gli uni con gli altri, mentre recitate il ruggito del leone di Nam-myoho-renge-kyo e illuminate le persone intorno a voi con la luce della vostra rivoluzione umana.Sto pregando insieme a mia moglie affinché questo corso possa essere per voi significativo e gioioso, e che voi e le vostre famiglie godiate sempre più di buona salute e prosperità.Daisaku Ikedaestate 2022',
    );
  });
});
