import React from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import TouchableHighlight from './CustomTouchableHighlight';
import {Colors} from '../styles';

export default ({modalVisible, onClose, error, message}) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={onClose}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        {error !== undefined ? (
          <View style={styles.icon}>
            <Icon name="x" size={28} color={Colors.error} />
          </View>
        ) : (
          <View style={styles.icon}>
            <Icon name="check" size={28} color={Colors.blue} />
          </View>
        )}
        <Text style={styles.modalText}>{error || message}</Text>
        <TouchableHighlight style={styles.openButton} onPress={onClose}>
          <Text style={styles.textStyle}>Prova di nuovo</Text>
        </TouchableHighlight>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
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
    marginHorizontal: 35,
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
