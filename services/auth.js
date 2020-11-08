import * as Keychain from 'react-native-keychain';
import shajs from 'sha.js';
import md5 from 'md5';
import {loginRequest} from '../api';

const TOKEN = 'CEfxtHDyhkrsXsptHfFYC4DfRDnt74ZR2jKKKzHEskRUhEtKzM';

export function generateSignToken(parameters, magazine = 'nr') {
  const {riv_nome, riv_cognome, riv_cod_abb} = parameters;

  const passphraseArray = [riv_cod_abb, riv_cognome, riv_nome];

  if (magazine === 'nr') {
    passphraseArray.splice(2, 0, parameters.riv_dig_scad_nr);
  } else {
    passphraseArray.splice(2, 0, parameters.riv_dig_scad_bs);
  }

  let passphrase = '';
  for (const key of passphraseArray) {
    passphrase += `${key}=${parameters[key]}${TOKEN}`;
  }

  return shajs('sha512').update(passphrase).digest('hex');
}

export async function fetchAuthInfoFromStorage() {
  await Keychain.getGenericPassword();
}

export async function login(username, password) {
  const md5password = md5(password);
  return await loginRequest(username, md5password);
}
