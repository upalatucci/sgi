import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import TouchableHighlight from './CustomTouchableHighlight';
import {Colors} from '../styles';

export default ({onLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome Utente</Text>
      <TextInput
        style={styles.inputs}
        autoCompleteType="username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.inputs}
        secureTextEntry
        autoCompleteType="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableHighlight
        onPress={() => onLogin(username.trim(), password)}
        style={styles.loginButton}>
        <Text style={styles.loginTextButton}>Login</Text>
      </TouchableHighlight>

      <View style={styles.bottomButtons}>
        <TouchableHighlight onPress={() => {}} style={styles.otherButtons}>
          <Text style={styles.otherButtonsText}>Registrati</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => {}} style={styles.otherButtons}>
          <Text style={styles.otherButtonsText}>Password Dimenticata?</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 40,
  },
  inputs: {
    width: '100%',
    height: 40,
    marginBottom: 40,
    borderColor: Colors.gray,
    borderBottomWidth: 1,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 20,
    color: Colors.gray,
  },
  loginButton: {
    marginBottom: 60,
    width: 100,
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  loginTextButton: {
    color: Colors.secondary,
    fontSize: 20,
  },
  otherButtons: {},
  otherButtonsText: {
    color: Colors.gray,
    textDecorationLine: 'underline',
  },
  bottomButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});
