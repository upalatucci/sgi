import {
  SET_LASR_NR_IMAGE,
  SET_LASR_BS_IMAGE,
  SET_LAST_NEWS,
  SET_SUBSCRIPTION_INFO,
  SET_MAGAZINE_CACHE,
  SET_ARTICLE_CACHE,
  SET_POST_CACHE,
  LOGIN,
  LOGOUT,
  HIGHLIGHT,
  REMOVE_HIGHLIGHT,
} from './mutations';

import {generateSignToken} from '../services/auth';
import * as Keychain from 'react-native-keychain';

const initialState = {
  lastBS: null,
  lastNR: null,
  lastNews: null,
  subscriptionInfo: null,
  cachedMagazines: {},
  cachedArticles: {},
  cachedPosts: {},
  isLogged: false,
  highlights: {},
};

export default function (state = initialState, {type, payload}) {
  console.log(type, payload);
  switch (type) {
    case REMOVE_HIGHLIGHT:
      if (state.highlights[payload]) {
        newMagazineHighlights = [...state.highlights[payload]];
        newMagazineHighlights.pop();
        return {
          ...state,
          highlights: {
            ...state.highlights,
            [payload]: newMagazineHighlights,
          },
        };
      } else {
        return state;
      }
    case HIGHLIGHT:
      const magazineKey = payload.key;
      let newMagazineHighlights;
      if (state.highlights[magazineKey]) {
        newMagazineHighlights = [...state.highlights[magazineKey]];
      } else {
        newMagazineHighlights = [];
      }

      newMagazineHighlights.push(payload.value);
      return {
        ...state,
        highlights: {
          ...state.highlights,
          [magazineKey]: newMagazineHighlights,
        },
      };
    case LOGOUT:
      Keychain.resetGenericPassword();
      return {
        ...state,
        isLogged: false,
        subscriptionInfo: null,
        cachedMagazines: {},
        cachedArticles: {},
      };
    case LOGIN:
      return {
        ...state,
        isLogged: true,
      };
    case SET_MAGAZINE_CACHE:
      return {
        ...state,
        cachedMagazines: {
          ...state.cachedMagazines,
          ...payload,
        },
      };
    case SET_ARTICLE_CACHE:
      return {
        ...state,
        cachedArticles: {
          ...state.cachedArticles,
          ...payload,
        },
      };
    case SET_POST_CACHE:
      return {
        ...state,
        cachedPosts: {
          ...state.cachedPosts,
          ...payload,
        },
      };
    case SET_LAST_NEWS:
      return {
        ...state,
        lastNews: payload,
      };
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
