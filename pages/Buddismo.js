import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
  View,
} from 'react-native';
import {Colors, DefaultShadow} from '../styles';
import {useSelector} from 'react-redux';
import BuddismoBackground from '../assets/buddismo_background.png';
import BuddismoText from '../components/BuddismoText';
import TouchableHighlight from '../components/CustomTouchableHighlight';
import Text from '../components/ui/Text';

export default () => {
  const textSize = useSelector((state) => state.ui.textSize);

  const fontSize = 16 + textSize * 2;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={styles.scroll}>
        <Text style={styles.title}>Il Buddismo della Soka Gakkai</Text>
        <Image source={BuddismoBackground} style={styles.image} />
        <BuddismoText
          fontSize={fontSize}
          principalText="Il Buddismo della Soka Gakkai si basa sugli insegnamenti del Budda
            Nichiren Daishonin (1222-1282) i cui valori chiave, racchiusi
            nell’insegnamento del Sutra del Loto di Shakyamuni, sono il rispetto per
            la sacralità di ogni forma di vita e l’interconnessione fra tutte le
            forme di vita. La pratica religiosa consiste nella recitazione
            quotidiana di “Nam-myoho-renge-kyo” (la Legge Mistica) e nella lettura
            dei capitoli Hoben e Juryo del Sutra del Loto."
          links={[
            {
              text: 'La Soka Gakkai',
              url: 'https://www.sgi-italia.org/lasokagakkai/',
            },
            {
              text: 'Nichiren Daishonin',
              url: 'https://www.sgi-italia.org/nichiren-daishonin/',
            },
            {
              text: 'Nam Myoho Renge Kyo',
              url:
                'https://www.sgi-italia.org/la-legge-mistica-nam-myoho-renge-kyo/',
            },
          ]}
        />
        <BuddismoText
          fontSize={fontSize}
          principalText="Nichiren Daishonin raffigurò la sua condizione vitale illuminata, la Buddità, nel Gohonzon (oggetto di culto) per permettere alle persone comuni di manifestare Nam-Myoho-renge-kyo (la Legge Mistica) nella propria vita e conseguire la Buddità, come egli stesso aveva fatto."
          links={[
            {
              text: 'il Gohonzon',
              url: 'https://www.sgi-italia.org/gohonzon/',
            },
          ]}
        />
        <BuddismoText
          fontSize={fontSize}
          principalText="La Soka Gakkai si basa sullo spirito fondamentale del Sutra del Loto così come insegnato da Nichiren Daishonin. Il Sutra del Loto è una scrittura fondamentale del Buddismo mahayana insegnata da Shakyamuni conosciuto anche come l'Illuminato o Gautama Budda.
          Il Sutra del Loto descrive il grande universo in continua trasformazione e contemporaneamente parla dell'infinito potenziale racchiuso in un singolo istante di vita. Inoltre espone il principio dell' illuminazione di tutti gli esseri viventi: secondo tale principio ogni esistenza è dotata del supremo valore della buddità ed ogni individuo è in grado di farla emergere dalla propria vita.
          Oggi la Soka Gakkai Internazionale (SGI), di cui la Soka Gakkai Italiana fa parte, è una comunità buddista laica, diffusa in tutto il mondo, che promuove la pace, la cultura e l'educazione fondate sull' umanesimo buddista di Nichiren Daishonin. I singoli praticanti della SGI si impegnano attivamente, come cittadini del mondo, al miglioramento delle loro comunità locali."
          links={[
            {
              text: 'La Soka Gakkai Internazionale (SGI)',
              url: 'https://www.sgi-italia.org/lasokagakkaiinternazionale/',
            },
          ]}
        />
        <BuddismoText
          fontSize={fontSize}
          principalText="La Soka Gakkai si impegna nella costruzione di una cultura di pace utilizzando come strumento fondamentale il dialogo basato sul principio che la felicità individuale e la realizzazione di un mondo pacifico sono indissolubilmente legati.
          Ogni anno, dal 1983, Daisaku Ikeda, presidente della SGI, trasmette una Proposte di Pace indirizzate alla comunità internazionale nelle quali suggerisce soluzioni concrete a problematiche di rilevanza mondiale ( come la povertà, la questione ambientale, le guerre e la violenza ) basate sulla filosofia dell'umanesimo buddista."
          links={[
            {
              text: 'Daisaku Ikeda',
              url: 'https://www.sgi-italia.org/daisaku-ikeda/',
            },
            {
              text: 'Proposta di pace 2019',
              url: 'https://www.sgi-italia.org/proposta-di-pace-2019/',
            },
          ]}
        />
        <Text style={styles.domande}>DOMANDE E RISPOSE SUL BUDDISMO</Text>
        <View style={styles.ul}>
          {questions.map(({text, url}) => (
            <TouchableHighlight
              key={text}
              style={styles.touchLink}
              onPress={() => Linking.openURL(url)}>
              <>
                <View style={styles.square} />
                <Text style={[styles.link, {fontSize}]}>{text}</Text>
              </>
            </TouchableHighlight>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const questions = [
  {
    text: 'A quale tradizione appartiene la Soka Gakkai?',
    url:
      'https://www.sgi-italia.org/a-quale-tradizione-buddista-appartiene-la-soka-gakkai',
  },
  {
    text: 'Che tipo di preghiera fanno i praticanti della Soka Gakkai?',
    url:
      'https://www.sgi-italia.org/che-tipo-di-preghiera-fanno-i-fedeli-della-soka-gakkai',
  },
  {
    text: 'Come funziona la recitazione di Nam Myo Ho Renge Kyo?',
    url:
      'https://www.sgi-italia.org/come-funziona-recitazione-nam-myo-ho-renge-kyo',
  },
  {
    text: 'In cosa credono i buddisti?',
    url: 'https://www.sgi-italia.org/in-cosa-credono-i-buddisti',
  },
  {
    text: "Cosa si intende per 'Illuminazione'?",
    url: 'https://www.sgi-italia.org/in-cosa-credono-i-buddisti',
  },
  {
    text: 'Chi è un Budda?',
    url: 'https://www.sgi-italia.org/il-budda-nella-vita-di-tutti-i-giorni-2',
  },
  {
    text: "Che cos'è l'Istituto Buddista Italiano Soka Gakkai?",
    url:
      'https://www.sgi-italia.org/che-cosa-e-listituto-buddista-italiano-soka-gakkai',
  },
  {
    text: 'In che modo la Soka Gakkai offre il proprio contributo alla società',
    url:
      'https://www.sgi-italia.org/in-che-modo-la-soka-gakkai-offre-il-proprio-contributo-alla-societa',
  },
  {
    text: 'In che modo la Soka Gakkai coopera con le altre religioni?',
    url: 'https://www.sgi-italia.org/soka-gakkai-coopera-altre-religioni',
  },
  {
    text: 'Qual è la visione dei desideri nel Buddismo della Soka Gakkai?',
    url:
      'https://www.sgi-italia.org/come-vengono-visti-i-desideri-dai-buddisti-della-soka-gakkai',
  },
];

const styles = StyleSheet.create({
  container: {
    color: Colors.background,
    flex: 1,
  },
  scroll: {
    flex: 1,
    color: Colors.background,
  },
  scrollContent: {
    color: Colors.background,
    marginBottom: 80,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  image: {
    height: 200,
    width: '100%',
    resizeMode: 'contain',
  },
  card: {
    ...DefaultShadow,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: 'white',
  },
  touchLink: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  link: {
    marginLeft: 10,
  },
  domande: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
  },
  ul: {
    marginHorizontal: 20,
    marginBottom: 50,
    marginTop: 20,
  },
  square: {
    marginTop: 6,
    height: 10,
    width: 10,
    backgroundColor: Colors.lightBlue,
  },
});
