import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../styles';
import CustomTouchableHighlight from './CustomTouchableHighlight';
import Text from './ui/Text';

const PdfError = ({error, onClick}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Errore</Text>
        <Text style={styles.errorMessage} numberOfLines={4}>
          {error.message}
        </Text>

        <CustomTouchableHighlight style={styles.retryButton} onPress={onClick}>
          <Text style={styles.textStyle}>Riprova</Text>
        </CustomTouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default PdfError;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  errorMessage: {
    fontSize: 18,
  },
  retryButton: {
    marginHorizontal: 35,
    marginTop: 10,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
