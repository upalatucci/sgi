import {
  SET_LASR_NR_IMAGE,
  SET_LASR_BS_IMAGE,
  SET_SUBSCRIPTION_INFO,
} from './mutations';

import {generateSignToken} from '../services/auth';

const initialState = {
  lastBS: null,
  lastNR: null,
  subscriptionInfo: null,
};

export default function (state = initialState, {type, payload}) {
  switch (type) {
    case SET_LASR_BS_IMAGE:
      return {
        ...state,
        lastBS: payload,
      };
    case SET_LASR_NR_IMAGE:
      return {
        ...state,
        lastNR: payload,
      };
    case SET_SUBSCRIPTION_INFO:
      return {
        ...state,
        subscriptionInfo: {
          ...payload,
          sign_nr: generateSignToken(payload),
          sign_bs: generateSignToken(payload, 'bs'),
        },
      };
    default:
      return state;
  }
}
