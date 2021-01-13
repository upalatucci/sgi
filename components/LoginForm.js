import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Image, Linking} from 'react-native';
import {connect} from 'react-redux';
import TouchableHighlight from './CustomTouchableHighlight';
import {Colors, PrimaryButtonStyle, PrimaryButtonTitleStyle} from '../styles';

const LoginForm = ({onLogin, lastBS, lastNR}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.containerImages}>
        <Image
          source={{uri: lastNR ? lastNR.cover : null}}
          style={[styles.magazineImage, styles.NRimage]}
        />
        <Image
          source={{uri: lastBS ? lastBS.cover : null}}
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
          <TouchableHighlight
            onPress={() =>
              Linking.openURL(
                'https://servizi.sgi-italia.org/abbonamenti/index.php/registrazione/index',
              )
            }
            style={styles.otherButtons}>
            <Text style={styles.otherButtonsText}>Registrati</Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() =>
              Linking.openURL(
                'https://servizi.sgi-italia.org/abbonamenti/index.php/site/ricordaPassword',
              )
            }
            style={styles.otherButtons}>
            <Text style={styles.otherButtonsText}>Password Dimenticata?</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default connect((state) => {
  return {
    lastNR: state.magazine.lastNR,
    lastBS: state.magazine.lastBS,
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
    justifyContent: 'space-between',
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
    ...PrimaryButtonStyle,
  },
  loginTextButton: {
    ...PrimaryButtonTitleStyle,
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
