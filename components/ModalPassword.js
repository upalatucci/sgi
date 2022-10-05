import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Modal, TextInput} from 'react-native';
import TouchableHighlight from './CustomTouchableHighlight';
import Text from './ui/Text';
import {Colors, FontFamilies} from '../styles';
import Loading from './Loading';

export default ({modalVisible, onClose}) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setLoading(false);
    setMessage(null);
    setError(null);
  }, [modalVisible]);

  const sendRequest = () => {
    setLoading(true);
    setMessage(null);
    setError(null);
    const formData = new FormData();
    formData.append('RicordaPasswordForm[email]', username);

    fetch(
      'https://servizi.sgi-italia.org/abbonamenti/index.php/site/ricordaPassword',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then(() => {
        setMessage('Credenziali inviate via mail con successo');
      })
      .catch(setError)
      .finally(() => setLoading(false));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Recupera password</Text>

          {loading && (
            <View style={styles.loading}>
              <Loading withText={false} absolutePositioning={false} />
            </View>
          )}

          {!loading && (
            <>
              <TextInput
                style={styles.inputs}
                autoCompleteType="username"
                value={username}
                placeholder="e-mail"
                onChangeText={setUsername}
                keyboardType="email-address"
              />

              {error && (
                <Text style={styles.error}>Errore: {error.message}</Text>
              )}

              {message !== null && (
                <Text style={styles.message}>{message}</Text>
              )}
            </>
          )}

          <View style={styles.buttonsView}>
            <TouchableHighlight style={[styles.closeButton]} onPress={onClose}>
              <Text>Cancella</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={[styles.openButton, loading ? styles.loadingButton : {}]}
              onPress={!loading && sendRequest}>
              <Text style={styles.textStyle}>Okay</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
    marginBottom: 10,
  },
  message: {
    marginBottom: 10,
    color: 'green',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  buttonsView: {
    flexDirection: 'row',
  },
  closeButton: {
    borderBottomColor: Colors.gray,
    color: Colors.gray,
    backgroundColor: 'white',

    marginHorizontal: 10,
    borderRadius: 10,
    padding: 15,
  },
  loadingButton: {
    backgroundColor: Colors.gray,
  },
  inputs: {
    width: '80%',
    maxWidth: 300,
    minWidth: 200,
    height: 40,
    marginBottom: 40,
    borderColor: 'black',
    borderBottomWidth: 1,
    fontFamily: FontFamilies.primary,
  },
  loading: {
    height: 70,
  },
  modalView: {
    maxWidth: 400,
    width: '80%',
    minHeight: 70,
    margin: 20,
    marginBottom: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    marginHorizontal: 10,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTextTitle: {
    fontSize: 22,
    alignSelf: 'flex-start',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  icon: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: Colors.light,
    width: 50,
    height: 50,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
});
