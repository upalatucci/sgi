import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Linking,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import TouchableHighlight from './CustomTouchableHighlight';
import Text from './ui/Text';
import {Colors, FontFamilies} from '../styles';
import LinearGradient from 'react-native-linear-gradient';
import EmailIcon from '../assets/email.png';
import PasswordIcon from '../assets/password.png';
import Loading from './Loading';
import ModalPassword from './ModalPassword';

const LoginForm = ({onLogin, loading}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  if (loading) {
    return <Loading textColor="white" />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ModalPassword
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <View style={styles.containerImages}>
        <View style={styles.logoView}>
          <Image source={require('../assets/sgi.png')} style={styles.image} />
        </View>
      </View>
      <View style={styles.containerLogin}>
        <View style={styles.inputContainer}>
          <View style={styles.iconsView}>
            <Image source={EmailIcon} style={styles.icons} />
          </View>
          <TextInput
            style={styles.inputs}
            autoCompleteType="username"
            value={username}
            placeholder="e-mail"
            placeholderTextColor="white"
            onChangeText={(text) => setUsername(text)}
            keyboardType="email-address"
            selectionColor="white"
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.iconsView}>
            <Image source={PasswordIcon} style={styles.icons} />
          </View>
          <TextInput
            style={[styles.inputs, styles.lastInput]}
            secureTextEntry
            autoCompleteType="password"
            value={password}
            placeholder="password"
            placeholderTextColor="white"
            placeholderStyle={styles.placeholder}
            onChangeText={(text) => setPassword(text)}
            selectionColor="white"
          />
        </View>
        <TouchableHighlight
          onPress={() => setModalVisible(true)}
          style={styles.recovery}>
          <Text style={styles.recoveryText}>Hai dimenticato la password?</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.button}>
        <TouchableHighlight
          onPress={() => onLogin(username.trim(), password)}
          style={styles.loginButton}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[Colors.darkBlue, '#003850', Colors.darkBlue]}
            style={styles.gradient}>
            <Text style={styles.loginTextButton}>ENTRA</Text>
          </LinearGradient>
        </TouchableHighlight>

        {Platform.OS !== 'ios' && (
          <TouchableHighlight
            onPress={() =>
              Linking.openURL(
                'https://servizi.sgi-italia.org/abbonamenti/index.php/registrazione/index',
              )
            }
            style={styles.signIn}>
            <View style={styles.signInTextContainer}>
              <Text style={styles.signInText}>Non hai un Account?</Text>
              <Text style={[styles.signInText, styles.boldText]}>
                Registrati qui
              </Text>
            </View>
          </TouchableHighlight>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 40,
    justifyContent: 'space-between',
  },
  containerLogin: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  containerImages: {
    flex: 1,
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 10,
    maxWidth: 500,
    height: 60,
  },
  inputs: {
    width: '100%',
    height: 40,
    marginBottom: 40,
    borderColor: 'white',
    borderBottomWidth: 1,
    color: 'white',
    fontFamily: FontFamilies.primary,
  },
  lastInput: {
    marginBottom: 10,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 20,
    color: 'white',
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  loginButton: {
    width: 300,
    maxWidth: '90%',
    height: 50,
    alignItems: 'center',
    marginBottom: 10,
  },
  loginTextButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  gradient: {
    width: '100%',
    height: '100%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoView: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: Colors.darkBlue,
    borderWidth: 2,
    padding: 6,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  recovery: {
    alignSelf: 'flex-end',
  },
  recoveryText: {
    color: '#e0e0e0',
  },
  signInText: {
    color: '#e0e0e0',
    fontWeight: '100',
    marginRight: 2,
  },
  signInTextContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  boldText: {
    fontWeight: 'bold',
  },
  icons: {
    width: '90%',
    height: '90%',
  },
  iconsView: {
    width: 40,
    height: 40,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
});
