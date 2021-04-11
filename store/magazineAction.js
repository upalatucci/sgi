import {lastMaganize, lastNews} from '../api';
import {SET_LASR_NR_IMAGE, SET_LASR_BS_IMAGE, SET_LAST_NEWS} from './mutations';

export function fetchLastNRImage() {
  return (dispatch) => {
    return lastMaganize('nr')
      .then((response) => {
        console.log(response);
        dispatch({type: SET_LASR_NR_IMAGE, payload: response.data.number});
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function fetchLastBSImage() {
  return (dispatch) => {
    return lastMaganize('bs').then((response) =>
      dispatch({type: SET_LASR_BS_IMAGE, payload: response.data.number}),
    );
  };
}

export function fetchLastNews() {
  return (dispatch) => {
    return lastNews().then((response) => {
      if (response.data && response.data.length > 0) {
        dispatch({type: SET_LAST_NEWS, payload: response.data});
      }
    });
  };
}
