import React from 'react';
import {StyleSheet, View} from 'react-native';
import TouchableHighlight from './CustomTouchableHighlight';
import Text from './ui/Text';
import {
  TitleStyle,
  PrimaryButtonStyle,
  PrimaryButtonTitleStyle,
} from '../styles';

export default function ErrorFallback({error, resetErrorBoundary}) {
  console.log(error);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sembra che qualcosa sia andato storto!</Text>
      <Text>Ci dispiace per l'inconveniente</Text>
      <Text>Errore: {error.message}</Text>
      <TouchableHighlight style={styles.button} onPress={resetErrorBoundary}>
        <Text style={styles.buttonText}>Prova di nuovo</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    ...TitleStyle,
  },
  button: {
    ...PrimaryButtonStyle,
    width: 200,
    marginTop: 20,
  },
  buttonText: {
    ...PrimaryButtonTitleStyle,
    textAlign: 'center',
  },
});
