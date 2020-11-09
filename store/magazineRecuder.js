import {SET_LASR_NR_IMAGE, SET_LASR_BS_IMAGE} from './mutations';

const initialState = {
  lastBSImage: null,
  lastNRImage: null,
};

export default function (state = initialState, {type, payload}) {
  switch (type) {
    case SET_LASR_BS_IMAGE:
      return {
        ...state,
        lastBSImage: payload,
      };
    case SET_LASR_NR_IMAGE:
      return {
        ...state,
        lastNRImage: payload,
      };
    default:
      return state;
  }
}
