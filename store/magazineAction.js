import {lastMaganize} from '../api';
import {SET_LASR_NR_IMAGE, SET_LASR_BS_IMAGE} from './mutations';

export function fetchLastNRImage() {
  return (dispatch) => {
    return lastMaganize('nr').then((response) =>
      dispatch({type: SET_LASR_NR_IMAGE, payload: response.data.number}),
    );
  };
}

export function fetchLastBSImage() {
  return (dispatch) => {
    return lastMaganize('bs').then((response) =>
      dispatch({type: SET_LASR_BS_IMAGE, payload: response.data.number}),
    );
  };
}
