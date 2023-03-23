import shajs from 'sha.js';
import md5 from 'md5';
import {loginRequest} from '../api';
import {TOKEN} from '../token';

export function generateSignToken(parameters, magazine = 'nr') {
  const {riv_nome, riv_cognome, riv_codabb: riv_cod_abb} = parameters;

  const passphraseArray = {riv_cod_abb, riv_cognome, riv_nome};

  if (magazine === 'nr') {
    passphraseArray.riv_dig_scad = parameters.riv_dig_scad_nr;
  } else {
    passphraseArray.riv_dig_scad = parameters.riv_dig_scad_bs;
  }

  let passphrase = '';

  for (const key of Object.keys(passphraseArray).sort()) {
    passphrase += `${key}=${passphraseArray[key]}${TOKEN}`;
  }

  return shajs('sha512').update(passphrase).digest('hex');
}

export async function login(username, password) {
  const md5password = md5(password);
  return await loginRequest(username, md5password);
}

export function subscriptionDataForMagazine(subscriptionInfo, magazine = 'nr') {
  if (!subscriptionInfo) {
    return;
  }

  const magazineSubInfo = {
    riv_nome: subscriptionInfo.riv_nome,
    riv_cognome: subscriptionInfo.riv_cognome,
    sign: subscriptionInfo.sign_bs,
    riv_dig_scad: subscriptionInfo.riv_dig_scad_bs,
    riv_cod_abb: subscriptionInfo.riv_codabb,
  };

  if (magazine === 'nr') {
    magazineSubInfo.riv_dig_scad = subscriptionInfo.riv_dig_scad_nr;
    magazineSubInfo.sign = subscriptionInfo.sign_nr;
  }

  return magazineSubInfo;
}
