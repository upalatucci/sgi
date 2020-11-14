import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Image} from 'react-native';
import {connect} from 'react-redux';
import TouchableHighlight from './CustomTouchableHighlight';
import {Colors} from '../styles';

const LoginForm = ({onLogin, lastBSImage, lastNRImage}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.containerImages}>
        <Image
          source={{uri: lastNRImage}}
          style={[styles.magazineImage, styles.NRimage]}
        />
        <Image
          source={{uri: lastBSImage}}
          style={[styles.magazineImage, styles.BSimage]}
        />
      </View>
      <View style={styles.containerLogin}>
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
    </View>
  );
};

export default connect((state) => {
  return {
    lastNRImage: state.magazine.lastNRImage,
    lastBSImage: state.magazine.lastBSImage,
  };
})(LoginForm);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 40,
  },
  containerLogin: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  containerImages: {
    flex: 1,
    width: '100%',
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
    borderColor: Colors.orange,
  },
  loginTextButton: {
    color: Colors.orange,
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
  magazineImage: {
    resizeMode: 'contain',
    width: '70%',
    height: '70%',
  },
  NRimage: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  BSimage: {
    position: 'absolute',
    top: '25%',
    left: '25%',
  },
});
